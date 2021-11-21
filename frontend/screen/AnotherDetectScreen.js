import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default AnotherDetectScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [recording, setRecording] = useState(null);

  const recordingOptions = {
    android: {
      extension: '.3gp',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    setTimeout(() => {
      setIsRecording(false);
      setLoading(true);
    }, 2000);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('AnotherDetectResultScreen');
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleInstructionText}>
        Nhấn nút thu âm bên dưới và ho liên tục trong vòng 2-3 giây trong môi
        trường yên tĩnh
      </Text>
      <View style={styles.recordWrapper}>
        {!isRecording && !isLoading && (
          <Image
            source={require('../assets/cough_demo_icon.png')}
            style={styles.coughIcon}
          />
        )}
        {isRecording && (
          <Image source={require('../assets/wave.png')} style={styles.wave} />
        )}
        {isLoading && (
          <ActivityIndicator
            color="#728DED"
            size="large"
            style={{ margin: 50 }}
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
    // justifyContent: 'space-between',
  },

  titleInstructionText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },

  recordWrapper: {
    flex: 3,
    // backgroundColor: 'pink',
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

  coughIcon: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
});
