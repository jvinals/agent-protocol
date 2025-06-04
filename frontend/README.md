# Frontend

A minimal React Native app that interacts with the backend entirely through voice.
When the app loads it starts listening for speech, sends transcribed text to the
backend and plays back the response audio from the ElevenLabs-powered backend.

## Setup

This project uses Expo for convenience. Install dependencies and start the app:

```bash
npm install
npx expo start
```

Make sure the backend is running on `http://localhost:8000`.
