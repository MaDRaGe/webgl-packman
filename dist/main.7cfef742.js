// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dist/Scene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Scene = function () {
  function Scene(domSelector) {
    this.objects = [];
    this.meshes = [];
    this.scene = document.createElement("canvas");
    this.gl = this.scene.getContext("webgl");
    this.shaderProgram = this.gl.createProgram();
    this.shaders = {
      vertex: this.gl.createShader(this.gl.VERTEX_SHADER),
      fragment: this.gl.createShader(this.gl.FRAGMENT_SHADER)
    };
    this.scene = document.querySelector("" + domSelector);

    if (this.scene) {
      this.gl = this.scene.getContext("webgl") || this.scene.getContext("experimental-webgl");
    }
  }

  Scene.prototype.initShader = function (type, sourceDom) {
    var _a, _b, _c, _d;

    if (type === "vertex") {
      this.shaders[type] = (_a = this.gl) === null || _a === void 0 ? void 0 : _a.createShader(this.gl.VERTEX_SHADER);
    } else {
      this.shaders[type] = (_b = this.gl) === null || _b === void 0 ? void 0 : _b.createShader(this.gl.FRAGMENT_SHADER);
    }

    (_c = this.gl) === null || _c === void 0 ? void 0 : _c.shaderSource(this.shaders[type], ((_d = document.querySelector("" + sourceDom)) === null || _d === void 0 ? void 0 : _d.textContent) || "");
    this.gl.compileShader(this.shaders[type]);

    if (this.gl.getShaderParameter(this.shaders[type], this.gl.COMPILE_STATUS)) {
      return true;
    }

    console.log(this.gl.getShaderInfoLog(this.shaders[type]));
    return false;
  };

  Scene.prototype.initShaderProgram = function () {
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, this.shaders.vertex);
    this.gl.attachShader(this.shaderProgram, this.shaders.fragment);
    this.gl.linkProgram(this.shaderProgram);

    if (this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      return true;
    }

    console.log(this.gl.getProgramInfoLog(this.shaderProgram));
    return false;
  };

  Scene.prototype.addMesh = function (mesh) {
    this.meshes.push(mesh);
  };

  Scene.prototype.draw = function () {
    var resolUniformLocation = this.gl.getUniformLocation(this.shaderProgram, "u_resolution");
    this.gl.uniform2f(resolUniformLocation, this.gl.canvas.width, this.gl.canvas.height);
    var posAttribLocation = this.gl.getAttribLocation(this.shaderProgram, "a_position");
    this.gl.enableVertexAttribArray(posAttribLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.meshes[0].getArrayBuffer());
    this.gl.vertexAttribPointer(posAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.useProgram(this.shaderProgram);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.meshes[0].draw(this.gl);
    requestAnimationFrame(this.draw.bind(this));
  };

  Scene.prototype.getGl = function () {
    return this.gl;
  };

  return Scene;
}();

var _default = Scene;
exports.default = _default;
},{}],"dist/glm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.glm = void 0;

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var glm;
exports.glm = glm;

(function (glm) {
  var vec2 = function () {
    function vec2(x, y) {
      this.x = 0;
      this.y = 0;
      this.x = x;
      this.y = y;
    }

    return vec2;
  }();

  glm.vec2 = vec2;

  var vec3 = function (_super) {
    __extends(vec3, _super);

    function vec3(x, y, z) {
      var _this = _super.call(this, x, y) || this;

      _this.z = 0;
      _this.r = 0;
      _this.g = 0;
      _this.b = 0;
      _this.z = z;
      _this.r = x;
      _this.g = y;
      _this.b = z;
      return _this;
    }

    return vec3;
  }(vec2);

  glm.vec3 = vec3;

  var vec4 = function (_super) {
    __extends(vec4, _super);

    function vec4(x, y, z, w) {
      var _this = _super.call(this, x, y, z) || this;

      _this.w = 0;
      _this.a = 0;
      _this.w = w;
      _this.r = x;
      _this.g = y;
      _this.b = z;
      _this.a = z;
      return _this;
    }

    return vec4;
  }(vec3);

  glm.vec4 = vec4;

  function translation(tx, ty) {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
  }

  glm.translation = translation;

  function rotation(angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [cos, -sin, 0, sin, cos, 0, 0, 0, 1];
  }

  glm.rotation = rotation;

  function scaling(sx, sy) {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  }

  glm.scaling = scaling;
})(glm || (exports.glm = glm = {}));
},{}],"dist/Mesh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _glm = require("./glm");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var Vertex = function () {
  function Vertex(coord, normal, texCoord) {
    this.coord = coord;
    this.normal = normal;
    this.texCoord = texCoord;
  }

  return Vertex;
}();

