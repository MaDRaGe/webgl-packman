var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var glm;
(function (glm) {
    var vec2 = (function () {
        function vec2(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        return vec2;
    }());
    glm.vec2 = vec2;
    var vec3 = (function (_super) {
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
    }(vec2));
    glm.vec3 = vec3;
    var vec4 = (function (_super) {
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
    }(vec3));
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
})(glm || (glm = {}));
export { glm };
//# sourceMappingURL=glm.js.map