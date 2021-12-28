import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen1 from '../screen/WelcomeScreen1';
import WelcomeScreen2 from '../screen/WelcomeScreen2';
import WelcomeScreen3 from '../screen/WelcomeScreen3';
import WelcomeScreen4 from '../screen/WelcomeScreen4';
import WelcomeScreen5 from '../screen/WelcomeScreen5';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import HomeScreen from '../screen/HomeScreen';
import ConnectScreen from '../screen/ConnectScreen';
import ChatScreen from '../screen/ChatScreen';
import NewsScreen from '../screen/NewsScreen';
import SettingScreen from '../screen/SettingScreen';
import CovidDetectScreen from '../screen/CovidDetectScreen';
import CovidDetectResultScreen from '../screen/CovidDetectResultScreen';
import AnotherDetectScreen from '../screen/AnotherDetectScreen';
import AnotherDetectResultScreen from '../screen/AnotherDetectResultScreen';
import ContributeScreen from '../screen/ContributeScreen';
import ContributeCoughScreen from '../screen/ContributeCoughScreen';
import FeedbackScreen from '../screen/FeedbackScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             key={index}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerAvatarNameWrapper}>
        <Image
          style={{ width: 55, height: 51 }}
          source={require('../assets/online_doctor.png')}
        />
        <View style={styles.headerNameWrapper}>
          <Text style={styles.nameText}>Chatbot hỗ trợ Covid-19</Text>
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.infoText}>
          ・Chatbot trả lời tự động mọi câu hỏi của bạn liên quan tới Covid - 19
        </Text>
        <Text style={styles.infoText}>
          ・Dự đoán tỷ lệ nhiễm bệnh thông qua tiếng ho và triệu chứng khai báo
        </Text>
        <Text style={styles.infoText}>
          ・Bạn có thể giao tiếp với chatbot qua tiếng nói
        </Text>
      </View>
    </View>
  );
};

const CovidDetectHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>DỰ ĐOÁN TỶ LỆ NHIỄM COVID - 19</Text>
      <Text style={styles.detectInfoText}>
        Ứng dụng sử dụng công nghệ AI để dự đoán tỷ lệ nhiễm Covid - 19. Chọn
        nút tương ứng bên dưới để dự đoán tỷ lệ nhiễm Covid - 19 cho bạn hoặc
        cho người thân
      </Text>
    </View>
  );
};

const AnotherDetectHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>DỰ ĐOÁN CÁC TIẾNG HO BẤT THƯỜNG</Text>
      <Text style={styles.detectInfoText}>
        Hỗ trợ nhận diện các âm thanh ho bất thường, ví dụ như: Ho khan, ho có
        đờm, ho giữ dội,...
      </Text>
    </View>
  );
};

const ContributeHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>ĐÓNG GÓP PHÁT TRIỂN ỨNG DỤNG</Text>
      <Text style={styles.detectInfoText}>
        Những đóng góp và phản hồi của bạn sẽ là nguồn tư liệu giá trị cho đội
        ngũ phát triển chúng tôi.
      </Text>
    </View>
  );
};

const ContributeCoughHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>ĐÓNG GÓP TIẾNG HO</Text>
      <Text style={styles.detectInfoText}>
        Đóng góp tiếng ho để cải thiện thuật toán dự đoán tỷ lệ nhiễm Covid - 19
      </Text>
    </View>
  );
};

const FeedbackHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>PHẢN HỒI VỀ ỨNG DỤNG</Text>
      <Text style={styles.detectInfoText}>
        Đưa ra những đóng góp và phản hồi của bạn về các chức năng của ứng dụng.
      </Text>
    </View>
  );
};

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let size = 22;
          if (route.name === 'Trang chủ') {
            return (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Kết nối') {
            return (
              <Ionicons
                name={focused ? 'people-sharp' : 'people-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Tin tức') {
            return (
              <Ionicons
                name={focused ? 'newspaper-sharp' : 'newspaper-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Chatbot') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'chatbox-ellipses-sharp'
                    : 'chatbox-ellipses-outline'
                }
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Cài đặt') {
            return (
              <Ionicons
                name={focused ? 'settings-sharp' : 'settings-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'black',
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          headerShown: false,
          iconName: 'home-outline',
        }}
      />
      <Tab.Screen
        name="Kết nối"
        component={ConnectScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tin tức"
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatScreen}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: '#728DED',
          },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   // fontWeight: 'bold',
          // },
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen1"
        component={WelcomeScreen1}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreen2"
        component={WelcomeScreen2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreen3"
        component={WelcomeScreen3}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreen4"
        component={WelcomeScreen4}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreen5"
        component={WelcomeScreen5}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CovidDetectScreen"
        component={CovidDetectScreen}
        options={{
          header: () => <CovidDetectHeader />,
        }}
      />
      <Stack.Screen
        name="CovidDetectResultScreen"
        component={CovidDetectResultScreen}
        options={{
          header: () => <CovidDetectHeader />,
        }}
      />
      <Stack.Screen
        name="AnotherDetectScreen"
        component={AnotherDetectScreen}
        options={{
          header: () => <AnotherDetectHeader />,
        }}
      />
      <Stack.Screen
        name="AnotherDetectResultScreen"
        component={AnotherDetectResultScreen}
        options={{
          header: () => <AnotherDetectHeader />,
        }}
      />
      <Stack.Screen
        name="ContributeScreen"
        component={ContributeScreen}
        options={{
          header: () => <ContributeHeader />,
        }}
      />
      <Stack.Screen
        name="ContributeCoughScreen"
        component={ContributeCoughScreen}
        options={{
          header: () => <ContributeCoughHeader />,
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          header: () => <FeedbackHeader />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#728DED',
    color: 'white',
    padding: 35,
    paddingBottom: 15,
  },

  headerTextWrapper: {
    width: '95%',
  },

  infoText: {
    color: 'white',
  },

  headerAvatarNameWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  headerNameWrapper: {
    justifyContent: 'center',
    marginLeft: 10,
  },

  nameText: {
    color: 'white',
    fontSize: 16,
  },

  statusText: {
    color: '#9EBAED',
  },

  titleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },

  detectInfoText: {
    color: 'white',
    marginTop: 10,
  },
});
