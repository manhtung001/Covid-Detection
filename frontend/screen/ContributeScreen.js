import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default AnotherDetectScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.instructionWrapper}>
        <Text style={styles.titleInstructionText}>
          Bạn có thể đóng góp phát triển cho ứng dụng theo 2 cách:
        </Text>
        <View style={styles.instructionItem}>
          <Text style={styles.titleInstructionText}>・</Text>
          <Text style={styles.titleInstructionText}>
            Tham gia khảo sát và đưa ra những phản hồi khi sử dụng ứng dụng.
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.titleInstructionText}>・</Text>
          <Text style={styles.titleInstructionText}>
            Đóng góp các mẫu tiếng ho để đội ngũ phát triển có thể phát triển
            các thuật toán dự đoán tỷ lệ nhiễm bệnh.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#24C7FA' }]}
        onPress={() => navigation.navigate('FeedbackScreen')}
      >
        <Text style={styles.buttonText}>PHẢN HỒI VỀ ỨNG DỤNG</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FA537B' }]}
        onPress={() => navigation.navigate('ContributeCoughScreen')}
      >
        <Text style={styles.buttonText}>ĐÓNG GÓP TIẾNG HO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
    alignItems: 'center',
  },

  instructionWrapper: {
    margin: 15,
  },

  titleInstructionText: {
    fontSize: 18,
  },

  instructionItem: {
    flexDirection: 'row',
  },

  button: {
    borderRadius: 30,
    padding: 15,
    marginVertical: 20,
    width: '80%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
