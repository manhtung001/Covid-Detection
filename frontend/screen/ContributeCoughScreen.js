import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RadioButton, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default AnotherDetectScreen = ({ navigation }) => {
  const [checked, setChecked] = useState('first');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    setTimeout(() => {
      setIsRecording(false);
      setLoading(true);
    }, 2000);
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate('AnotherDetectResultScreen');
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.instructionWrapper}>
        <Text style={styles.titleInstructionText}>
          Chọn một trong 3 lựa chọn sau
        </Text>
        <View style={styles.instructionItem}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
            color="#728DED"
          />
          <Text style={styles.instructionText}>
            Bạn đã hoặc từng bị nhiễm Covid - 19
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
            color="#728DED"
          />
          <Text style={styles.instructionText}>Bạn không bị nhiễm Covid</Text>
        </View>
        <View style={styles.instructionItem}>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('third')}
            color="#728DED"
          />
          <Text style={styles.instructionText}>
            Bạn chưa rõ mình bị nhiễm Covid - 19 hay không
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.instructionWrapper}>
        <Text style={styles.titleInstructionText}>Thu tiếng ho</Text>
        <View style={styles.instructionItem}>
          <Text style={[styles.instructionText, { textAlign: 'center' }]}>
            Nhấn nút thu âm bên dưới và ho liên tục trong vòng 2-3 giây trong
            môi trường yên tĩnh
          </Text>
        </View>
      </View>
      <View style={styles.recordWrapper}>
        {!isRecording && !isLoading && (
          <View style={styles.iconWrapper}>
            <Image
              source={require('../assets/cough_demo_icon.png')}
              style={styles.coughIcon}
            />
          </View>
        )}
        {isRecording && (
          <Image source={require('../assets/wave.png')} style={styles.wave} />
        )}
        {isLoading && (
          <ActivityIndicator
            color="#728DED"
            size="large"
            style={{ margin: 82 }}
          />
        )}
        <TouchableOpacity onPress={handleMicPress}>
          {isRecording ? (
            <Ionicons
              name="mic-circle-sharp"
              size={80}
              color="red"
              style={styles.micIcon}
            />
          ) : (
            <Ionicons
              name="mic-circle-outline"
              size={80}
              color="#728DED"
              style={styles.micIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },

  instructionWrapper: {
    marginVertical: 5,
    marginHorizontal: 20,
  },

  titleInstructionText: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  instructionText: {
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
    width: '80%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  recordWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },

  micIcon: {
    margin: 20,
  },

  wave: {
    width: 400,
    height: 200,
  },

  iconWrapper: {
    width: 150,
    height: 150,
    marginVertical: 25,
  },

  coughIcon: {
    width: '100%',
    height: '100%',
  },
});
