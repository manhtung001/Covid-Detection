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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [firstPassword, setFirstPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isWrongPassword, setWrongPassword] = useState(false);

  const handleSingUpPress = () => {
    if (firstPassword === secondPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, secondPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigation.navigate('MainScreen');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error', errorCode);
          console.log('errorMessage', errorMessage);
        });
    } else {
      setWrongPassword(true);
    }
    setLoading(false);
  };

  const handleSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleFirstEyePress = () => {
    setShowFirstPassword(!showFirstPassword);
  };

  const handleSecondEyePress = () => {
    setShowSecondPassword(!showSecondPassword);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar style="auto" />
          <View style={styles.logoWrapper}>
            <Image source={require('../assets/mask.png')} style={styles.logo} />
          </View>
          <Text style={styles.titleText}>COVID-19 Detection</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.introTitleText}>Đăng ký</Text>
          {isWrongPassword ? (
            <Text style={[styles.wrongPasswordText, styles.introSubtitleText]}>
              Mật khẩu không khớp. Bạn hãy nhập lại!
            </Text>
          ) : (
            <Text style={styles.introSubtitleText}>
              Đăng ký tài khoản sử dụng ứng dụng
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
            secureTextEntry={!showFirstPassword}
            onChangeText={(password) => {
              setFirstPassword(password);
            }}
            rightIcon={() => {
              return (
                <TouchableOpacity onPress={handleFirstEyePress}>
                  {showFirstPassword ? (
                    <Feather name="eye" size={20} color="gray" />
                  ) : (
                    <Feather name="eye-off" size={20} color="gray" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
          <Input
            placeholder="Mật khẩu"
            secureTextEntry={!showSecondPassword}
            onChangeText={(password) => {
              setSecondPassword(password);
            }}
            rightIcon={() => {
              return (
                <TouchableOpacity onPress={handleSecondEyePress}>
                  {showSecondPassword ? (
                    <Feather name="eye" size={20} color="gray" />
                  ) : (
                    <Feather name="eye-off" size={20} color="gray" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.signIn}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSingUpPress}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={handleSignInPress}>
              <Text style={styles.signUpText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
