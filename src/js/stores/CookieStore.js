import Storage from '../../services/AsyncStorage'
const Immutable = require('immutable');

/*
A storage class for cookie value strings.  Since in native, these are only for API calls, the path is always assumed to
be "/".   For instant access during operation, all cookies are also stored in a map.
 */
class CookieStore {

  constructor() {
    let cookieMap = Immutable.Map({});
    this.state = {
      cookieMap: cookieMap,
    };

    // Pre-pull the voter_device_id from Storage into the local map, so that we never need to deliver a promise
    const prime_key = 'voter_device_id';
    Storage.getItem(prime_key).then((value)=> {
      if (value.length > 0) {
        const map2 = this.state.cookieMap.set(prime_key, value);
        console.log("Cookie to map in constructor \'" + prime_key + "\'  " + value);
        this.state.cookieMap = map2;
      }
    });
  }

  getItem(key){
    if( this.state.cookieMap.has(key) ) {
      console.log("Cookie from map \'" + key + "\'  " + this.state.cookieMap.get(key));
      return this.state.cookieMap.get(key);
    } else {
      return Storage.getItem(key).then((value)=> {
        console.log("Cookie from Storage \'" + key + "\'  " + value);
        if (value.length > 0)
          this.setItem(key, value);
      });
    }
  }

  setItem(key, value) {
    console.log("Cookie to cookieMap \'" + key + "\'  " + value);

    const map2 = this.state.cookieMap.set(key, value);
    this.state.cookieMap = map2;
    Storage.setItem(key, value);
    console.log("set cookie:: " + key + ":" + value);
  }

  removeItem(key) {
    const map2 = this.state.cookieMap.deleteIn(key);
    this.state.cookieMap = map2;
    Storage.removeItem(key);
  }
}
export default cookieStore = new CookieStore();

