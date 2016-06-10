'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function log(argument) {
	console.log(argument);
}

router.get('/', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, 'static/index.html'));
});

router.get('/health', function (req, res) {
	// IMPORTANT: Your application HAS to respond to GET /health with status 200 for OpenShift health monitoring
	res.status(200);
	res.send();
});

exports.default = router;