from fastapi import APIRouter
from app.ai.skill_gap_ai import analyze_skill_gap
from pydantic import BaseModel

router = APIRouter()

class SkillGapRequest(BaseModel):
    user_skills: str
    target_role: str

@router.post("/")
def skill_gap(request: SkillGapRequest):
    result = analyze_skill_gap(request.user_skills, request.target_role)
    return result
