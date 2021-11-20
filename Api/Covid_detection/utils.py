import json
import os
import pickle
import cv2
import face_recognition
import joblib
import librosa
import numpy as np
import requests
import moviepy.editor as mp
from imutils.video import VideoStream
from bs4 import BeautifulSoup
from pydub import AudioSegment

dir_path = os.path.dirname(os.path.realpath(__file__))

def m4aToWav(path, name):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    track = AudioSegment.from_file(path)
    tmpPath = os.path.join(dir_path, 'tmp')
    wav_filename = name.replace("m4a", 'wav')
    pathWav = os.path.join(tmpPath, wav_filename)
    file_handle = track.export(pathWav, format='wav')

    return pathWav, wav_filename


def responeWithRecommend(acc):
    acc = acc * 100
    if acc >= 90:
        list = ['Tách bản thân khỏi những người khác. Cố gắng ở nhà trong phòng riêng và tránh xa người khác và thú cưng trong nhà bạn càng nhiều càng tốt',
                'Bạn cần gọi điện cho trung tâm y tế', 'Theo dõi các triệu chứng']
    elif acc >= 70:
        list = ['Ở nhà trừ khi cần được chăm sóc y tế', 'Theo dõi các triệu chứng']
    elif acc >= 50:
        list = ['Bạn nên đi xét nghiệm Covid',
                'Theo dõi các triệu chứng']
    elif acc >= 30:
        list = ['Hãy giữ gìn sức khỏe',
                'Tránh sử dụng rượu bia và ma túy.',
                'Hãy chăm sóc cho thân thể và tâm trí của bạn. Hãy hít thở sâu, ngồi thiền, luyện tập giãn cơ và tập thể dục thường xuyên.']
    else:
        list = ['Cố gắng ăn các bữa ăn lành mạnh, có đầy đủ chất dinh dưỡng.',
                'Ngủ đủ giấc.']
    return list

def handleResponeEngine(pred):
    label = pred["assessment"]["recommended_label"]
    acc = pred["assessment"]["recommended_prob"] / 100
    if label == "negative":
        acc = 1 - acc
    return acc


def crawlDataCovidVn():
    try:
        linkNews = "https://covid19.gov.vn"
        responseNews = requests.get(linkNews)
        soup = BeautifulSoup(responseNews.content, "html.parser")
        titles = soup.findAll('a', class_="img-resize")

        linkCovidNum = "https://static.pipezero.com/covid/data.json"
        responseCovidNum = requests.get(linkCovidNum)

        if len(titles) == 0 or responseCovidNum == {}:
            raise Exception("error from api")

        response = {
            "news": [],
            "covidNum": responseCovidNum.json()
        }

        for item in titles:
            response["news"].append({
                'link': linkNews + item['href'],
                'title': item['title'],
                'image': item.findChild("img")["src"]
            })
        return response
    except:
        print("send default res")
        with open(os.path.join(dir_path, 'assets/defaultRespone.txt'), "r") as filehandle:
            response = json.load(filehandle)
        return response


def img2Emb(uuid, file_location):
    dataPath = os.path.join(dir_path, 'EmbDataset')
    if not os.path.exists(dataPath):
        os.mkdir(dataPath)

    userTmp = uuid + ".txt"

    flag = True  # neu de true thi them 1 buoc crop face trong img roi moi emb => mat nhieu time

    if flag:
        # Load image
        image = cv2.imread(file_location)
        print(f"Loaded image")
        # Convert it from BGR to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        print(f"Converted image")

        # detect face in the image and get its location (square boxes coordinates)
        boxes = face_recognition.face_locations(image, model='cnn')
        print(f"boxed image")

        # Encode the face into a 128-d embeddings vector
        encoding = face_recognition.face_encodings(image, boxes)
        print("Encoded")
    else:
        img = face_recognition.load_image_file(file_location)
        encoding = face_recognition.face_encodings(img)[0]
        print("Encoded")

    if len(encoding) > 0:
        with open(os.path.join(dataPath, userTmp), "w+") as filehandle:
            json.dump(encoding.tolist(), filehandle)
        return "success"

    return "fail"


