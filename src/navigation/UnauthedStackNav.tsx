import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Login';

const nav = createStackNavigator();
const UnauthedStackNav = () => {
  return (
    <nav.Navigator initialRouteName="Login">
      <nav.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </nav.Navigator>
  );
};
export default UnauthedStackNav;
