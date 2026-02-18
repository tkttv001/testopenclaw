# MODEL_ROUTING_PLAYBOOK.md

Mục tiêu: **ưu tiên tiết kiệm token/cost nhưng vẫn giữ hiệu quả đầu ra** cho tác vụ thực tế.

## 0) Nguyên tắc vận hành

1. **Default rẻ trước, nâng cấp sau**
   - Bắt đầu từ model rẻ phù hợp.
   - Chỉ nâng model khi có dấu hiệu không đủ chất lượng.

2. **Không dùng model đắt cho việc lặp lại**
   - Formatting, rewrite, phân loại, tóm tắt ngắn → model rẻ.

3. **Tách task lớn thành 2 pha**
   - Pha 1 (rẻ): phân tích, lên plan, liệt kê rủi ro.
   - Pha 2 (mạnh): chỉ phần khó/critical.

4. **Giữ context gọn**
   - Chỉ đưa phần file/log liên quan trực tiếp.
   - Tóm tắt lịch sử dài trước khi xử lý vòng tiếp theo.

5. **Fallback nhanh khi lỗi billing/rate limit**
   - Chuyển sang Kimi 2.5 để không gián đoạn pipeline.

---

## 1) Bảng phân tầng model (tối ưu chi phí)

### Tier A — Siêu tiết kiệm
**Model:** `openai-codex/gpt-5.3-codex-spark`

**Dùng cho:**
- Rewrite, dịch ngắn, sửa câu
- Phân loại text đơn giản
- Chuẩn hoá JSON/YAML nhỏ
- Tóm tắt ngắn
- Việc lặp lại, low-risk

**Không nên dùng cho:**
- Debug sâu nhiều lớp
- Refactor lớn liên file
- Quyết định kiến trúc

---

### Tier B — Mặc định cân bằng (khuyến nghị)
**Model:** `openai-codex/gpt-5.1-codex-mini`

**Dùng cho:**
- Coding thường ngày
- Refactor nhỏ-vừa
- Debug mức trung bình
- SQL/script automation
- Soạn tài liệu kỹ thuật chuẩn

**Vai trò:** model mặc định cho đa số tác vụ để giữ chi phí thấp nhưng vẫn ổn định.

---

### Tier C — Nặng / cần độ chính xác cao
**Model:** `openai-codex/gpt-5.2-codex` hoặc `openai-codex/gpt-5.3-codex`

**Dùng cho:**
- Refactor lớn, nhiều file
- Debug async/race condition
- Migration khó rollback
- Task cần độ đúng cao ngay lần đầu

---

### Tier D — Critical
**Model:** `openai-codex/gpt-5.1-codex-max`

**Dùng cho:**
- Sự cố production nghiêm trọng
- Security review/hardening
- Quyết định kiến trúc quan trọng
- Deadline gấp + sai số thấp

---

### Fallback liên tục dịch vụ
**Model:** `nvidia/moonshotai/kimi-k2.5`

**Dùng khi:**
- OpenAI bị rate limit / billing issue
- Cần chạy batch dài, chấp nhận chất lượng “đủ tốt”
- Nhiệm vụ không critical nhưng cần hoàn thành

---

## 2) Quy tắc routing tự động (ngắn gọn)

1. **Mặc định:** `gpt-5.1-codex-mini`
2. Nếu task thuộc nhóm lặp lại/đơn giản → `gpt-5.3-codex-spark`
3. Nếu task phức tạp/rủi ro cao → `gpt-5.2-codex` hoặc `gpt-5.3-codex`
4. Nếu task critical → `gpt-5.1-codex-max`
5. Nếu OpenAI lỗi tài khoản/giới hạn → `nvidia/moonshotai/kimi-k2.5`

---

## 3) Trigger nâng model (escalation)

Nâng từ mini/spark lên codex khi có >=1 dấu hiệu:
- Cùng loại lỗi lặp lại sau 2 vòng sửa
- Bài toán có nhiều ràng buộc chéo (logic + data + infra)
- Refactor ảnh hưởng >3 file trọng yếu
- Cần lập luận nhiều bước, dễ sai nếu đơn giản hoá

Nâng lên codex-max khi:
- Làm trực tiếp lên production/hệ thống tài chính/bảo mật
- Sai sót gây downtime hoặc rủi ro dữ liệu cao

---

## 4) Mẫu mapping task → model

- Viết regex/format output/API response đơn giản → `gpt-5.3-codex-spark`
- Viết script ETL nhỏ, CRUD backend, unit test vừa phải → `gpt-5.1-codex-mini`
- Debug memory leak/race condition, migration DB phức tạp → `gpt-5.2-codex`
- Thiết kế lại kiến trúc service hoặc xử lý incident P1 → `gpt-5.1-codex-max`
- Hết budget OpenAI nhưng vẫn cần chạy luồng → `nvidia/moonshotai/kimi-k2.5`

---

## 5) Checklist tiết kiệm token khi chạy task

Trước khi chạy:
- [ ] Đã chọn model thấp nhất đủ dùng chưa?
- [ ] Đã cắt bớt context dư thừa chưa?
- [ ] Đã chia task thành các bước nhỏ chưa?

Trong khi chạy:
- [ ] Chỉ gửi diff/log liên quan
- [ ] Tránh gửi lại toàn bộ file nhiều lần
- [ ] Tóm tắt trung gian thay vì giữ lịch sử dài

Sau khi chạy:
- [ ] Chỉ escalate model nếu cần
- [ ] Ghi lesson learned để lần sau route rẻ hơn

---

## 6) Chính sách mặc định đề xuất cho hiện tại

- Primary giữ nguyên: `openai-codex/gpt-5.3-codex`
- Fallback giữ nguyên: `nvidia/moonshotai/kimi-k2.5`
- **Operational default khi thực thi task thường ngày:** ưu tiên gọi `gpt-5.1-codex-mini` trước.
- Chỉ dùng `gpt-5.3-codex`/`gpt-5.2-codex`/`gpt-5.1-codex-max` khi có trigger escalation ở mục 3.

> Ghi chú: Đây là playbook vận hành. Có thể điều chỉnh theo dữ liệu thực tế (tỷ lệ pass, số vòng sửa, cost mỗi task).
