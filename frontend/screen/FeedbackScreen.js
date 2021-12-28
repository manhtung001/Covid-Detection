import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default AnotherDetectScreen = ({ navigation }) => {
  const [score, setScore] = useState([4, 4, 4]);
  const [feedback, onChangeFeedback] = useState(null);

  const questionList = [
    { title: 'Đánh giá chung của bạn về ứng dụng' },
    { title: 'Các chức năng đã đảm bảo nhu cầu của bạn?' },
    { title: 'Các chức năng thao tác dễ dàng, tiện lợi?' },
  ];

  const answerList = [
    { text: 'Rất hài lòng', value: 4 },
    { text: 'Hài lòng', value: 3 },
    { text: 'Bình thường', value: 2 },
    { text: 'Tạm được', value: 1 },
    { text: 'Không hài lòng', value: 0 },
  ];

  return (
    <ScrollView style={styles.container}>
      {questionList.map((question, questionIndex) => {
        return (
          <View key={questionIndex}>
            <Text style={styles.questionTitle}>{question.title}</Text>
            {answerList.map((answer, answerIndex) => {
              return (
                <View style={styles.instructionItem} key={answerIndex}>
                  <RadioButton
                    value={answer.value}
                    status={
                      score[questionIndex] === answer.value
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      let newScore = [...score];
                      newScore[questionIndex] = answer.value;
                      setScore(newScore);
                    }}
                    color="#728DED"
                  />
                  <Text style={styles.instructionText}>{answer.text}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
      <Text style={styles.questionTitle}>Góp ý của bạn về ứng dụng</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFeedback}
        value={feedback}
        placeholder="Hãy viết góp ý của bạn ở đây ..."
        keyboardType="default"
        multiline={true}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>XÁC NHẬN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },

  checkItem: {
    display: 'flex',
    flexDirection: 'row',
  },

  instructionWrapper: {
    margin: 15,
  },

  titleInstructionText: {
    fontSize: 18,
  },

  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    borderRadius: 30,
    padding: 15,
    marginVertical: 20,
    width: '50%',
    backgroundColor: '#728DED',
    marginBottom: 50,
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  instructionText: {
    // fontSize: 18,
  },

  questionTitle: {
    fontSize: 17,
    marginVertical: 5,
    color: 'gray',
    fontWeight: 'bold',
  },

  input: {
    height: 100,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#728DED',
  },
});
