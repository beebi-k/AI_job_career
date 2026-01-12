import streamlit as st
import requests

API_BASE = "http://127.0.0.1:8000"

st.title("AI Resume Builder")

menu = ["Home", "Resume", "Cover Letter", "Portfolio", "Chatbot"]
choice = st.sidebar.selectbox("Menu", menu)

if choice == "Home":
    st.write("Welcome to the AI Resume SaaS!")
    st.write("Use the menu to generate resumes, cover letters, or portfolios.")

elif choice == "Resume":
    st.subheader("Generate Resume")
    title = st.text_input("Title")
    content = st.text_area("Content")
    user_id = st.number_input("User ID", 1, 1000, 1)

    if st.button("Generate Resume"):
        data = {"title": title, "content": content, "user_id": user_id}
        response = requests.post(f"{API_BASE}/resume/generate", json=data)
        if response.status_code == 200:
            st.success("Resume Generated")
            st.text(response.json()["resume"])
        else:
            st.error("Error generating resume")

elif choice == "Chatbot":
    st.subheader("AI Chatbot")
    question = st.text_input("Ask anything...")
    if st.button("Ask"):
        data = {"question": question}
        response = requests.post(f"{API_BASE}/chatbot/ask", json=data)
        if response.status_code == 200:
            st.info(response.json()["answer"])
        else:
            st.error("Error getting chatbot response")
