import fetch from 'dva/fetch';
import cfg from '../config/cfg';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import store from '../index';


function parseJSON(response) {
  console.log('respose,,,', response.json());
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
    throw res;
  } else if (response.status === 401) {
    const error = new Error(response);
    error.response = response;
    error.status = response.status;
    throw error;
  } else if (response.status >= 500) {
    const error = new Error(response);
    error.response = response;
    error.status = response.status;
    throw error;
  }

  throw await response.json().then((data) => {
    return data;
  });


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
    method: 'POST'
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
  } else if (newOptions.method === 'GET') {
    if (newOptions.body && Object.keys(newOptions.body) != 0) {
      let paramsArray = [];
      //拼接参数
      Object.keys(newOptions.body).forEach(key => paramsArray.push(key + '=' + newOptions.body[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    delete(newOptions.body);
    // console.log('get url ----', url, newOptions);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    // .then(parseJSON)
    // .then(data => (data))
    // .catch(err => ({ err }));
    .catch(err => {
      console.log('err--', err);
      if (err.error && (err.error.status < 500 || err.error.statusCode < 500)) {
        Toast.fail(err.error.message, 1, null, false);
      }
      const { dispatch } = store;
      if (err.status === 401) {
        window.localStorage.removeItem(cfg.access_token);
        dispatch(routerRedux.replace('/oauth'));
        return;
      } else if (err.status === 412) {
        dispatch(routerRedux.replace('/home'));
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
  let selectToken = apiNameObj[newOptions.api_name];
  let localToken = window.localStorage.getItem(cfg.access_token);

  // if(localToken) {
  //   console.log('token',localToken);
  //   newOptions.headers = {
  //     "Authorization": `bearer ${JSON.parse(window.localStorage.getItem(cfg.access_token))[selectToken]}`,
  //     ...newOptions.headers
  //   }
  //   console.log('token---');
  // }

  if (newOptions.api_name === 'userprivate') {
    newOptions.headers = {
      "Authorization": `bearer XdWzZIMuRR6ujLYS7Cv1YCmC4DlW37FS`,
      // "Authorization": `bearer S5MOPNfVywtkQBLxyooKDxA09ybWE50G`,//云 kong
      ...newOptions.headers
    }
  } else if (newOptions.api_name === 'cbizprivate') {
    newOptions.headers = {
      "Authorization": `bearer S2bGASNI0Dew1uwB9cu35Fh2mm7clehj`,
      // "Authorization": `bearer QVQ7Ev4j4SzndCDKbJXdl56znBHo7wRK`,//云 kong
      ...newOptions.headers
    }
  } else if (newOptions.api_name === 'shareprivate') {
    newOptions.headers = {
      "Authorization": `bearer wBRxYcQsZfl98VkajeB0B1kTFiAINfEe`,
      // "Authorization": `bearer 3VsveteaxjVKDHE11TKEY6a6P0Rz289p`,//云 kong
      ...newOptions.headers
    }
  }

  return request(url, newOptions)
}
