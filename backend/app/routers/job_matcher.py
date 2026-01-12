from fastapi import APIRouter
from app.ai.job_matcher_ai import match_resume_to_job
from pydantic import BaseModel

router = APIRouter()

class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str

@router.post("/")
def job_match(request: JobMatchRequest):
    result = match_resume_to_job(request.resume_text, request.job_description)
    return result
