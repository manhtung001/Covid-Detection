import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const headlineNews = {
  name: 'Dream home design inspiration for you in the future.',
  image: {
    uri: require('../assets/news_image_1.png'),
  },
  url: 'https://google.com',
};

const newsList = [
  {
    name: 'Dream home design inspiration for you in the future.',
    image: {
      uri: require('../assets/news_image_1.png'),
    },
    url: 'https://google.com',
  },
  {
    name: 'Dream home design inspiration for you in the future.',
    image: {
      uri: require('../assets/news_image_1.png'),
    },
    url: 'https://google.com',
  },
  {
    name: 'Dream home design inspiration for you in the future.',
    image: {
      uri: require('../assets/news_image_1.png'),
    },
    url: 'https://google.com',
  },
  {
    name: 'Dream home design inspiration for you in the future.',
    image: {
      uri: require('../assets/news_image_1.png'),
    },
    url: 'https://google.com',
  },
];

export default NewsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/mask.png')} style={styles.logo} />
        </View>
        <Text style={styles.helloText}>Tin tức</Text>
      </View>

      <TouchableOpacity style={styles.bannerWrapper}>
        <Text style={styles.bannerTextWrapper}>
          <Text style={styles.blueText}>Tin tức Covid 19: </Text>
          <Text>Xem tin tức mới nhất toàn diện về Covid 19 tại đây</Text>
        </Text>
        <Image
          source={require('../assets/right_arrow.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <View style={styles.locationWrapper}>
        <Text style={styles.titleText}>Tin tức từ Bộ Y Tế</Text>
      </View>

      <WebView
        style={styles.webview}
        source={{ uri: 'https://covid19.gov.vn/' }}
      />
    </View>
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
  },

  blueText: {
    color: '#0077B6',
  },

  arrow: {
    width: 20,
    height: 20,
  },

  webview: {
    height: 500,
  },
});
