
import request from '../utils/request';
import sys from '../../core/sys';
import api from './lb-api';

let lbapi = new api();
lbapi.url = sys.cfg.server_base_url + sys.cfg.api_route;

export async function getAccessToken(code) {
  return request(lbapi.getAccessTokenRoute(), {
    method: 'POST',
    body: { code }
  });
}

let kongApi = new api();
kongApi.url = sys.cfg.kong_base_url + sys.cfg.kong_route

// test api
export async function getInfo(data) {
  console.log('data--',data);
  return request(kongApi.getInfoRoute(), {
    method: 'POST',
    headers: {
      "Authorization": "bearer pyxnM5HpraEHyDy6J2kIJn1z44lbY9by"
    },
    body: { data }
  });
}