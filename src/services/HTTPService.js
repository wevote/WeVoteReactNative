import Config from '../../config/config'
class HTTPService {
  getHeaders() {
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    return headers;
  }

  get(url, params) {
    const getOptions = {
      method: "get",
      headers: this.getHeaders(),
      mode: "cors",
    }

    return fetch(`${Config.getApiUrl()}${url}${this.paramsToQueryString(params)}`, getOptions);
  }

  post(url, data){
    const postOptions = {
      method: "post",
      headers: this.getHeaders(),
      mode: "cors",
      body: data,
    }

    return fetch(`${this.apiUrl}${url}`, postOptions);

  }

  paramsToQueryString(params) {
    console.log(params);
    let queryString = "";

    for (var key in params){
      if (params.hasOwnProperty(key)) {
        if(queryString === "") {
          queryString += `${key}=${params[key]}`;
        } else {
          queryString += `&${key}=${params[key]}`;
        }
      }
    }

    if(queryString !== ""){
      return `?${queryString}`;
    }

    return queryString;
  }

}

export default httpService = new HTTPService();
