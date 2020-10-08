var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { glm } from "./glm";
var Vertex = (function () {
    function Vertex(coord, normal, texCoord) {
        this.coord = coord;
        this.normal = normal;
        this.texCoord = texCoord;
    }
    return Vertex;
}());
var Mesh = (function () {
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
                        _a.trys.push([0, 3, , 4]);
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
                    case 4: return [2];
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
            var keyword = m[1], unparsedArgs = m[2];
            var parts = line.split(/\s+/);
            switch (keyword) {
                case "v":
                    v.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
                    break;
                case "vn":
                    vn.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
                    break;
                case "vt":
                    vt.push(new glm.vec3(+parts[1], +parts[2], +parts[3]));
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
        }
        else {
            this.indices.push(this.vertexToIndex.get(param));
        }
    };
    Mesh.prototype.draw = function (gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
        gl.drawElements(gl.LINE_LOOP, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };
    Mesh.prototype.getVerticesPoints = function () {
        var verticesPoints = this.vertices
            .map(function (vertex) {
            return [vertex.coord.x, vertex.coord.y, vertex.coord.z];
        })
            .flat();
        return verticesPoints;
    };
    Mesh.prototype.getArrayBuffer = function () {
        return this.arrayBuffer;
    };
    return Mesh;
}());
export default Mesh;
//# sourceMappingURL=Mesh.js.map