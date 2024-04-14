# Q&A Chatbot
#from langchain.llms import OpenAI

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

import streamlit as st
import os
import pathlib
import textwrap
from PIL import Image


import google.generativeai as genai


os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

## Function to load OpenAI model and get respones

def get_gemini_response(input,image):
    model = genai.GenerativeModel('gemini-pro-vision')
    if input!="":
       response = model.generate_content([input,image])
    else:
       response = model.generate_content(image)
    return response.text

##initialize our streamlit app

st.set_page_config(page_title="Gemini Image Demo")

st.header("Gemini Application")
input=st.text_input("Input Prompt: ",key="input")
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
image=""   
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image.", use_column_width=True)


submit=st.button("Tell me about the image")

## If ask button is clicked

if submit:
    
    response=get_gemini_response(input,image)
    st.subheader("The Response is")
    st.write(response)






# import React, { useState } from 'react';
# import { GenerativeModel } from 'google.generativeai'; // Assuming GenerativeModel is provided by the google.generativeai package
# import { setPageConfig, header, textInput, fileUploader, image, button, subheader, write } from 'streamlit'; // Assuming these Streamlit functions are provided by a custom package or library
# import { Image } from 'react-bootstrap'; // Assuming you're using React Bootstrap for the Image component

# // Configure the API key
# const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
# GenerativeModel.configure({ api_key: apiKey });

# // Function to load OpenAI model and get responses
# function getGeminiResponse(input, image) {
#     const model = new GenerativeModel('gemini-pro-vision');
#     let response;
#     if (input !== "") {
#         response = model.generateContent([input, image]);
#     } else {
#         response = model.generateContent(image);
#     }
#     return response.text;
# }

# // Component
# function GeminiApp() {
#     const [inputPrompt, setInputPrompt] = useState('');
#     const [uploadedImage, setUploadedImage] = useState(null);

#     // Function to handle image upload
#     const handleImageUpload = (event) => {
#         const file = event.target.files[0];
#         setUploadedImage(URL.createObjectURL(file));
#     };

#     // Function to handle "Tell me about the image" button click
#     const handleSubmit = () => {
#         const response = getGeminiResponse(inputPrompt, uploadedImage);
#         // Display the response
#         subheader("The Response is");
#         write(response);
#     };

#     return (
#         <div>
#             {header("Gemini Application")}
#             {textInput("Input Prompt: ", { value: inputPrompt, onChange: e => setInputPrompt(e.target.value), key: "input" })}
#             {fileUploader("Choose an image...", { accept: ["jpg", "jpeg", "png"], onChange: handleImageUpload })}
#             {uploadedImage && <Image src={uploadedImage} alt="Uploaded Image." fluid />}
#             {button("Tell me about the image", { onClick: handleSubmit })}
#         </div>
#     );
# }

# // Set Streamlit page config
# setPageConfig({ page_title: "Gemini Image Demo" });

# // Render the GeminiApp component
# export default GeminiApp;
