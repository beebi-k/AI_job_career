from fastapi import APIRouter
from pydantic import BaseModel
from app.utils.pdf_export import generate_pdf

router = APIRouter()

class PDFRequest(BaseModel):
    text: str
    filename: str

@router.post("/create")
def create_pdf(req: PDFRequest):
    filepath = generate_pdf(req.text, req.filename)
    return {"filepath": filepath, "message": "PDF created successfully"}
