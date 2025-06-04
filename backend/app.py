from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
import openai
import io
import pyttsx3
from pydantic import BaseModel

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
    # Simple echo chatbot; replace with openai.ChatCompletion for actual AI
    response_text = f"You said: {request.text}"
    return {"response": response_text}

@app.post('/tts')
async def tts(request: ChatRequest):
    engine = pyttsx3.init()
    engine.save_to_file(request.text, 'response.mp3')
    engine.runAndWait()
    audio_bytes = open('response.mp3', 'rb').read()
    return Response(content=audio_bytes, media_type='audio/mpeg')
