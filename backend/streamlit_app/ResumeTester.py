import streamlit as st
import requests

st.title("📝 Resume Tester")

API_URL = "http://localhost:8000/resume/"

personal_info = st.text_area("Personal Info (JSON)")
education = st.text_area("Education (JSON)")
experience = st.text_area("Experience (JSON)")
skills = st.text_area("Skills (comma-separated)")
projects = st.text_area("Projects (JSON)")
target_role = st.text_input("Target Role")

if st.button("Generate Resume"):
    try:
        data = {
            "personal_info": eval(personal_info),
            "education": eval(education),
            "experience": eval(experience),
            "skills": [s.strip() for s in skills.split(",")],
            "projects": eval(projects),
            "target_role": target_role
        }
        response = requests.post(API_URL, json=data)
        st.code(response.json()["resume_text"])
    except Exception as e:
        st.error(str(e))
