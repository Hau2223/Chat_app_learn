// App.js
import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { UserContext } from './UserContext';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <UserContext>
         <StackNavigator/>
      </UserContext>
    </View>
  );
}

export default App;
