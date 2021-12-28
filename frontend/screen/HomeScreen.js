import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
// import { getAuth } from 'firebase/auth';

// const auth = getAuth();

const functionList = [
  {
    name: 'Dự đoán tỷ lệ nhiễm bệnh',
    image: {
      uri: require('../assets/hospital_icon.png'),
    },
    navigate: 'CovidDetectScreen',
  },
  {
    name: 'Dự đoán bệnh về phổi khác',
    image: {
      uri: require('../assets/book_icon.png'),
    },
    navigate: 'AnotherDetectScreen',
  },
  {
    name: 'Tin tức',
    image: {
      uri: require('../assets/news_icon.png'),
    },
    navigate: 'Tin tức',
  },
  {
    name: 'Thống kê tình hình dịch bệnh',
    image: {
      uri: require('../assets/present_icon.png'),
    },
    navigate: 'Kết nối',
  },
  {
    name: 'Chatbot',
    image: {
      uri: require('../assets/saving_money_icon.png'),
    },
    navigate: 'Chatbot',
  },
  {
    name: 'Hỗ trợ',
    image: {
      uri: require('../assets/call_icon.png'),
    },
    navigate: 'Kết nối',
  },
  {
    name: 'Đóng góp',
    image: {
      uri: require('../assets/certificate_icon.png'),
    },
    navigate: 'ContributeScreen',
  },
];

const recommendList = [
  {
    title: 'Thông điệp 5K',
    description: '"Lá chắn thép" trong phòng chống đại dịch Covid-19',
    image: {
      uri: require('../assets/another_present_icon.png'),
    },
  },
  {
    title: 'Chỉ thị 15',
    description: 'Từ 6h ngày 21/9: Hà Nội thực hiện Chỉ thị 15',
    image: {
      uri: require('../assets/checklist_icon.png'),
    },
  },
];

export default function HomeScreen({ navigation }) {
  // const user = auth.currentUser;
  // console.log(user.email);
  // console.log(user.displayName);
  const [time, setTime] = useState();
  setInterval(() => {
    const now = moment().format('HH:mm');
    setTime(now);
  }, 1000);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image source={require('../assets/mask.png')} style={styles.logo} />
        </View>
        <Text style={styles.helloText}>Xin chào Duy Anh</Text>
      </View>

      <View style={styles.locationWrapper}>
        <Text style={styles.titleText}>Việt Nam</Text>
        <Text style={styles.timeText}>21 November 2021, {time}</Text>
      </View>

      <View style={styles.statisticWrapper}>
        <View style={styles.statisticItemWrapper}>
          <Image
            source={require('../assets/virus_icon.png')}
            style={styles.icon}
          />
          <Text style={[styles.statisticNumber, { color: '#6045E2' }]}>
            1.094.514
          </Text>
          <Text>Nhiễm bệnh</Text>
        </View>
        <View style={styles.statisticItemWrapper}>
          <Image
            source={require('../assets/health_green_icon.png')}
            style={styles.icon}
          />
          <Text style={[styles.statisticNumber, { color: '#2ECC71' }]}>
            905.500
          </Text>
          <Text>Đã khỏi bệnh</Text>
        </View>
        <View style={styles.statisticItemWrapper}>
          <Image
            source={require('../assets/death_icon.png')}
            style={styles.icon}
          />
          <Text style={[styles.statisticNumber, { color: '#FF1800' }]}>
            23.761
          </Text>
          <Text>Tử vong</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bannerWrapper}
        onPress={() => navigation.navigate('Tin tức')}
      >
        <Image source={require('../assets/banner.png')} style={styles.banner} />
      </TouchableOpacity>

      <Text style={styles.titleText}>Chức năng</Text>
      <View style={styles.functionWrapper}>
        {functionList.map((item, id) => {
          return (
            <TouchableOpacity
              style={styles.functionItemWrapper}
              key={id}
              onPress={() => navigation.navigate(item.navigate)}
            >
              <Image source={item.image.uri} style={styles.functionIcon} />
              <Text style={styles.functionText}> {item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.titleText}>Khuyến nghị</Text>
      <View style={styles.recommendWrapper}>
        {recommendList.map((item, id) => {
          return (
            <TouchableOpacity
              style={styles.recommendItemWrapper}
              key={id}
              onPress={() => {
                navigation.navigate('Tin tức');
              }}
            >
              <View style={styles.recommendTextAndImageWrapper}>
                <Image source={item.image.uri} style={styles.recommendIcon} />
                <View style={styles.recommendTextWrapper}>
                  <Text style={styles.recommendTitleText}>{item.title}</Text>
                  <Text style={styles.recommendDescriptionText}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../assets/right_arrow.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    paddingHorizontal: 15,
  },

  statisticWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 15,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 22.5,
    margin: 10,
  },

  timeText: {
    color: 'gray',
  },

  bannerWrapper: {},

  functionWrapper: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },

  recommendWrapper: {
    flex: 2,
    marginBottom: 10,
  },

  statisticItemWrapper: {
    width: '30%',
    padding: 10,
    borderColor: '#C8C8C8',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    margin: 5,
    width: 26,
    height: 26,
  },

  statisticNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  banner: {
    width: 414,
    height: 87,
  },

  functionItemWrapper: {
    // shadowColor: '#939393',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    // elevation: 15,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    width: '22%',
    margin: 5,
    minHeight: 110,
  },

  functionIcon: {
    margin: 10,
    width: 40,
    height: 40,
  },

  functionText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
  },

  recommendIcon: {
    margin: 10,
    width: 30,
    height: 30,
  },

  recommendItemWrapper: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
  },

  recommendTextAndImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  recommendTextWrapper: {},

  recommendTitleText: {
    fontSize: 13,
  },

  recommendDescriptionText: {
    fontSize: 11,
    color: 'gray',
  },

  arrow: {
    width: 20,
    height: 20,
    margin: 10,
  },
});
