'use strict';

// const request = require('request-promise');
const FormData = require("form-data")
const data = {};
const etags = {};

export default {
  fetch: function (url = null, options = { headers: {} }) {
    url = url || options.url;
    if (options.method === 'GET') {
      delete options.body; // Get method should has no body
    }
    if (options.method === 'GET' || !options.method) {
      const etag = etags[url];
      const cachedResponse = data[`${url}${etag}`]; // ensure etag is for url
      if (etag) {
        options.headers['If-None-Match'] = etag;
      }
      return fetch(url, options).then((response) => {
        if (response.status === 304) {
          return cachedResponse.clone();
        }
        if (response.status === 200) {
          const responseEtag = response.headers.get('Etag');
          if (responseEtag) {
            data[`${url}${responseEtag}`] = response.clone();
            etags[url] = responseEtag;
          }
        }
        return response;
      });
    }

    // all other requests go straight to fetch
    return Reflect.apply(fetch, undefined, [url, options]);
  },

  parseAndMergeNestedHeaders: function (originalHeaders) {
    const headers = new Map();
    let nestedHeaders = new Map();
    originalHeaders.forEach((val, key) => {
      const capitalizedKey = key.replace(/\b[a-z]/g, (l) => l.toUpperCase());
      let realVal = val;
      if (val && val.match(/\n\S+:\s\S+/)) {
        const nestedHeaderStrings = val.split('\n');
        realVal = nestedHeaderStrings.shift();
        const moreNestedHeaders = new Map(
          nestedHeaderStrings.map((h) => h.split(/:\s/))
        );
        nestedHeaders = new Map([...nestedHeaders, ...moreNestedHeaders]);
      }
      headers.set(capitalizedKey, realVal);
    });
    return new Map([...headers, ...nestedHeaders]);
  },

  buildQueryString: function (parameters) {
    const keys = Object.keys(parameters);
    if (keys.length === 0) {
      return '';
    }
    let query = '?';
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      query += key + '=' + encodeURIComponent(parameters[key]);
      if (i < keys.length - 1) {
        query += '&';
      }
    }
    return query;
  },

  getFormData: function (jsonObj) {
    const formData = new FormData();
    Object.keys(jsonObj).forEach(key => formData.append(key, jsonObj[key]));
    return formData;
  },

  fetchWithResponse: async function (url, options) {
    const response = await this.fetch(url, options);
    if (response) {
      const headers = this.parseAndMergeNestedHeaders(response.headers);
      let data = await response.text();
      try { data = JSON.parse(data) } catch (e) { }
      if (response.ok) {
        let res = { response, headers, data };
        return res;
      }
      else {
        throw data
      }
    }
  },

  doFetch: function (url, jsonData, options, method = "POST", keepOrigin = false) {
    if (!keepOrigin && jsonData && typeof jsonData === "object") {
      jsonData = JSON.stringify(jsonData);
    }
    let opt = { method: method };
    if (jsonData) {
      opt.body = jsonData;
    }
    options = { ...opt, ...options };
    return this.fetchWithResponse(url, options)
  }
}

