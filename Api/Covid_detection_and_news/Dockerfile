FROM python:3.8

WORKDIR /app

RUN apt-get update

RUN apt-get install ffmpeg libsm6 libxext6  -y

RUN pip install wheel cmake

RUN pip install --no-cache-dir joblib==1.1.0 \
moviepy==1.0.0 \
uvicorn==0.15.0 \
imutils==0.5.2 \
pydub==0.25.1 \
opencv_python==4.4.0.46 \
librosa==0.8.1 \
numpy==1.17.3 \
beautifulsoup4==4.10.0 \
fastapi==0.75.0 \
nest-asyncio==1.5.1 \
python-multipart

RUN pip install --no-cache-dir face_recognition==1.3.0

COPY . /app

RUN pip install --no-cache-dir  --upgrade -r /app/requirements.txt

EXPOSE 8000
CMD python3 backend.py
