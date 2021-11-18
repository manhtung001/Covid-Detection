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
import os
import shutil

from utils import *

app = FastAPI(title='API Detect Covid')

# By using @app.get("/") you are allowing the GET method to work for the / endpoint.

call2Engine = Call2Engine()
call2Engine.getToken()

dir_path = os.path.dirname(os.path.realpath(__file__))
tmpPath = os.path.join(dir_path, 'tmp')
if os.path.exists(tmpPath):
    shutil.rmtree(tmpPath)
if not os.path.exists(tmpPath):
    os.mkdir(tmpPath)


@app.get("/")
def home():
    return "Congratulations! Your API is working as expected. Author: BunChaBert. Now head over to " \
           "/docs. "


@app.get("/news")
def getDataVn():
    res = crawlDataCovidVn()
    return res


@app.post("/uploadImgFirst")
async def uploadImgFirst(uuid: str, fileUpload: UploadFile = File(...)):
    # 1. VALIDATE INPUT FILE
    filename = fileUpload.filename
    fileExtension = filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not fileExtension:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")
    if not isinstance(uuid, str):
        raise HTTPException(status_code=415, detail="id user must be string")

    file_location = f"tmp/{fileUpload.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(fileUpload.file.read())
    print(f"info: file {fileUpload.filename} saved at {file_location}")

    res = img2Emb(uuid, file_location)
    return {
        "result": res,
    }


@app.post("/uploadAndPredictVideo")
async def uploadAndPredictVideo(uuid: str, engine: int, fileUpload: UploadFile = File(...)):
    file_location = f"tmp/{fileUpload.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(fileUpload.file.read())
    print(f"info: file {fileUpload.filename} saved at {file_location}")

    # check video that hay o
    checkIdentify = checkIdeViaVideo(file_location, uuid)

    if checkIdentify == True:
        pathWav, fileWavName = video2Audio(file_location, uuid)
        pred = ""
        if engine == 0:  # predict qua my model
            pred = predict(open(pathWav, 'rb'))
        elif engine == 1: # predict qua engine hackathon
            pred = call2Engine.callApi(fileWavName, open(pathWav, 'rb'))
        return {
            "result": pred,
        }
    else:
        return checkIdentify


@app.post("/predictMyModel")
async def predictMyModel(fileUpload: UploadFile = File(...)):
    filename = fileUpload.filename
    fileExtension = filename.split(".")[-1] in ("wav")
    if not fileExtension:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")
    pred = predict(fileUpload.file)
    return {
        "result": pred,
    }


@app.post("/predictEngine")
async def predictEngine(fileUpload: UploadFile = File(...)):
    filename = fileUpload.filename
    fileExtension = filename.split(".")[-1] in ("wav")
    if not fileExtension:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")
    pref_from_engine = call2Engine.callApi(fileUpload.filename, fileUpload.file)
    return {
        "result": pref_from_engine
    }


# Allows the server to be run in this interactive environment
nest_asyncio.apply()

# Host depends on the setup you selected (docker or virtual env)
host = "0.0.0.0" if os.getenv("DOCKER-SETUP") else "127.0.0.1"

# Spin up the server!
uvicorn.run(app, host=host, port=8000)