var Mesh = function () {
  function Mesh() {
    this.vertices = [];
    this.indices = [];
    this.vertexToIndex = new Map();
  }

  Mesh.prototype.load = function (name, gl) {
    return __awaiter(this, void 0, void 0, function () {
      var response, text, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3,, 4]);

            return [4, fetch("http://127.0.0.1:8887/dist/assets/meshes/" + name + ".obj")];

          case 1:
            response = _a.sent();
            return [4, response.text()];

          case 2:
            text = _a.sent();
            this.parseAttributes(text);
            this.arrayBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.getVerticesPoints()), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this.elementArrayBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            return [3, 4];

          case 3:
            error_1 = _a.sent();
            console.error(error_1);
            return [3, 4];

          case 4:
            return [2];
        }
      });
    });
  };

  Mesh.prototype.parseAttributes = function (text) {
    var _this = this;

    var keywordRE = /(\w*)(?: )*(.*)/;
    var lines = text.split("\n");
    var v = [];
    var vn = [];
    var vt = [];

    for (var linesNo = 0; linesNo < lines.length; linesNo++) {
      var line = lines[linesNo].trim();

      if (line === "" || line.startsWith("#")) {
        continue;
      }

      var m = keywordRE.exec(line);

      if (!m) {
        continue;
      }

      var keyword = m[1],
          unparsedArgs = m[2];
      var parts = line.split(/\s+/);

      switch (keyword) {
        case "v":
          v.push(new _glm.glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;

        case "vn":
          vn.push(new _glm.glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;

        case "vt":
          vt.push(new _glm.glm.vec3(+parts[1], +parts[2], +parts[3]));
          break;

        case "f":
          unparsedArgs.split(/\s+/).forEach(function (param) {
            _this.addNewVertex(param, v, vn, vt);
          });
          break;
      }
    }
  };

  Mesh.prototype.addNewVertex = function (param, v, vn, vt) {
    if (!this.vertexToIndex.has(param)) {
      this.vertexToIndex.set(param, this.vertexToIndex.size + 1);
      var indices = param.split("/").map(function (item) {
        return +item;
      });
      this.vertices.push(new Vertex(v[indices[0] - 1], vn[indices[1] - 1], vt[indices[2] - 1]));
    } else {
      this.indices.push(this.vertexToIndex.get(param));
    }
  };

  Mesh.prototype.draw = function (gl) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
    gl.drawElements(gl.LINE_LOOP, this.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  };

  Mesh.prototype.getVerticesPoints = function () {
    var verticesPoints = this.vertices.map(function (vertex) {
      return [vertex.coord.x, vertex.coord.y, vertex.coord.z];
    }).flat();
    return verticesPoints;
  };

  Mesh.prototype.getArrayBuffer = function () {
    return this.arrayBuffer;
  };

  return Mesh;
}();

var _default = Mesh;
exports.default = _default;
},{"./glm":"dist/glm.js"}],"dist/main.js":[function(require,module,exports) {
"use strict";

var _Scene = _interopRequireDefault(require("./Scene"));

var _Mesh = _interopRequireDefault(require("./Mesh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scene = new _Scene.default("#scene");
scene.initShader("vertex", "#vertex-shader-2d");
scene.initShader("fragment", "#fragment-shader-2d");
scene.initShaderProgram();
var box = new _Mesh.default();
box.load("Box", scene.getGl());
scene.addMesh(box);
requestAnimationFrame(scene.draw.bind(scene));
},{"./Scene":"dist/Scene.js","./Mesh":"dist/Mesh.js"}],"../../../../../../Users/Redal/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59043" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../Users/Redal/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/main.js"], null)
//# sourceMappingURL=/main.7cfef742.js.map