from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter()

# Pydantic Schema
class ResumeRequest(BaseModel):
    title: str
    content: str
    user_id: int

@router.post("/generate")
def generate_resume(req: ResumeRequest):
    # Here you can call AI logic or DB
    enhanced = f"ATS-friendly Resume for {req.title}\n\n{req.content}"
    return {"resume": enhanced, "user_id": req.user_id}

@router.get("/")
def get_demo_resume():
    return {"message": "Resume route working"}
