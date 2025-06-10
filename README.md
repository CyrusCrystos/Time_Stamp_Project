# Stamply: Universal AI Timestamping & Eco Impact Tracker

Stamply is a browser extension and backend API that:

- Automatically timestamps queries and responses on ChatGPT, Claude, and Gemini.
- Calculates and displays the environmental impact (energy and water usage) of each AI interaction.
- Provides a dashboard for users to view cumulative eco-impact and manage privacy settings.

Features

- Universal Timestamping: Cryptographically timestamps AI queries/responses.
- Eco Impact Tracking: Estimates energy and water usage per query.
- Dashboard: Popup UI to view stats and toggle eco-tracking.
- Privacy/Security: Minimal permissions, content script isolation, CORS, rate limiting, and environment variable support.

How to Use

Extension (Frontend)

1. Load the `extension/` folder as an unpacked extension in Chrome/Edge.
2. Use on supported AI chat platforms.
3. View eco-impact stats in the extension popup.

Backend (API)

1. Deploy the Express API (in `backend/`) to Vercel, Railway, or your own server.
2. Set your backend URL in the extension code.
3. Endpoints:
   - `POST /api/timestamps` — Returns timestamp and signature for content hash.
   - `POST /api/calculate-impact` — Returns estimated water and electricity usage.

Environmental Model

See [`docs/environmental-model.md`](docs/environmental-model.md) for calculation methodology and sources.

Development Principles

1. Learn on mobile, build in VS Code — Use Encode, ProgrammingHub, Imagi for learning; VS Code for real development.
2. Modular, secure, and documented codebase — Human-reviewed, with best practices and clear documentation.
3. Open to review and iteration — Designed for easy expansion and community contribution.

Contributing

Pull requests and suggestions are welcome! Please see the [docs](docs/) for more info.

License
MIT
