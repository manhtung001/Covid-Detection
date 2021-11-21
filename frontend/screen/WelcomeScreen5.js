import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function WelcomeScreen5({ navigation }) {
  const handlePress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    //   <View style={styles.container}>
    //     <StatusBar style="auto" />
    //     <View style={styles.logoWrapper}>
    //       <Image source={require('../assets/mask.png')} style={styles.logo} />
    //     </View>
    //     <Text style={styles.titleText}>COVID-19 Detection</Text>
    //     <Image source={require('../assets/intro5.png')} />
    //     <Text style={styles.introTitleText}>Hỗ trợ những người khó khăn</Text>
    //     <Text style={styles.introSubtitleText}>
    //       Tìm kiếm người cần hỗ trợ trong khó khăn dịch bệnh và người có thể trợ
    //       giúp thông qua ứng dụng
    //     </Text>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={handlePress}
    //       activeOpacity={0.5}
    //     >
    //       <Text style={styles.buttonText}>Tiếp theo</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar style="auto" />
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/mask.png')} style={styles.logo} />
        </View>
        <Text style={styles.titleText}>COVID-19 Detection</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../assets/intro5.png')} />
      </View>

      <View style={styles.introWrapper}>
        <Text style={styles.introTitleText}>Hỗ trợ những người khó khăn</Text>
        <Text style={styles.introSubtitleText}>
          Tìm kiếm người cần hỗ trợ trong khó khăn dịch bệnh và người có thể trợ
          giúp thông qua ứng dụng
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flex: 1.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },

  imageWrapper: {
    flex: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },

  introWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: '10%',
    // backgroundColor: 'blue',
  },

  buttonWrapper: {
    flex: 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
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
    margin: 15,
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

  image: {
    width: '70%',
    resizeMode: 'contain',
  },

  introTitleText: {
    fontSize: 22.5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#26B899',
  },

  introSubtitleText: {
    textAlign: 'center',
    marginVertical: '5%',
  },

  button: {
    backgroundColor: '#26B899',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '50%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
