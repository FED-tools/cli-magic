"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = require("winston");

var logger = function logger(file) {
  var myFormat = _winston.format.printf(function (_ref) {
    var timestamp = _ref.timestamp,
        level = _ref.level,
        message = _ref.message,
        meta = _ref.meta;
    return "".concat(timestamp, " | ").concat(level, " | ").concat(message, ";").concat(meta ? JSON.stringify(meta) : '');
  });

  return (0, _winston.createLogger)({
    transports: [new _winston.transports.Console({
      filename: file,
      level: 'info',
      format: _winston.format.combine(_winston.format.timestamp(), _winston.format.splat(), myFormat)
    }), new _winston.transports.File({
      filename: file,
      level: 'info',
      format: _winston.format.combine(_winston.format.timestamp(), _winston.format.splat(), myFormat)
    })]
  });
};

exports.logger = logger;