import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default AnotherDetectResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Kết quả</Text>
      <Text style={styles.resultText}>
        Bạn có khả năng bị ho khan với tỷ lệ 80%
      </Text>
      <Text style={styles.titleText}>Lời khuyên</Text>
      <Text style={styles.adviceText}>
        ・Uống nhiều nước, đặc biệt là nước nóng
      </Text>
      <Text style={styles.adviceText}>・Súc miệng bằng nước muối</Text>
      <Text style={styles.adviceText}>・Hạn chế hút thuốc</Text>
      <Text style={styles.adviceText}>・Dùng máy tạo độ ẩm</Text>
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
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },

  adviceText: {
    marginHorizontal: 25,
    marginVertical: 5,
    fontSize: 18,
  },

  buttonWrapper: {
    flex: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#26B899',
    borderRadius: 30,
    paddingVertical: 15,
    width: '50%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
