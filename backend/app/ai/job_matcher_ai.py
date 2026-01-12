import openai
from app.config import settings
from app.utils.ats_score import calculate_ats_score

openai.api_key = settings.OPENAI_API_KEY

def match_resume_to_job(resume_text: str, job_description: str) -> dict:
    # Basic ATS keyword matching
    ats_result = calculate_ats_score(resume_text, job_description)
    
    # AI suggestion for missing skills
    prompt = f"""
    Resume: {resume_text}
    Job Description: {job_description}
    Suggest missing skills, improvements, and advice for better alignment.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    ats_result["ai_suggestions"] = response['choices'][0]['message']['content']
    return ats_result
