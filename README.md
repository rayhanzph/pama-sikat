# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
   Optionally set `VITE_API_URL` if the backend runs on a different host (e.g. `http://localhost:3001`).
3. Run the app:
   `npm run dev`
4. Start the backend API in another terminal:
   `npm run server`
