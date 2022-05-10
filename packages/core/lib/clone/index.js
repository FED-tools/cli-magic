"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _awaitExec = _interopRequireDefault(require("await-exec"));

var _fs = _interopRequireDefault(require("fs"));

function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }

var clone = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var list, path, log, countRepos, clonedRepos, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, el, pathCurrent, command;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            list = _ref.list, path = _ref.path, log = _ref.log;
            countRepos = 0;
            clonedRepos = [];
            log("Cloning all repositories (".concat(list.length, ")"));
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 6;
            _iterator = _asyncIterator(list);

          case 8:
            _context.next = 10;
            return _iterator.next();

          case 10:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 30;
              break;
            }

            el = _step.value;
            pathCurrent = "".concat(path, "/").concat(el.path);
            log("Start cloning: (".concat(++countRepos, "/").concat(list.length, ") ").concat(el.repo, " : "));
            _context.prev = 14;

            _fs["default"].accessSync(pathCurrent, _fs["default"].constants.F_OK);

            log("Repository already exists: ".concat(pathCurrent));
            _context.next = 27;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](14);
            command = "git clone ".concat(el.repo, " ").concat(pathCurrent);
            log('> ' + command);
            _context.next = 25;
            return (0, _awaitExec["default"])(command);

          case 25:
            log("Repository has been cloned: ".concat(el.repo));
            clonedRepos.push(el.repo);

          case 27:
            _iteratorAbruptCompletion = false;
            _context.next = 8;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 36:
            _context.prev = 36;
            _context.prev = 37;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return _iterator["return"]();

          case 41:
            _context.prev = 41;

            if (!_didIteratorError) {
              _context.next = 44;
              break;
            }

            throw _iteratorError;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(36);

          case 46:
            log("Done cloning all repositories");
            return _context.abrupt("return", {
              count: countRepos,
              repos: clonedRepos
            });

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 32, 36, 46], [14, 19], [37,, 41, 45]]);
  }));

  return function clone(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.clone = clone;