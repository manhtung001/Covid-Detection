# BunChaBERT - Challenge1 - KO Hackathon 2021

<div align = "center"> <img src = "https://user-images.githubusercontent.com/44777689/142732702-fb3c6622-f5b6-4687-87f7-185e24e2dc88.png" /> </div>

## About us

Our team consists of 3 members:

1. Trần Quang Hiệp - PTIT - Backend, AI
2. Khổng Mạnh Tùng - PTIT - Backend, AI
3. Đỗ Duy Anh - HUST - Frontend, UX/UI

## Demo


## Main feature

1. **Chatbot** - Friendly chatbot system to help answer questions related to the epidemic
2. **Covid-19 detection via cough** - Predict the probability of infection with Covid - 19 and give advice 
3. **Abnormal cough detection** - Predict your unusual cough and give advice
4. **News** - Automatically update news from trusted information sources
5. **Statistic** - Statistical data and epidemic situation in provinces of Vietnam
6. **Contribute cough** - Contribute coughs to improve the model Machine learning, Deep learning
7. **Health Management** - Manage prediction results, generate QR codes to share prediction results when going to crowded places


## How to test this app

### Requirements

```
Python 3.6.9 or Python 3.7
Pip 21.3.1
```

### Instructions

**0. Clone the folder app:**

```sh
git clone https://github.com/manhtung001/Covid-Detection.git
```

**1. Extract the model file to detect abnormal coughs**

```sh
cd Api/Abnormal_cough_detection/
unzip saved_model_abnormal_cough.zip
```

**2. Install python package for Abnormal_cough_detection**
```sh
python3 -m venv /env
source env/bin/activate
pip3 install -r requirements.txt
```
**3. Run Abnormal_cough_detection Api**
```sh
python3 backend.py
```

**4. Install python package for Covid_detection_and_news**
Note that deactivate the old venv and cd to the root directory.
```sh
cd Api/Covid_detection_and_news
python3 -m venv /env
source env/bin/activate
pip3 install -r requirements.txt
```

**5. Run Covid_detection_and_news Api**
```sh
python3 backend.py
```

**6. Make sure npm and expo have already been installed:**

```sh
npm install expo-cli --global
```

**7. Change directory and install all the needed node_modules package using:**

```sh
cd 
npm install
```

**8. Run app:**

```sh
expo start
```

**9. Notes:**
After the app runs successfully, you can test either on the simulator or your own smartphone by scanning the QR code on Expo Metro Bundler.


**More details**: [Product Introduction](https://docs.google.com/presentation/d/1qONxEO1htEpywhxtx3e9fyZOpD-Yjg52bfWI4bz216g/edit?usp=sharing) 


