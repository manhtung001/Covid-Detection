import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default ConnectScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/mask.png')} style={styles.logo} />
        </View>
        <Text style={styles.helloText}>Kết nối</Text>
      </View>

      {/* <View style={styles.locationWrapper}>
        <Text style={styles.titleText}>Tin tức từ Bộ Y Tế</Text>
      </View> */}

      <WebView
        style={styles.webview}
        source={{ uri: 'https://covidmaps.hanoi.gov.vn/' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 50,
    alignItems: 'flex-end',
  },

  logoWrapper: {
    width: 60,
    height: 60,
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

  logo: {
    width: 50,
    height: 43,
  },

  helloText: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 15,
  },

  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 22.5,
    marginVertical: 10,
  },

  bannerWrapper: {
    padding: 20,
    borderColor: '#BCBCBC',
    borderWidth: 0.8,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bannerTextWrapper: {
    lineHeight: 23,
    fontSize: 16,
    color: 'gray',
    width: '90%',
    // fontWeight: 'bold',
  },

  blueText: {
    color: '#0077B6',
  },

  arrow: {
    width: 20,
    height: 20,
  },

  webview: {
    marginTop: 20,
    height: 620,
  },
});
