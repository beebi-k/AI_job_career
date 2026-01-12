def calculate_ats_score(resume_text: str, keywords: list) -> int:
    count = sum(1 for kw in keywords if kw.lower() in resume_text.lower())
    return min(100, int(count / len(keywords) * 100) if keywords else 0)
