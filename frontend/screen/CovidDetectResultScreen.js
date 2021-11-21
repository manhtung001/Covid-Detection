import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default CovidDetectResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Kết quả</Text>
      <Text style={styles.resultText}>
        Bạn có khả năng <Text style={{ fontWeight: 'bold' }}>0.05%</Text> nhiễm
        Covid - 19
      </Text>
      <Text style={styles.titleText}>Lời khuyên</Text>
      <Text style={styles.adviceText}>
        ・Ở nhà trừ khi cần được chăm sóc y tế
      </Text>
      <Text style={styles.adviceText}>
        ・Tách bản thân khỏi những người khác. Cố gắng ở trong phòng riêng và
        tránh xa người khác và thú cưng trong nhà quý vị càng nhiều càng tốt.{' '}
      </Text>
      <Text style={styles.adviceText}>・Theo dõi các triệu chứng</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleText: {
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#6D1AF3',
    textAlign: 'center',
  },

  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },

  adviceText: {
    marginHorizontal: 35,
    marginVertical: 5,
    fontSize: 18,
  },

  buttonWrapper: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },

  button: {
    backgroundColor: '#26B899',
    borderRadius: 30,
    paddingVertical: 15,
    // paddingHorizontal: 20,
    width: '50%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
