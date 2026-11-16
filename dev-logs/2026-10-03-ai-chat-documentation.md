### Phase 1: AI Chat Support implementation guide (documentation only)

- **Timestamp:** 2026-10-03
- **Mode:** Agent
- **Persona(s) Active:** 🏗️ Tech Lead + ⚙️ Backend + 🖥️ Frontend
- **Files Modified/Created:**
  - `docs/ai-chat-support-guide.md` — New reusable guide: architecture and request flow, prerequisites and env vars, full backend code (config, rate limiter, routes, Form Requests, ChatController, lead migration/model/resource/controller, Mailables, email view), system-prompt template and token protocol (`[COLLECT_INFO:x]`, `[SUGGEST:A|B|C]`, `---` pacing), frontend code (RTK Query slices, store registration, full `ChatWidget.jsx` with placeholders, layout mount, `open-chat` CTA event), security notes, porting checklist, pitfalls and extension ideas (config-driven model, sessionStorage persistence, Anthropic provider swap), and testing (curl + manual checklist)
  - `docs/` — New directory
- **Issues Encountered:** The first file write failed because `docs/` did not exist.
- **Resolution:** Created the `docs/` directory, then wrote the file.
- **QA Checklist Result:** ✅ All applicable pass. No app code, routes, config, or migrations changed, so the Backend/Frontend/UI integrity items are N/A. Verified: no TypeScript syntax in any code example; all 24 referenced source paths exist; code fences are balanced; the full `ChatWidget` example compiles with esbuild (JSX loader). No guarded or git commands were run.
- **Notes for future phases:** The guide documents two pre-existing gaps that are not fixed here: (a) `.env.example` is missing `OPENAI_API_KEY` and `MAIL_TEAM_ADDRESS`; (b) emoji mojibake in `AsuraTechContextService.php`. The guide's widget example adds `maxLength={1000}` to the input as an optional improvement over the live widget.
- **Next Steps:** None required. Optional follow-ups (each needs its own approval): add the missing env keys to `.env.example`, clean up the prompt mojibake, and move the OpenAI model/settings into config.
