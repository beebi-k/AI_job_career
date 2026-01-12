from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.chatbot_ai import get_chatbot_response

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/ask")
def ask_chatbot(req: ChatRequest):
    answer = get_chatbot_response(req.question)
    return {"answer": answer}
