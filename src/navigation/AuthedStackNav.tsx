import {createStackNavigator} from '@react-navigation/stack';
import Menu from '../screens/Menu';
import Setting from '../screens/Setting';
import TermsOfService from '../screens/TermsOfService';

const Stack = createStackNavigator();

const AuthedStackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
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
  );
};
export default AuthedStackNav;
