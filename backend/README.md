# Backend

This is a simple FastAPI server that exposes two endpoints:

- `/chat` receives a piece of text and echoes back a response. Replace the logic with an AI model (e.g. OpenAI) to create a real agent.
- `/tts` converts text to speech using `pyttsx3` and returns an MP3 file.

## Setup

```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

The server listens on `http://localhost:8000` by default.
