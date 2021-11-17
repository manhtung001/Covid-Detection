import librosa
from scipy.stats import kurtosis
from scipy.stats import skew
import numpy as np
import os
import pickle
import tensorflow_hub as hub

modelvgg = hub.load('https://tfhub.dev/google/vggish/1')


def eleven_features_mfcc(mfcc):
    '''
    return 11 important index of seri or array mfcc
    '''
    # mean
    mean_mfcc = np.mean(mfcc, axis=1)
    # median
    median_mfcc = np.median(mfcc, axis=1)
    # max
    max_mfcc = np.max(mfcc, axis=1)
    # min
    min_mfcc = np.min(mfcc, axis=1)
    # q1 quartile
    q1_mfcc = np.percentile(mfcc, 25, axis=1)
    # q3 quartile
    q3_mfcc = np.percentile(mfcc, 75, axis=1)
    # iqr
    iqr_mfcc = q3_mfcc - q1_mfcc
    # standard deviation
    std_mfcc = np.std(mfcc, axis=1)
    #  kurtosis
    kurtosis_mfcc = kurtosis(mfcc, axis=1)
    #  skewness
    skewness_mfcc = skew(mfcc, axis=1)
    # root_mean_square
    rms_mfcc = np.sqrt(np.mean(mfcc ** 2, axis=1))

    # concat 11 index
    eleven_feature_mfcc = np.concatenate((mean_mfcc, std_mfcc, median_mfcc, max_mfcc, min_mfcc,
                                          q1_mfcc, q3_mfcc, iqr_mfcc, kurtosis_mfcc,
                                          skewness_mfcc, rms_mfcc), axis=0)
    return eleven_feature_mfcc


def mfcc_type(x, fs, type_mfcc=2, num_mfcc=13):
    '''
    return mfcc of audio, type = 1,2,3
    '''
    # extraction mfcc
    mfcc = librosa.feature.mfcc(y=x, sr=fs, n_mfcc=num_mfcc, dct_type=type_mfcc)
    return mfcc


def features_vggish(x, fs, model):
    """
    embedding file audio to model (Vggish) --> return vecto 128 *2 demention: mean and std
    """
    embeddings_covid = model(x)
    # mean, std vggish embedding
    mean_vgg = np.mean(embeddings_covid, axis=0)
    std_vgg = np.std(embeddings_covid, axis=0)
    # concat
    feature_vggish = np.concatenate((mean_vgg, std_vgg), axis=0)
    return feature_vggish


def total_eleven_features_mfcc(x, fs, N_mfcc=13):
    """
    take 3 variants mfcc of audio, extract 11 important index return vecto 3 x13x11 dimention
    """

    mfcc_1 = mfcc_type(x, fs, type_mfcc=1, num_mfcc=N_mfcc)
    eleven_features_mfcc_1 = eleven_features_mfcc(mfcc=mfcc_1)

    mfcc_2 = mfcc_type(x, fs, type_mfcc=2, num_mfcc=N_mfcc)
    eleven_features_mfcc_2 = eleven_features_mfcc(mfcc=mfcc_2)

    mfcc_3 = mfcc_type(x, fs, type_mfcc=3, num_mfcc=N_mfcc)
    eleven_features_mfcc_3 = eleven_features_mfcc(mfcc=mfcc_3)

    total_eleven_feature_mfcc = np.concatenate((eleven_features_mfcc_1,
                                                eleven_features_mfcc_2,
                                                eleven_features_mfcc_3),
                                               axis=0)
    return total_eleven_feature_mfcc


def extract_4_features_audio(x, fs):
    """
    extract 4 feature audio rms, spectral centroid, roll off frequency, zero crossing
    take 11 important index --> return vecto 4x11 demention
    """
    rms = librosa.feature.rms(y=x)
    eleven_rms = eleven_features_mfcc(rms)

    cent = librosa.feature.spectral_centroid(y=x, sr=fs)
    eleven_cent = eleven_features_mfcc(cent)

    rolloff = librosa.feature.spectral_rolloff(y=x, sr=fs, roll_percent=0.85)
    eleven_rolloff = eleven_features_mfcc(rolloff)

    zero_crossing = librosa.feature.zero_crossing_rate(x)
    eleven_zero_crossing = eleven_features_mfcc(zero_crossing)

    extract_4_11_feature = np.concatenate((eleven_rms, eleven_cent,
                                           eleven_rolloff, eleven_zero_crossing), axis=0)

    return extract_4_11_feature


def feature_not_series(x, fs, top_db_filter=60):
    """
    extract duration trim, tempo, number of pich onset
    """
    # y = resample_22k(file_name)

    # dration trim
    y_trim, index = librosa.effects.trim(x, top_db=top_db_filter)
    duration_trim = librosa.get_duration(y_trim, sr=fs)

    # tempo
    onset_env = librosa.onset.onset_strength(x, sr=fs)
    tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=fs)

    # number of pich onset
    times_onset = len(librosa.onset.onset_detect(y=x, sr=fs, units='time'))

    # Dominant Frequency
    # cough_fortan = np.asfortranarray(x)
    # freqs, psd = signal.welch(cough_fortan)
    # DF = freqs[np.argmax(psd)]

    f_not_series = np.array([duration_trim, tempo, times_onset], dtype=float)
    return f_not_series


def total_732_feature(y, sr, model, trim_rate=60):
    # y, sr = librosa.load(file_name)
    if len(y) > 0:
        x = librosa.resample(y, sr, 16000)
        fs = 16000
        mfcc_feature = total_eleven_features_mfcc(y, sr, N_mfcc=13)
        vgglish_feature = features_vggish(x, fs, model)
        series_feature = extract_4_features_audio(y, sr)
        not_series_feature = feature_not_series(y, sr, top_db_filter=trim_rate)
        total_ft = np.concatenate((mfcc_feature, vgglish_feature,
                                   series_feature, not_series_feature), axis=0)
    else:
        total_ft = np.zeros((732,))

    return total_ft


def make_acoustic_feat(filename):
    feat = []
    # for filename in X.file_path.values:
    y, sr = librosa.load(filename)
    feature_values_vec = total_732_feature(y, sr, model=modelvgg)
    feature_values_vec = np.array(feature_values_vec)
    feat.append(feature_values_vec)
    feat = np.array(feat)
    feat = np.nan_to_num(feat, nan=np.nan)
    feat = np.clip(feat, -np.finfo(np.float32).max, np.finfo(np.float32).max)

    return feat


def predict(file):
    feat = make_acoustic_feat(file)

    res = 0

    model_list = os.listdir(f"weights/models/")

    for name in model_list:
        model = pickle.load(open(f"weights/models/" + name, "rb"))

        res += model.predict(feat)

    return (res / len(model_list))[0]
