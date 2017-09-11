import {AsyncStorage} from 'react-native';

class Storage {
  asyncStorage;

  constructor() {
    this.asyncStorage = AsyncStorage;
  }

  setItem(key, value) {
    this.asyncStorage.setItem(key, value);
  }

  getItem = async function (key) {
    return await this.asyncStorage.getItem(key);
  }

  removeItem(key) {
    this.asyncStorage.removeItem(key);
  }
}

export default storage = new Storage();
