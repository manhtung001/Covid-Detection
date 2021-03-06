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
          <Text style={styles.nameText}>Chatbot h??? tr??? Covid-19</Text>
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.infoText}>
          ???Chatbot tr??? l???i t??? ?????ng m???i c??u h???i c???a b???n li??n quan t???i Covid - 19
        </Text>
        <Text style={styles.infoText}>
          ???D??? ??o??n t??? l??? nhi???m b???nh th??ng qua ti???ng ho v?? tri???u ch???ng khai b??o
        </Text>
        <Text style={styles.infoText}>
          ???B???n c?? th??? giao ti???p v???i chatbot qua ti???ng n??i
        </Text>
      </View>
    </View>
  );
};

const CovidDetectHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>D??? ??O??N T??? L??? NHI???M COVID - 19</Text>
      <Text style={styles.detectInfoText}>
        ???ng d???ng s??? d???ng c??ng ngh??? AI ????? d??? ??o??n t??? l??? nhi???m Covid - 19. Ch???n
        n??t t????ng ???ng b??n d?????i ????? d??? ??o??n t??? l??? nhi???m Covid - 19 cho b???n ho???c
        cho ng?????i th??n
      </Text>
    </View>
  );
};

const AnotherDetectHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>D??? ??O??N C??C TI???NG HO B???T TH?????NG</Text>
      <Text style={styles.detectInfoText}>
        H??? tr??? nh???n di???n c??c ??m thanh ho b???t th?????ng, v?? d??? nh??: Ho khan, ho c??
        ?????m, ho gi??? d???i,...
      </Text>
    </View>
  );
};

const ContributeHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>????NG G??P PH??T TRI???N ???NG D???NG</Text>
      <Text style={styles.detectInfoText}>
        Nh???ng ????ng g??p v?? ph???n h???i c???a b???n s??? l?? ngu???n t?? li???u gi?? tr??? cho ?????i
        ng?? ph??t tri???n ch??ng t??i.
      </Text>
    </View>
  );
};

const ContributeCoughHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>????NG G??P TI???NG HO</Text>
      <Text style={styles.detectInfoText}>
        ????ng g??p ti???ng ho ????? c???i thi???n thu???t to??n d??? ??o??n t??? l??? nhi???m Covid - 19
      </Text>
    </View>
  );
};

const FeedbackHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleText}>PH???N H???I V??? ???NG D???NG</Text>
      <Text style={styles.detectInfoText}>
        ????a ra nh???ng ????ng g??p v?? ph???n h???i c???a b???n v??? c??c ch???c n??ng c???a ???ng d???ng.
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
          if (route.name === 'Trang ch???') {
            return (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'K???t n???i') {
            return (
              <Ionicons
                name={focused ? 'people-sharp' : 'people-outline'}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === 'Tin t???c') {
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
          if (route.name === 'C??i ?????t') {
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
        name="Trang ch???"
        component={HomeScreen}
        options={{
          headerShown: false,
          iconName: 'home-outline',
        }}
      />
      <Tab.Screen
        name="K???t n???i"
        component={ConnectScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tin t???c"
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
        name="C??i ?????t"
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
