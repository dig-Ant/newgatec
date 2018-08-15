process.env.NODE_ENV='development';

//global.app = require('../server/server');
global.loopback = require('loopback');
global.superagent = require('superagent');
global.expect = require('expect');
global.rp = require('request-promise');
global.fs = require('fs');
global.assert = require('assert');


global.serverUrl = 'http://localhost:33332/api/';

global.token=null;
