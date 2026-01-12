import openai
from app.config import settings

openai.api_key = settings.OPENAI_API_KEY

def analyze_skill_gap(user_skills: str, target_role: str) -> dict:
    prompt = f"""
    Candidate skills: {user_skills}
    Target role: {target_role}
    Suggest missing skills, courses, projects, or certifications to achieve this role.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    return {"skill_gap_advice": response['choices'][0]['message']['content']}
