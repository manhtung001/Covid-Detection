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

from utils import *

app = FastAPI(title='Model 732 features with Lgbm')


# By using @app.get("/") you are allowing the GET method to work for the / endpoint.

@app.get("/")
def home():
    return "Congratulations! Your API is working as expected. Author: Tung Khong Manh. Now head over to " \
           "http://localhost:8000/docs. "


@app.post("/predict")
async def prediction(fileUpload: UploadFile = File(...)):
    filename = fileUpload.filename
    fileExtension = filename.split(".")[-1] in ("wav")
    if not fileExtension:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")
    pred = predict(fileUpload.file)
    return {"result": pred}


# Allows the server to be run in this interactive environment
nest_asyncio.apply()

# Host depends on the setup you selected (docker or virtual env)
host = "0.0.0.0" if os.getenv("DOCKER-SETUP") else "127.0.0.1"

# Spin up the server!
uvicorn.run(app, host=host, port=8000)

# Allows the server to be run in this interactive environment
nest_asyncio.apply()

# Host depends on the setup you selected (docker or virtual env)
host = "0.0.0.0" if os.getenv("DOCKER-SETUP") else "127.0.0.1"

# Spin up the server!
uvicorn.run(app, host=host, port=8000)

