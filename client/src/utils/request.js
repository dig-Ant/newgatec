import fetch from 'dva/fetch';
import cfg from '../config/cfg';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log('check response--', response);
  // if (response.error) {
  //   const error = new Error(response.error.message);
  //   // const error = new Error(response.msg);
  //   error.response = response;
  //   throw error;
  // }
  // return response;

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  // const error = new Error(response.msg);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',//上传文件不能使用 
        ...newOptions.headers,
      };
    }
  }
  // console.log('url---',url,newOptions);
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ err }));
}


let apiNameObj = {
  shareprivate: 'token_shareprivate',
  userprivate: 'token_userprivate',
  cbizprivate: 'token_cbizprivate'
}
// 需要 authorization  的请求
export function requestAuth(url, options) {
  // options
  const newOptions = { ...options };
  let selectToken = apiNameObj[newOptions.api_name];
  // newOptions.headers = {
  //   "Authorization": `bearer ${JSON.parse(window.localStorage.getItem(cfg.access_token))[selectToken]}`,
  //   ...newOptions.headers
  // }
  if (newOptions.api_name === 'userprivate') {
    newOptions.headers = {
      "Authorization": `bearer 9mcMA5b9jZjHfhXQsNNsYw2JezsRCO0q`,
      ...newOptions.headers
    }
  }


  return request(url, newOptions)
}
