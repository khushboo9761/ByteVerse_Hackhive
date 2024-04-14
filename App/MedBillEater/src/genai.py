#localhost python server
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser
import requests
from IPython.display import Image
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import getpass
import os
os.environ["GOOGLE_API_KEY"] = getpass.getpass("Add Your Gemini pro api key")
image_url = "https://picsum.photos/seed/picsum/300/300"
content = requests.get(image_url).content
Image(content)
llm = ChatGoogleGenerativeAI(model="gemini-pro-vision")
message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "What's in this image?",
        },  # You can optionally provide text parts
        {"type": "image_url", "image_url": image_url},
    ]
)

llm.invoke([message])
AIMessage(content=' The image contains a snow-capped mountain peak.')
hmessage = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "Convert Invoice data into json format with appropriate json tags as required for the data in image ",
        },
        {"type": "image_url", "image_url": file_path},
    ]
)

message = llm.invoke([hmessage])

print(message.content)
from PIL import Image
from IPython.display import display
# Specify the file path
file_path = "https://tse3.mm.bing.net/th?id=OIP.bbHZmqdYLLgrC44MX-tMPQHaFF&pid=Api&P=0&h=180"

image = Image.open(file_path)

# Show the image
display(image)

if __name__ == "__main__":
    app.run(host='192.168.87.218',port=3000,debug=True)