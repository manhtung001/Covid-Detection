import os
import pickle
import joblib
import librosa
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder

filepath = './saved_model_abnormal_cough'

from tensorflow.keras.models import load_model

def log_mel_aud(aud):
    wav, sr = librosa.load(aud)
    print(sr)
    frame_size = 2048
    hop_size = 512
    aud_stft = librosa.stft(wav, n_fft = frame_size, hop_length = hop_size)
    y = np.abs(aud_stft)**2
    y_mel = librosa.feature.melspectrogram(S=y, sr = sr, n_mels = 64)
    y_db = librosa.power_to_db(y_mel)
    return y_db

def predict(file):
    res = ""
    model = load_model(filepath, compile = True)
    # model.summary()
    spec = log_mel_aud(file)
    spec = spec.reshape(-1, 64, 44, 1)
    pre = np.argmax(model.predict(np.array(spec)), axis = -1)
    cough = ['Barking cough', 'Chesty and wet cough', 'Coughing hard', 'Coughing up crap again', 'Dry Afternoon Cough', 'Gaggy wet cough', 'Night wet cough', 'Spring Allergy Coughing', 'Unknow']
    return cough[pre[0]]
   