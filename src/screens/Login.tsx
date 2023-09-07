import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import storage from '../storage/storage';

const Login = () => {
  const navigation = useNavigation();

  const onLogin = () => {
    // ストレージ保存
    storage.save({
      key: 'loginState',
      data: {
        userName: 'ユーザー１',
      },
      expires: 1000 * 3600
    });

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
