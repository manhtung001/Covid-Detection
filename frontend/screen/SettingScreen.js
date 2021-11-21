import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

const userAvaUri = 'https://i.imgur.com/fk811ew.jpg';
const detectHistory = [
  {
    type: 'covid',
    time: '21/11/2021',
    result: 'Tỷ lệ nhiễm Covid',
    rate: '0.05%',
    advice:
      'Ở nhà trừ khi cần được chăm sóc y tế. Tách bản thân khỏi những người khác. Cố gắng ở trong phòng riêng và tránh xa người khác và thú cưng trong nhà quý vị càng nhiều càng tốt. Theo dõi các triệu chứng.',
  },
  {
    type: 'another',
    time: '21/11/2021',
    result: 'Bạn có khả năng bị ho khan với tỷ lệ',
    rate: '80%',
    advice:
      'Uống nhiều nước, đặc biệt là nước nóng. Súc miệng bằng nước muối. Hạn chế hút thuốc. Dùng máy tạo độ ẩm',
  },
];

export default SettingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState();
  const [result, setResult] = useState();
  const [rate, setRate] = useState();
  const [advice, setAdvice] = useState();

  const handleHistoryPress = (detect) => {
    setTime(detect.time);
    setResult(detect.result);
    setAdvice(detect.advice);
    setRate(detect.rate);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Thông tin người dùng</Text>
      <View style={styles.userInfoWrapper}>
        <Image source={{ uri: userAvaUri }} style={styles.userAvatar} />
        <Text style={styles.userNameText}>Đỗ Duy Anh</Text>
        <Text style={styles.dobText}>28/09/1999</Text>
        <Text style={styles.dobText}>Tân Mai, Hoàng Mai, Hà Nội</Text>
      </View>
      <Text style={[styles.titleText, { color: '#898989' }]}>
        Lịch sử nhận diện
      </Text>
      <ScrollView style={styles.historyWrapper}>
        {detectHistory.map((detect, index) => {
          if (detect.type === 'covid')
            return (
              <View style={styles.historyItemWrapper} key={index}>
                <Text style={styles.timeText}>{detect.time}</Text>
                <TouchableOpacity
                  style={styles.recommendItemWrapper}
                  onPress={() => handleHistoryPress(detect)}
                >
                  <View style={styles.recommendTextAndImageWrapper}>
                    <Image
                      source={require('../assets/another_present_icon.png')}
                      style={styles.recommendIcon}
                    />
                    <View style={styles.recommendTextWrapper}>
                      <Text style={styles.recommendTitleText}>
                        Dự đoán tỉ lệ nhiễm Covid
                      </Text>
                      <Text style={styles.recommendDescriptionText}>
                        {detect.result} {detect.rate}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/right_arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              </View>
            );
          else
            return (
              <View style={styles.historyItemWrapper} key={index}>
                <Text style={styles.timeText}>{detect.time}</Text>
                <TouchableOpacity
                  style={styles.recommendItemWrapper}
                  onPress={() => handleHistoryPress(detect)}
                >
                  <View style={styles.recommendTextAndImageWrapper}>
                    <Image
                      source={require('../assets/checklist_icon.png')}
                      style={styles.recommendIcon}
                    />
                    <View style={styles.recommendTextWrapper}>
                      <Text style={styles.recommendTitleText}>
                        Nhận diện tiếng ho bất thường
                      </Text>
                      <Text style={styles.recommendDescriptionText}>
                        {detect.result} {detect.rate}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/right_arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              </View>
            );
        })}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitleText}>Thông tin chi tiết</Text>
              <Text style={styles.modalDateText}>{time}</Text>
              <Text style={styles.modalDetectText}>
                <Text style={styles.boldText}>Kết quả: </Text>
                <Text>
                  <Text>{result}</Text>
                  <Text> </Text>
                  <Text style={{ fontWeight: 'bold' }}>{rate}</Text>
                </Text>
              </Text>
              <Text style={styles.modalDetectText}>
                <Text style={styles.boldText}>Lời khuyên: </Text>
                <Text>{advice}</Text>
              </Text>
              <View style={styles.qrWrapper}>
                <Image
                  source={require('../assets/qr_code.png')}
                  style={styles.qrCode}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },

  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  userInfoWrapper: {
    flex: 0.5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userNameText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  dobText: {
    fontSize: 20,
  },

  historyWrapper: {
    flex: 1,
  },

  historyItemWrapper: {
    marginTop: 20,
  },

  timeText: {
    color: 'gray',
    fontWeight: 'bold',
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
    marginTop: 10,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalTitleText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },

  modalDateText: {
    color: '#7D54F0',
    fontWeight: 'bold',
  },

  qrCode: {
    width: 147,
    height: 152,
  },

  boldText: {
    fontWeight: 'bold',
  },

  qrWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },

  modalDetectText: {
    marginVertical: 5,
    fontSize: 18,
  },
});
