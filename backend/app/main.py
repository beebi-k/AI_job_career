# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# relative imports
from .routes import resume, cover_letter, portfolio, job_matcher, skill_gap, ats_score, chatbot, pdf
from .database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Resume Builder")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(cover_letter.router, prefix="/cover-letter", tags=["CoverLetter"])
app.include_router(portfolio.router, prefix="/portfolio", tags=["Portfolio"])
app.include_router(job_matcher.router, prefix="/job-matcher", tags=["JobMatcher"])
app.include_router(skill_gap.router, prefix="/skill-gap", tags=["SkillGap"])
app.include_router(ats_score.router, prefix="/ats-score", tags=["ATS"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(pdf.router, prefix="/pdf", tags=["PDF"])

@app.get("/")
def root():
    return {"message": "AI Backend Running Successfully 🚀"}
