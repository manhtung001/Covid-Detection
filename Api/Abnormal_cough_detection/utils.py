import os
import pickle
import joblib
import librosa
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import LabelEncoder
from pydub import AudioSegment

dir_path = os.path.dirname(os.path.realpath(__file__))

filepath = './saved_model_abnormal_cough'

from tensorflow.keras.models import load_model

def m4aToWav(path, name):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    track = AudioSegment.from_file(path)
    tmpPath = os.path.join(dir_path, 'tmp')
    wav_filename = name.replace("m4a", 'wav')
    pathWav = os.path.join(tmpPath, wav_filename)
    file_handle = track.export(pathWav, format='wav')

    return pathWav, wav_filename

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
    # cough = ['Barking cough', 'Chesty and wet cough', 'Coughing hard', 'Coughing up crap again', 'Dry Afternoon Cough', 'Gaggy wet cough', 'Night wet cough', 'Spring Allergy Coughing', 'Unknow']
    cough = ['Ho ăng ẳng', 'Ho có đờm', 'Ho dữ dội', 'Ho dai dẳng', 'Ho khan', 'Ho có đờm', 'Ho có đờm vào ban đêm', 'Ho dị ứng', 'Không phát hiện tiếng ho']
    return cough[pre[0]]
   