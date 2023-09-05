import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Layout} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();

  const onLogin = () => {
    navigation.navigate('Setting');
  };

  return (
    <Layout style={styles.container}>
      <Text>メニュー画面</Text>
      <Button onPress={onLogin}>設定</Button>
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

export default Menu;
