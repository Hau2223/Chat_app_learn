import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FriendScreen from './screens/FriendScreen';
import ChatsScreen from './screens/ChatsScreen';
import ChatMesssageScreen from './screens/ChatMesssageScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
        <Stack.Screen name="Chat" component={ChatsScreen} />
        <Stack.Screen name="Message" component={ChatMesssageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
