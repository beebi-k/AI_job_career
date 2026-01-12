from fastapi import APIRouter
from ..ai.portfolio_ai import generate_portfolio

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])

@router.post("/")
def create_portfolio(user_input: str):
    content = generate_portfolio(user_input)
    return {"portfolio": content}
