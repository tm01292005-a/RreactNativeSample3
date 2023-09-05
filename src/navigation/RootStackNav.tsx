import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Setting from '../screens/Setting';
import useUserContext from '../context/useUserContext';

const rootNav = createStackNavigator();

const RootStackNav = props => {
  const userContext = useUserContext();
  return (
    <rootNav.Navigator screenOptions={{headerShown: false}}>
      {/* TODO ログイン判定を行う */}
      {userContext.isLoggedIn ? (
        <rootNav.Screen name="Authed" component={AuthedStackNav} />
      ) : (
        <rootNav.Screen name="Unauthed" component={UnauthedStackNav} />
      )}
    </rootNav.Navigator>
  );
};

export default RootStackNav;
