process.env.NODE_ENV='development';

//global.app = require('../server/server');
global.loopback = require('loopback');
global.superagent = require('superagent');
global.expect = require('expect');

global.serverUrl = 'http://localhost:33333/api/';

global.token=null;
