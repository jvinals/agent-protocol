# Backend

This is a simple FastAPI server that exposes two endpoints:

- `/chat` receives text and echoes back a response. Replace the logic with your own AI model to create a real agent.
- `/tts` converts text to speech using the ElevenLabs API and returns an MP3 file.

## Setup

```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

The server listens on `http://localhost:8000` by default.

Set the following environment variables for ElevenLabs:

- `ELEVENLABS_API_KEY` – your API key
- `ELEVENLABS_VOICE_ID` – optional voice identifier (defaults to `21m00Tcm4TlvDq8ikWAM`)
