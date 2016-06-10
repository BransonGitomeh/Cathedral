'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _contentTypes = require('./utils/content-types');

var _contentTypes2 = _interopRequireDefault(_contentTypes);

var _sysInfo = require('./utils/sys-info');

var _sysInfo2 = _interopRequireDefault(_sysInfo);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/', _routes2.default);

app.use(function (req, res, next) {
  console.log(req.method + "    " + req.url);

  var startTime = new Date();

  res.on("finish", function () {

    var endTime = new Date();

    var timeTaken = endTime - startTime;

    console.log("done in %sms", timeTaken);
  });

  next();
});

app.use('/', _express2.default.static(__dirname + '/static'));

app.use(function (req, res, next) {
  var url = req.url;
  if (url.indexOf('/info/') == 0) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.send(JSON.stringify(_sysInfo2.default[url.slice(6)]()));
  }
  next();
});

var server = app.listen(process.env.NODE_PORT || 3000, process.env.NODE_IP || 'localhost', function () {
  var _server$address = server.address();

  var address = _server$address.address;
  var port = _server$address.port;


  console.log('Application worker ' + process.pid + ' started... *:http://' + address + ':' + port);
});