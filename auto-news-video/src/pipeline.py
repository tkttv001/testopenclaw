import json
import sqlite3
import datetime as dt
from pathlib import Path
from typing import List, Dict

import feedparser

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUTPUTS = ROOT / "outputs"
DB = DATA / "state.db"
CHECKPOINT = DATA / "checkpoint.json"

RSS_SOURCES = [
    "https://news.google.com/rss?hl=vi&gl=VN&ceid=VN:vi",
    "https://vnexpress.net/rss/tin-moi-nhat.rss",
    "https://tuoitre.vn/rss/tin-moi-nhat.rss",
]

TREND_SOURCES = [
    "https://trends.google.com/trending/rss?geo=VN",
]


def init_storage() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    OUTPUTS.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS seen (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                link TEXT UNIQUE,
                title TEXT,
                published_at TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.commit()


def load_checkpoint() -> Dict:
    if CHECKPOINT.exists():
        return json.loads(CHECKPOINT.read_text(encoding="utf-8"))
    return {"last_step": "init", "run_date": None, "artifacts": {}}


def save_checkpoint(last_step: str, run_date: str, artifacts: Dict) -> None:
    CHECKPOINT.write_text(
        json.dumps({"last_step": last_step, "run_date": run_date, "artifacts": artifacts}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def collect_news(limit: int = 40) -> List[Dict]:
    items = []
    for url in RSS_SOURCES:
        feed = feedparser.parse(url)
        for entry in feed.entries[:limit]:
            items.append(
                {
                    "title": entry.get("title", "").strip(),
                    "link": entry.get("link", "").strip(),
                    "published": entry.get("published", ""),
                    "source": feed.feed.get("title", url),
                }
            )
    return [i for i in items if i["title"] and i["link"]]


def collect_trends(limit: int = 20) -> List[str]:
    terms: List[str] = []
    for url in TREND_SOURCES:
        feed = feedparser.parse(url)
        for entry in feed.entries[:limit]:
            title = entry.get("title", "").strip()
            if title:
                terms.append(title)
    # unique, giữ thứ tự
    seen = set()
    uniq = []
    for t in terms:
        k = t.lower()
        if k not in seen:
            seen.add(k)
            uniq.append(t)
    return uniq


def dedupe_new(items: List[Dict]) -> List[Dict]:
    with sqlite3.connect(DB) as conn:
        cur = conn.cursor()
        fresh = []
        for i in items:
            cur.execute("SELECT 1 FROM seen WHERE link=?", (i["link"],))
            if cur.fetchone() is None:
                fresh.append(i)
        return fresh


def score_item(item: Dict, keyword_boost: List[str], trends: List[str]) -> int:
    title = item["title"].lower()
    score = 1

    for kw in keyword_boost:
        if kw.lower() in title:
            score += 3

    trend_hits = [t for t in trends if t.lower() in title]
    score += min(8, len(trend_hits) * 4)

    clickbait = ["sốc", "không thể tin", "gây bão"]
    if any(x in title for x in clickbait):
        score -= 2

    score += 1 if item.get("published") else 0
    item["trend_hits"] = trend_hits
    item["score"] = score
    return score


def pick_top(items: List[Dict], trends: List[str], top_k: int = 3) -> List[Dict]:
    keyword_boost = ["ai", "công nghệ", "startup", "kinh tế", "chính sách", "tiktok", "youtube"]
    ranked = sorted(items, key=lambda x: score_item(x, keyword_boost, trends), reverse=True)
    return ranked[:top_k]


def build_script(top_news: List[Dict], trends: List[str]) -> str:
    if not top_news:
        return "Hôm nay chưa có tin nổi bật phù hợp niche."

    main = top_news[0]
    trend_line = ""
    if main.get("trend_hits"):
        trend_line = f"- Trend match: {', '.join(main['trend_hits'][:2])}"
    elif trends:
        trend_line = f"- Trend tham khảo hôm nay: {', '.join(trends[:2])}"

    lines = [
        f"Hook: Tin đang được quan tâm mạnh hôm nay: {main['title']}",
        "",
        "Nội dung chính:",
        f"- Nguồn: {main['source']}",
        f"- Điểm chính: {main['title']}",
        trend_line,
        "- Góc nhìn nhanh: Điều này có thể tác động trực tiếp đến người dùng trong 24 giờ tới.",
        "",
        "CTA: Nếu bạn muốn mình cập nhật trend nóng mỗi ngày, nhớ follow kênh.",
    ]
    return "\n".join([x for x in lines if x.strip()])


def persist_seen(items: List[Dict]) -> None:
    with sqlite3.connect(DB) as conn:
        conn.executemany(
            "INSERT OR IGNORE INTO seen(link,title,published_at) VALUES (?,?,?)",
            [(i["link"], i["title"], i.get("published", "")) for i in items],
        )
        conn.commit()


def run() -> Path:
    init_storage()
    today = dt.datetime.utcnow().strftime("%Y-%m-%d")
    cp = load_checkpoint()
    artifacts = cp.get("artifacts", {}) if cp.get("run_date") == today else {}

    trends = collect_trends()
    trend_file = OUTPUTS / f"trends_{today}.json"
    trend_file.write_text(json.dumps(trends, ensure_ascii=False, indent=2), encoding="utf-8")
    save_checkpoint("trends", today, {**artifacts, "trend_count": len(trends), "trend_path": str(trend_file)})

    news = collect_news()
    save_checkpoint("collected", today, {**artifacts, "collected_count": len(news), "trend_count": len(trends), "trend_path": str(trend_file)})

    fresh = dedupe_new(news)
    save_checkpoint("deduped", today, {**artifacts, "fresh_count": len(fresh), "trend_count": len(trends), "trend_path": str(trend_file)})

    top = pick_top(fresh, trends=trends, top_k=3)
    script = build_script(top, trends=trends)

    out = OUTPUTS / f"script_{today}.txt"
    out.write_text(script, encoding="utf-8")

    persist_seen(fresh)
    save_checkpoint("scripted", today, {**artifacts, "script_path": str(out), "top": top, "trend_count": len(trends), "trend_path": str(trend_file)})
    return out


if __name__ == "__main__":
    result = run()
    print(result)
