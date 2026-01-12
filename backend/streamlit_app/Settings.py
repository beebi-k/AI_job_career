import streamlit as st
import os

st.title("⚙️ Settings")
st.write("Set your OpenAI API Key")

api_key = st.text_input("OpenAI API Key", type="password", value=os.getenv("OPENAI_API_KEY"))
if st.button("Save"):
    with open(".env", "w") as f:
        f.write(f"OPENAI_API_KEY={api_key}\n")
    st.success("Saved! Restart backend to apply.")
