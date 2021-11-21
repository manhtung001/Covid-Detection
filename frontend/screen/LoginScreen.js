import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = Constants.manifest.extra;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isWrongPassword, setWrongPassword] = useState(false);

  const handleLoginPress = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate('MainScreen');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error', errorCode, errorMessage);
        setWrongPassword(true);
      });
    setLoading(false);
  };

  const handleSignUpPress = () => {
    console.log('Chuyển trang đăng ký');
    navigation.navigate('SignUpScreen');
  };

  const handleResetPress = () => {
    // navigation.navigate('ResetPasswordScreen');
    console.log('Chuyển trang khôi phục mật khẩu');
  };

  const handleEyePress = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.header}>
          <StatusBar style="auto" />
          <View style={styles.logoWrapper}>
            <Image source={require('../assets/mask.png')} style={styles.logo} />
          </View>
          <Text style={styles.titleText}>COVID-19 Detection</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.introTitleText}>Đăng nhập</Text>
          {isWrongPassword ? (
            <Text style={[styles.wrongPasswordText, styles.introSubtitleText]}>
              Email hoặc mật khẩu sai. Bạn hãy thử lại!
            </Text>
          ) : (
            <Text style={styles.introSubtitleText}>
              Đăng nhập để bắt đầu sử dụng các chức năng của ứng dụng
            </Text>
          )}
          <Input
            placeholder="Email"
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <Input
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            onChangeText={(password) => {
              setPassword(password);
            }}
            rightIcon={() => {
              return (
                <TouchableOpacity onPress={handleEyePress}>
                  {showPassword ? (
                    <Feather name="eye" size={20} color="gray" />
                  ) : (
                    <Feather name="eye-off" size={20} color="gray" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.resetPassword}>
            <Text>Quên mật khẩu?</Text>
            <TouchableOpacity onPress={handleResetPress}>
              <Text style={styles.resetPasswordText}>Lấy lại mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signIn}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginPress}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.signUpText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    flex: 1.5,
    width: '80%',
    alignItems: 'center',
  },

  signIn: {
    flex: 0.75,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 78,
    height: 55,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 20,
  },

  logoWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#EFEFEF',
    shadowColor: '#939393',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  introTitleText: {
    fontSize: 22.5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#26B899',
  },

  introSubtitleText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: '5%',
    marginTop: 10,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#26B899',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop: 30,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signUp: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  signUpText: {
    color: '#26B899',
  },

  resetPassword: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  resetPasswordText: {
    marginLeft: 10,
    color: '#26B899',
  },

  wrongPasswordText: {
    color: 'red',
  },
});
