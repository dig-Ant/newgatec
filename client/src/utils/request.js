import fetch from 'dva/fetch';
import cfg from '../config/cfg';
import { Toast} from 'antd-mobile';

function parseJSON(response) {
  console.log('respose,,,',response.json());
  return response.json();
}

async function checkStatus(response) {
  console.log('response---', response);
  if (response.status >= 200 && response.status < 400) {
    let res = await response.json().then((data) => {
      return data;
    });
    if (!res.error) {
      return res;
    }
    throw res
  }
  throw await response.json().then((data) => {
    return data;
  });

  // const error = new Error(response);
  // error.response = response;
  // throw error;
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
  return fetch(url, newOptions)
    .then(checkStatus)
    // .then(parseJSON)
    // .then(data => (data))
    // .catch(err => ({ err }));
    .catch(err => {
      console.log('err--', err);
      if(err.error) {
        Toast.fail(err.error.message, 1, null, false);
      }
      // let s = err.json().then((data)=> {
      //   console.log('data-=---',data);
      //   return data 
      // });
      // err.then((data)=> {
      //   alert(data.error.message);
      // });
      return err
    });
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
  // let selectToken = apiNameObj[newOptions.api_name];
  // newOptions.headers = {
  //   "Authorization": `bearer ${JSON.parse(window.localStorage.getItem(cfg.access_token))[selectToken]}`,
  //   ...newOptions.headers
  // }

  if (newOptions.api_name === 'userprivate') {
    newOptions.headers = {
      "Authorization": `bearer D9QN3cEJFCbVV1jyRbik6P5PIcFejwMV`,
      ...newOptions.headers
    }
  } else if (newOptions.api_name === 'cbizprivate') {
    newOptions.headers = {
      "Authorization": `bearer F9kXapRNxPW8eLA5frCCO9cFB4DeLOiw`,
      ...newOptions.headers
    }
  }

  return request(url, newOptions)
}
