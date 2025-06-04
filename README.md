# Voice Agent

This project provides a basic template for a voice-driven AI assistant.
It contains a Python backend powered by FastAPI and a React Native frontend.
The mobile app listens for speech, sends it to the backend and speaks the
response back without any button presses.

## Structure

- `backend` – FastAPI server with simple chat and text-to-speech endpoints.
- `frontend` – React Native (Expo) app that interacts with the backend using
  voice.

## Getting Started

1. Start the backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app:app --reload
   ```

2. Run the mobile app:

   ```bash
   cd frontend
   npm install
   npx expo start
   ```

With both running you can talk to the app and receive spoken replies.
