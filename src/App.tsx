import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Setting from './screens/Setting';
import TermsOfService from './screens/TermsOfService';
import Login from './screens/Login';
import Menu from './screens/Menu';
import RootStackNav from './navigation/RootStackNav';
//import UserContextProvider from './context/useUserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                headerTitle: 'メニュー',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Setting"
              component={Setting}
              options={{
                headerTitle: '設定',
              }}
            />
            <Stack.Screen
              name="TermsOfService"
              component={TermsOfService}
              options={{
                headerTitle: '利用規約',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
