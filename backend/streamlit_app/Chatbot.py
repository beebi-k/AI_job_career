import streamlit as st
import requests

st.title("🤖 AI Resume Chatbot")

API_URL = "http://localhost:8000/chatbot/"

if "messages" not in st.session_state:
    st.session_state.messages = []

user_input = st.chat_input("Ask me anything about resumes, cover letters, portfolios...")

if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})
    response = requests.post(API_URL, json={"message": user_input})
    bot_reply = response.json()["reply"]
    st.session_state.messages.append({"role": "assistant", "content": bot_reply})

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])