def checkIdeViaVideo(file_location, uuid):
    video_capture = VideoStream(src=file_location).start()
    frame = video_capture.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect faces
    face_cascPath = 'haarcascade_frontalface_alt.xml'
    face_detector = cv2.CascadeClassifier(face_cascPath)
    faces = face_detector.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5,
        minSize=(50, 50),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    if len(faces) == 0:
        return "khong co mat nguoi trong video"

    filename_Emb = uuid + ".txt"
    dataPath = os.path.join(dir_path, 'EmbDataset')
    full_filename_Emb = os.path.join(dataPath, filename_Emb)
    listEmbed = os.listdir(dataPath)

    if filename_Emb in listEmbed:

        # for each detected face
        for (x, y, w, h) in faces:
            # Encode the face into a 128-d embeddings vector
            encoding = face_recognition.face_encodings(rgb, [(y, x + w, y + h, x)])[0]

            with open(full_filename_Emb, "r") as filehandle:
                embData = np.array(json.load(filehandle))

            # Compare the vector with all known faces encodings
            matches = face_recognition.compare_faces([embData], encoding)

            # If there is at least one match:
            if True in matches:
                return True
    return "nguoi trong video khong phai chu tai khoan"


def video2Audio(file_location, uuid):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    tmpPath = os.path.join(dir_path, 'tmp')

    # Insert Local Video File Path
    clip = mp.VideoFileClip(file_location)

    fileWavName = uuid + ".wav"

    # Insert Local Audio File Path
    pathWav = os.path.join(tmpPath, fileWavName)
    clip.audio.write_audiofile(pathWav)

    return pathWav, fileWavName


class Call2Engine:
    def __init__(self):
        self.former = ''
        self.auth_token = ''

    def getToken(self):
        body = {'username': 'engine', 'password': 'aicovidvn2021##'}
        resp = requests.post('https://api.aicovidvn.org/token', data=body)
        resp = resp.json()
        self.former = resp['token_type']
        self.auth_token = resp['access_token']
        print(resp)

    def callApi(self, filename, file):
        hed = {'Authorization': self.former + ' ' + self.auth_token}
        payload = {
            'meta': '{ "uuid": "string", "subject_gender": "string", "subject_age": 0, "subject_cough_type": "string", "subject_health_status": "string", "note": "string"}'}
        files = [
            ('audio_file', (
                filename, file,
                'audio/wav'))
        ]
        print(files)
        response = requests.request("POST", 'https://api.aicovidvn.org/api/predict/', headers=hed, data=payload,
                                    files=files)
        print(response.text)
        return response.json()


def extract(file):
    source, sr = librosa.load(file, res_type="kaiser_fast")
    stft = np.abs(librosa.stft(source))

    mfcc = librosa.feature.mfcc(y=source, sr=sr, n_mfcc=13)
    chroma = librosa.feature.chroma_stft(S=stft, sr=sr)
    mel = librosa.feature.melspectrogram(y=source, sr=sr)
    zrc = librosa.feature.zero_crossing_rate(source)

    mfcc = np.mean(mfcc, axis=1)
    chroma = np.mean(chroma, axis=1)
    mel = np.mean(mel, axis=1)
    zcr = np.mean(zrc)

    return mfcc, chroma, mel, zcr


def scale(features, name):
    scaler = joblib.load(f"weights/scalers/scaler_{name}.save")

    return scaler.transform(features.reshape(1, -1))


def predict(file):
    mfcc, chroma, mel, zcr = extract(file)

    zcr = scale(zcr, "zcr").reshape(-1)
    mfcc = scale(mfcc, "mfcc").reshape(-1)
    chroma = scale(chroma, "chroma").reshape(-1)
    mel = scale(mel, "mel").reshape(-1)

    x = np.concatenate([zcr, mfcc, chroma, mel], axis=0).reshape(1, -1)

    res = 0

    model_list = os.listdir(f"weights/models/")

    for name in model_list:
        model = pickle.load(open(f"weights/models/" + name, "rb"))

        res += model.predict(x)

    return (res / len(model_list))[0]



