import React, { useState, useCallback, useEffect } from 'react';
import {
  LogBox,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { getDatabase, ref, set, push, onValue, off } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import uuid from 'uuid';
import axios from 'axios';
import Constants from 'expo-constants';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from '../custom/InputToolbar';
import {
  renderBubble,
  renderDay,
  renderMessageText,
  renderQuickReplies,
} from '../custom/MessageContainer';

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = Constants.manifest.extra;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);

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

const database = getDatabase(app);
const userAvaUri = 'https://i.imgur.com/fk811ew.jpg';
const doctorAvaUri = 'https://i.imgur.com/TDnIIgW.png';
const cloudFunctionUrl =
  'https://us-central1-chatbot-placeholder.cloudfunctions.net/audioToText';

// const messagesRef = ref(database, `/${uuid()}`);
const messagesRef = ref(database, `/123`);
LogBox.ignoreLogs(['Setting a timer for a long period of time']);

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log('There was an error deleting recording file', error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      //   console.log('FILE INFO', info);
      const uri = info.uri;
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/x-wav',
        name: 'speech2text',
      });

      await axios({
        method: 'POST',
        url: cloudFunctionUrl,
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // handle success
          const { transcript } = response.data;
          if (transcript) {
            showResponseTextUser(transcript);
            Dialogflow_V2.requestQuery(
              transcript,
              (result) => handleResponse(result),
              (error) => console.log(error),
            );
          } else showResponseText('Mình không nhận diện được giọng nói của bạn!');
          setIsFetching(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } catch (error) {
      console.log('There was an error reading file', error);
      stopRecording();
      resetRecording();
      setIsFetching(false);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      setIsRecording(true);
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      console.log('Error recording', error);
      stopRecording();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(null);
  };

  const handleOnPressIn = () => {
    startRecording();
  };

  const handleOnPressOut = () => {
    stopRecording();
    getTranscription();
  };

  const showResponseText = (text) => {
    let msg = {
      _id: uuid(),
      text,
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Doctor',
        avatar: doctorAvaUri,
      },
    };
    push(messagesRef, JSON.stringify(msg));
  };

  //   const postImageAPI = (image) => {
  //     showResponseImageUser(image);
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri: image,
  //       type: 'image/jpeg',
  //       name: 'image.jpg',
  //     });
  //     axios({
  //       url: 'https://chatbot-placeholder.df.r.appspot.com/predict',
  //       method: 'POST',
  //       data: formData,
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //       .then(function (response) {
  //         const { data } = response;
  //         const nameFood = data['name'];
  //         const caloFood = data['calories'];
  //         if (nameFood != 'Error')
  //           showResponseText(
  //             `Trong ảnh là món ${nameFood} bạn nha! Trong 100g ${nameFood} có chứa ${caloFood} calories!`,
  //           );
  //         else
  //           showResponseText(
  //             `Sorry bạn :( Mình không đoán được món trong ảnh rùi!`,
  //           );
  //         setTyping(false);
  //       })
  //       .catch(function (error) {
  //         showResponseText('Sorry bạn :( Ảnh của bạn chưa được gửi đi');
  //       });
  //   };

  //   const pickImageLibary = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.cancelled) {
  //       postImageAPI(result.uri);
  //     }
  //   };

  //   const pickImageCamera = async () => {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.cancelled) {
  //       //   postImageAPI(result.uri);
  //       console.log(result);
  //     }
  //   };

  const handleResponse = (result) => {
    let fulfillMessages = result.queryResult.fulfillmentMessages;
    // let image, listBtn;
    setTyping(false);
    fulfillMessages.forEach((obj) => {
      if (!obj['platform']) {
        if (obj['payload']) {
          if (obj['payload']['image']) {
            // image = obj['payload']['image'];
            // showResponseImage(image);
          } else if (obj['payload']['quickReplies']) {
            // listBtn = obj['payload']['quickReplies'];
            // showResponseQuickReply(listBtn);
          }
        }
        if (obj['text']) {
          let text_bot = obj['text']['text'][0];
          showResponseText(text_bot);
        }
      }
    });
  };

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    push(messagesRef, JSON.stringify(message_user));
    setTyping(true);
    let text_user = message_user['text'];
    Dialogflow_V2.requestQuery(
      text_user,
      (result) => handleResponse(result),
      (error) => console.log(error),
    );
  }, []);

  const showResponseTextUser = (text) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      text,
      user: {
        _id: 1,
        name: 'User',
        avatar: userAvaUri,
      },
    };
    push(messagesRef, JSON.stringify(msg));
    setTyping(true);
  };

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      var arrMessages = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        arrMessages.unshift(JSON.parse(childData));
      });
      setMessages(arrMessages);
    });
    return () => {
      off(messagesRef);
    };
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          avatar: userAvaUri,
        }}
        placeholder="Nhấn để trò chuyện ..."
        alwaysShowSend
        scrollToBottom
        renderAvatarOnTop
        showUserAvatar={true}
        minInputToolbarHeight={65}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderDay={renderDay}
        renderQuickReplies={renderQuickReplies}
        isTyping={typing}
      />
      <TouchableOpacity
        style={styles.button}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        {isFetching && <ActivityIndicator size="large" color="#2D9CDB" />}
        {!isFetching && (
          <Image
            style={{ width: 32, height: 32 }}
            source={require('../assets/voice_icon.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 24,
  },
  image: {
    flex: 1,
    position: 'relative',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 20,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});
