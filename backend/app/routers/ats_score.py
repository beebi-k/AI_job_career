from fastapi import APIRouter
from pydantic import BaseModel
from app.utils.ats_score import calculate_ats_score

router = APIRouter()

class ATSRequest(BaseModel):
    resume_text: str
    job_description: str

@router.post("/")
def ats_score(request: ATSRequest):
    result = calculate_ats_score(request.resume_text, request.job_description)
    return result
