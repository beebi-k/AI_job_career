from fastapi import APIRouter
from ..ai.cover_letter_ai import generate_cover_letter

router = APIRouter(prefix="/cover-letter", tags=["Cover Letter"])

@router.post("/")
def create_cover_letter(user_input: str):
    content = generate_cover_letter(user_input)
    return {"cover_letter": content}
