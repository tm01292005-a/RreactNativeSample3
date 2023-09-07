import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    // 最大容量
    size: 1000,
    // バックエンドにAsyncStorageを使用する
    storageBackend: AsyncStorage,
    // キャッシュ制限
    defaultExpires: 1000 * 3600 * 24,
    // メモリにキャッシュする
    enableCache: true,
});

export default storage;
