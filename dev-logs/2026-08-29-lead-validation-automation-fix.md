### Phase 2 + 2b: Fix 422 on lead submission for automation service type

- **Timestamp:** 2026-08-29
- **Mode:** Agent
- **Persona(s) Active:** ⚙️ Backend + 🧪 QA
- **Files Modified/Created:**
  - `app/Http/Requests/StoreLeadRequest.php` — added `automation` to the `service_interest` whitelist (direct cause of the reported 422); raised `conversation` cap `max:30` → `max:60`
  - `app/Http/Requests/ChatMessageRequest.php` — raised `messages` cap `max:20` → `max:40` since staged delivery splits one AI reply into up to 3 assistant messages
- **Issues Encountered:** User reported 422 (Unprocessable Content) on `POST /api/leads` when submitting the chatbot lead form for a Business Automation inquiry. Root cause: Phase 1 of the chatbot upgrade added the `automation` `[COLLECT_INFO:...]` token but the backend validation whitelist was never updated — a gap missed by Phase 1 QA (checklist verified structure, not cross-layer token/whitelist parity). Mid-execution, a second instance of the same class was found: the `conversation` array cap (30) could be exceeded by the new 40-message history.
- **Resolution:** Whitelist updated, both history caps raised consistently (chat 40, lead conversation 60). No migration needed — `service_interest` is a plain string column. No frontend changes needed. All files pass `php -l`.
- **QA Checklist Result:** ✅ All pass (both phases). Lesson recorded: when adding a new token/type on the AI side, always grep Form Requests for matching `in:` whitelists.
- **Next Steps:** None — recommend re-testing the lead form in the browser to confirm the 422 is resolved.
