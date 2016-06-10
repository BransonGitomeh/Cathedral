'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Example Node Server', function () {
  it('should return 200', function (done) {
    _http2.default.get('http://127.0.0.1:1337', function (res) {
      _assert2.default.equal(200, res.statusCode);
      done();
    });
  });
});