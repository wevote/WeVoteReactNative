import Storage from './AsyncStorage'

class AuthService {

    storageKeys = {
      userID: "userId",
    }

    getUserId(){
        return Storage.getItem(this.storageKeys.userID).then((data) => {
            return data;
        });
    }

    setUserId(id) {
      Storage.setItem(this.storageKeys.userID, id);
    }
}

export default authService = new AuthService();
