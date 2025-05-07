from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import httpx
from app.core.config import settings

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.DIFY_API_URL}/chat-messages",
                headers={
                    "Authorization": f"Bearer {settings.DIFY_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "inputs": {},
                    "query": request.message,
                    "response_mode": "streaming",
                    "conversation_id": None,
                    "user": "user",
                },
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Error communicating with Dify API",
                )
            
            # Process streaming response
            # For now, we'll just return the first chunk
            # TODO: Implement proper streaming response handling
            data = response.json()
            return ChatResponse(response=data.get("answer", "I'm sorry, I couldn't process your request."))
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}",
        ) 