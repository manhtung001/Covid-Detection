# !pip install uvicorn
# !pip install fastapi
# !pip install python-multipart

import io
import uvicorn
import numpy as np
import nest_asyncio
from enum import Enum
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
import librosa
import os
import shutil

from utils import *

app = FastAPI(title='API Model Abnormal cough detection')

dir_path = os.path.dirname(os.path.realpath(__file__))
tmpPath = os.path.join(dir_path, 'tmp')
if os.path.exists(tmpPath):
    shutil.rmtree(tmpPath)
if not os.path.exists(tmpPath):
    os.mkdir(tmpPath)

@app.get("/")
def home():
    return "Congratulations! Your API is working as expected. Author: BunChaBert. Now head over to /docs" 

@app.post("/predict")
async def prediction(fileUpload: UploadFile = File(...)):
    filename = fileUpload.filename
    fileExtension = filename.split(".")[-1] in ("wav", "m4a")
    if not fileExtension:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")
    if filename.split(".")[-1] in ("m4a"):
        file_location = f"tmp/{fileUpload.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(fileUpload.file.read())
        print(f"info: file {fileUpload.filename} saved at {file_location}")
        pathWav, _ = m4aToWav(file_location, fileUpload.filename)
        pred = predict(open(pathWav, 'rb'))
    else:
        pred = predict(fileUpload.file)

    # pred = predict(fileUpload.file)
    return {"result": pred}


if __name__ == '__main__':
  # Allows the server to be run in this interactive environment
  nest_asyncio.apply()

  # Host depends on the setup you selected (docker or virtual env)
  host = "127.0.0.1"

  # Spin up the server!
  uvicorn.run(app, host=host, port=8001)
