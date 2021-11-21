# BunChaBERT - Challenge1 - KO Hackathon 2021

<div align = "center"> <img src = "https://user-images.githubusercontent.com/44777689/142732702-fb3c6622-f5b6-4687-87f7-185e24e2dc88.png" /> </div>

## About us

Our team consists of 3 members:

1. Trần Quang Hiệp - PTIT - Backend, AI
2. Khổng Mạnh Tùng - PTIT - Backend, AI
3. Đỗ Duy Anh - HUST - Frontend, UX/UI

## Main feature

1. **Chatbot** - Friendly chatbot system to help answer questions related to the
   epidemic
2. **Covid-19 detection via cough** - Predict the probability of infection with
   Covid - 19 and give advice
3. **Abnormal cough detection** - Predict your unusual cough and give advice
4. **News** - Automatically update news from trusted information sources
5. **Statistic** - Statistical data and epidemic situation in provinces of
   Vietnam
6. **Contribute cough** - Contribute coughs to improve the model Machine
   learning, Deep learning
7. **Health Management** - Manage prediction results, generate QR codes to share
   prediction results when going to crowded places

## How to test this app

### Requirements

```
Python 3.6.9 or Python 3.7
Pip 21.3.1
Node.js 16.13.0
Npm 8.1.0
Yarn 1.22.17
Expo-cli 4.13.0
```

### Instructions

**0. Clone the folder app**

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

**6. Make sure npm, yarn and expo have already been installed**

```sh
npm install expo-cli --global
```

**7. Change directory and install all the needed node_modules package using**

```sh
cd frontend
yarn
```

**8. Create file .env**

```sh
API_KEY=AIzaSyCin6OW4ZvaRuktV9jXncBWELKnlF8sSVM
AUTH_DOMAIN=bunchabert.firebaseapp.com
PROJECT_ID=bunchabert
STORAGE_BUCKET=bunchabert.appspot.com
MESSAGING_SENDER_ID=975454195825
APP_ID=1:975454195825:web:67efbda5dbd0c65df20bd0
MEASUREMENT_ID=G-G1PBCMKQX7
CLIENT_EMAIL=dialogflow@bunchabert.iam.gserviceaccount.com
PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDf1jE5E8xUM14c\nW4hXyMjLmzUXI24wMs8GGwjewQb6TSmqcqoTdEgPIXc+MtskZndlbYao3OXVIPAh\nB2k0XSPQM0c9FET07kGPZqw2slfSrtkSNWKuqIGXDFU0oT+H2WR0lPFr8xnRNU7N\nvoGoQT/YWKpwxZfATkPXHszNQxZAULASM6yQwKgEGvzbjyfRulc6ZneYugN2upWG\nT4+CgYGKC+LffmstIQBhBiI329Jz3HJb0DzD7aSUp2u9+OEpzO89798kC4MroZZm\nSqohl96Z5U1iyzTeeGKc40vM0dDzChfxClFxJYzCTzXFidCrhAZCap1yoO6v+JxD\nhVpp74rnAgMBAAECggEAT3r4GYNdL5zZ0wnxfPJP0nR3QpMTIkw4VLuux6IU/zX9\nEIgMukG1AKJqfAyE4gT8amicw0NE3QwIGEJQagaUm+5JYnfbEHm1j9zuU7G6G5Z4\nf82zD7/H3EHF051aOLvJvtfQbftxdGcQZ2A5G+ynZgP96XNQMjnYPv+xy0UCFq2l\npXD8vWUGgXhKyRISCxXfwuIzVhYkoPSkuf3O2j7LQnhHCkOxN2heuYcXP2JppUCd\nIGXS8UorMJEarFNhrzAuuOsCLo/7IIDH2O2lvGzHQIrROv0owVVObIdtG+L94m/c\nCOIjJN0uqEeezw63tFyUY+kcfQoD6JlhGtq1+kPaIQKBgQD//e5gyRYo8btrwS9a\nFsEhFQ3VamYvgvdJ/HnW/jpo2bRfTTOxesb6keLkOLupO+U6GqalNFURuiK1c4rg\noZ7bL3Sn3Fz8Odb4KpGSqzFEhJsCwqy4vzqR7rvndwqMy5vSxChamDDOqL4cCg9c\ngUhEqJML5jjdD0V35FQZdlicUQKBgQDf2ABRo6FBvJz4dnPg/bdiYgFRT5EPxgeM\nMbkyhrOobwCJL9k5g5pMi6ZRwoPOWwW/ZkH89EY0i+dBNx9msLVeDAUkoJl8aVD9\nPVLdYJ0POjJ6LFH4s2v6LVujiASb+tYUaVouTXZLIBCysPSs6tUks7A/SzApzP80\neXbhNjC9twKBgQCC0m6EH7+nZQH2618blw1TrsLHEfzuwutFcDWD3aBT/Q3ktjt4\ns9oEK5HcN/IPZoCa1Qvc2YWv7YPXXxjV+0KHmRTww/jxHU3yvS5v2fTvoyTkoEBM\nmc2AzpRQkdFeap9TctN8mNI4ipu9EJcRGzCnhc7AAgOFVUyXHKSt7oESQQKBgAul\nn46f5voWqEw9TZY9XVdfJhZm/3NEqIvg4nQAkkSHUg3RUYoukM6+zW6fomAQWGI3\nHePdifGd/fBkv9uGAkncckAPoyzYBgDHOhKOvl1Wd93nhHReUZX42jXOE/9Rs+Xn\n/Ws/WJJcHsJNds2wglqghuEkNmNWaUj/sPHS8gJNAoGBANDH94HllE6Wel2BplaZ\np+3vYkIe3+WTUQutZ4O5v5WEGsdrq+XIxb+9SjWy7HdwYi+ZPZerq0gfcJI2atTH\nScopyt9+WSjMa4Lm8EYYa8qptPUf1w6sXFjLi/s02RzkQP/0TStg0FCcOR7NOatK\nL/d8EVrS/YEXoGNxqz1Ttekz\n-----END PRIVATE KEY-----\n'
```

**9. Run app**

```sh
expo start
```

**10. Notes:** After the app runs successfully, you can test either on the
simulator or your own smartphone by scanning the QR code on Expo Metro Bundler.

**More details**:
[Product Introduction](https://docs.google.com/presentation/d/1qONxEO1htEpywhxtx3e9fyZOpD-Yjg52bfWI4bz216g/edit?usp=sharing)
