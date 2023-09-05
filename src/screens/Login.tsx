import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const onLogin = () => {
    navigation.navigate('Menu');
  };

  return (
    <Layout style={styles.container}>
      <Text>ログイン画面</Text>
      <Button onPress={onLogin}>ログイン</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
