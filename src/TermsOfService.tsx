import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';

const TermsOfService = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h4">利用規約画面</Text>
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

export default TermsOfService;
