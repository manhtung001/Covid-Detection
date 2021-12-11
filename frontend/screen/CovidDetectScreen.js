import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default CovidDetectScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [recording, setRecording] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleRecordPress = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setLoading(true);
    }, 3000);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('CovidDetectResultScreen');
    }, 5000);
    setTimeout(() => {
      setCameraVisible(false);
    }, 6000);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type}>
            {/* <View style={styles.loadingIconWrapper}>
              <ActivityIndicator size="large" color="white" />
            </View> */}
          </Camera>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#728DED"
              style={{ marginTop: 30 }}
            />
          ) : (
            <TouchableOpacity
              style={styles.recordBtnWrapper}
              onPress={handleRecordPress}
            >
              <MaterialCommunityIcons
                name={recording ? 'record-circle' : 'record-circle-outline'}
                size={60}
                color="red"
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          <Text style={styles.titleInstructionText}>
            Chọn nút bên dưới và ho liên tục trong vòng 2-3 giây trong môi
            trường yên tĩnh. Đảm bảo rằng toàn bộ khuôn mặt của bạn trong lúc ho
            nằm trong hình.
          </Text>
          <Video
            ref={video}
            style={styles.video}
            source={require('../assets/cough_tutorial.mov')}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={{ textAlign: 'center' }}>Video hướng dẫn</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#34A5C9' }]}
              onPress={() => {
                setCameraVisible(true);
              }}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonText}>Dự đoán cho bạn</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCameraVisible(true);
              }}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonText}>Dự đoán cho người thân</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  titleInstructionText: {
    fontSize: 20,
    textAlign: 'center',
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
    width: '80%',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cameraContainer: {
    alignItems: 'center',
    marginVertical: 15,
    flex: 1,
  },

  camera: {
    height: '80%',
    width: '90%',
  },

  video: {
    marginVertical: 15,
    flex: 2,
    width: '100%',
  },

  recordBtnWrapper: {
    marginTop: 30,
  },
});
