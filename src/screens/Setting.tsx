import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Modal, Text, Layout} from '@ui-kitten/components';

// モーダルウィンドウ(フッタ部分)
export const ModalFooter: React.FC = props => {
  return (
    <Layout style={styles.modalBtnContainer}>
      <Button style={styles.modalBtn} onPress={props.onLogout}>
        OK
      </Button>
      <Button style={styles.modalBtn} onPress={props.onLogoutCancel}>
        Cancel
      </Button>
    </Layout>
  );
};

// モーダルウィンドウ
const ModalDialog: React.FC = props => {
  return (
    <Modal
      style={styles.modalContainer}
      visible={props.modalVisible}
      backdropStyle={styles.modalBackdrop}
      animationType="fade">
      <Card disabled={true}>
        <Layout style={styles.modalHeder}>
          <Text category="h6">ZConnect</Text>
          <Text category="s1">ログアウトします。よろしいですか？</Text>
        </Layout>
        <ModalFooter
          onLogout={props.onLogout}
          onLogoutCancel={props.onLogoutCancel}
        />
      </Card>
    </Modal>
  );
};

const Setting = props => {
  //const userContext = useUserContext();
  //const navigation = useNavigation();
  // モーダル表示フラグ
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // ユーザー名
  const [userName, setUserName] = useState<string>('');

  /**
   * 初回画面レンダー時に実行
   */
  useEffect(() => {
    setUserName('ユーザー１'); // TODO ログイン画面から渡ってきたユーザー名を設定する
    console.log('画面更新');
  }, []);

  /**
   * [ログアウト]ボタンイベント
   */
  const onLogout = () => {
    // TODO 認証方式に合わせてログアウト処理を実装
    console.log('ログアウト');
    setModalVisible(false);
    props.navigation.navigate('Login');
  };

  /**
   * ログアウトキャンセルイベント
   */
  const onLogoutCancel = () => {
    console.log('キャンセル');
    setModalVisible(false);
  };

  /**
   * [利用規約]ボタンイベント
   */
  const onTermsOfService = () => {
    console.log('利用規約規約へ画面遷移');
    props.navigation.navigate('TermsOfService');
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.settingItem}>
        <Text style={styles.settingItemTitle} category="h6">
          ユーザー名
        </Text>
        <Layout style={styles.userNameArea}>
          <Text style={styles.userName} category="h6" status="info">
            {userName}
          </Text>
        </Layout>
        <Button
          size="large"
          style={styles.settingBtn}
          onPress={() => setModalVisible(true)}>
          ログアウト
        </Button>
        <Text style={styles.settingItemTitle} category="h6">
          情報
        </Text>
        <Button
          size="large"
          style={styles.settingBtn}
          onPress={onTermsOfService}>
          <Text>利用規約</Text>
        </Button>
      </Layout>
      {/* モーダルウィンドウ */}
      <ModalDialog
        modalVisible={modalVisible}
        onLogout={onLogout}
        onLogoutCancel={onLogoutCancel}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingItem: {
    margin: 20,
  },
  settingItemTitle: {},
  userNameArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  userName: {},
  settingBtn: {
    marginTop: 10,
    marginBottom: 30,
  },
  modalContainer: {},
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalHeder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  modalBtn: {
    flex: 1,
    marginTop: 20,
    marginLeft: 5,
  },
});

export default Setting;
