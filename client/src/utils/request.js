import fetch from 'dva/fetch';
import cfg from '../config/cfg';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
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
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }
  console.log('option--', newOptions);
  console.log('url--', url);
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ err }));
}

// 需要 authorization  的请求
export function requestAuth(url, options) {
  // options
  const newOptions = { ...options };
  // newOptions.headers = {
  //   "Authorization": `bearer ${JSON.parse(window.localStorage.getItem(cfg.access_token))[newOptions.api_name]}`,
  //   ...newOptions.headers
  // }
  if (newOptions.api_name == 'token_wx') {
    newOptions.headers = {
      "Authorization": `bearer gnvhIFqbTtZApFIBy9aCuV9SM3lWJNA4`,
      ...newOptions.headers
    }
  } else if (newOptions.api_name == 'token_cf') {
    newOptions.headers = {
      "Authorization": `bearer dG9R3GLR6QkbqyvRNNZ9i5E0N2TSmsrV`,
      ...newOptions.headers
    }
  }



  return request(url, newOptions)
}

//token 
//gnvhIFqbTtZApFIBy9aCuV9SM3lWJNA4
//dG9R3GLR6QkbqyvRNNZ9i5E0N2TSmsrV