from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ChatRequest(BaseModel):
    text: str

@app.post('/chat')
async def chat(request: ChatRequest):
    # Simple echo chatbot; replace with an actual model for real conversations
    response_text = f"You said: {request.text}"
    return {"response": response_text}

@app.post('/tts')
async def tts(request: ChatRequest):
    api_key = os.getenv('ELEVENLABS_API_KEY')
    voice_id = os.getenv('ELEVENLABS_VOICE_ID', '21m00Tcm4TlvDq8ikWAM')
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        'xi-api-key': api_key,
        'Content-Type': 'application/json'
    }
    payload = {
        'text': request.text,
        'voice_settings': {
            'stability': 0.5,
            'similarity_boost': 0.75
        }
    }
    resp = requests.post(url, json=payload)
    resp.raise_for_status()
    return Response(content=resp.content, media_type='audio/mpeg')
