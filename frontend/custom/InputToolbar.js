import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from 'react-native-gifted-chat';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      paddingVertical: 10,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

export const renderActions = (props) => (
  // <Actions
  //   {...props}
  //   containerStyle={{
  //     width: 44,
  //     height: 44,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     marginLeft: 4,
  //     marginRight: 4,
  //     marginBottom: 0,
  //   }}
  //   icon={() => (
  //     <Image
  //       style={{ width: 32, height: 32 }}
  //       source={require('../assets/voice_icon.png')}
  //     />
  //   )}
  // />
  <></>
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: 'black',
      // backgroundColor: '#F4F1DE',
      // borderRadius: 15,
      paddingTop: 2,
      paddingHorizontal: 12,
      marginLeft: 60,
      // fontSize: 17,
      // fontFamily: 'Quicksand-Medium',
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.22,
      // shadowRadius: 2.22,
      // elevation: 3,
    }}
    placeholderTextColor="gray"
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      // backgroundColor: 'pink',
    }}
  >
    <Image
      style={{ width: 30, height: 30 }}
      source={require('../assets/send_icon.png')}
    />
  </Send>
);
