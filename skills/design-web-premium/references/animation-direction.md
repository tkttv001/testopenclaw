# Animation Direction (Premium Personal Websites)

## 1) Signature concepts (pick 1 per project)
- Cinematic Reveal: hero xuất hiện theo lớp (background -> heading -> proof -> CTA)
- Editorial Motion: line/divider + typography shift nhẹ khi scroll
- Depth Parallax Lite: foreground/background dịch chuyển nhẹ theo scroll (subtle)
- Spotlight Interaction: hover tạo vùng sáng tập trung vào card chính

## 2) Timing system
- Fast: 140-180ms (button hover, icon nudge)
- Base: 220-280ms (card hover, small reveal)
- Emphasis: 320-420ms (hero entrance, section reveal)
- Easing ưu tiên: cubic-bezier(0.22, 1, 0.36, 1)

## 3) Mandatory interactions
- Hero entrance timeline (2-4 beats)
- CTA hover state (visual + micro movement)
- Card hover depth (shadow + translateY nhẹ)
- Scroll reveal theo thứ tự nội dung

## 4) Performance guardrails
- Animate bằng transform + opacity
- Tránh animate top/left/width/height liên tục
- Tránh animation nặng trên mobile low-end
- Chỉ animation cho phần có ý nghĩa chuyển đổi/narrative

## 5) Accessibility
- Tôn trọng prefers-reduced-motion
- Trong reduced mode: giữ fade nhẹ hoặc bỏ motion, vẫn giữ hierarchy rõ
- Không dùng motion gây mất khả năng đọc hoặc chóng mặt
