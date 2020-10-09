var Scene = (function () {
    function Scene(domSelector) {
        this.objects = [];
        this.meshes = [];
        this.scene = (document.createElement("canvas"));
        this.gl = (this.scene.getContext("webgl"));
        this.shaderProgram = this.gl.createProgram();
        this.shaders = {
            vertex: this.gl.createShader(this.gl.VERTEX_SHADER),
            fragment: this.gl.createShader(this.gl.FRAGMENT_SHADER),
        };
        this.scene = document.querySelector("" + domSelector);
        if (this.scene) {
            this.gl =
                this.scene.getContext("webgl") ||
                    this.scene.getContext("experimental-webgl");
        }
    }
    Scene.prototype.initShader = function (type, sourceDom) {
        var _a, _b, _c, _d;
        if (type === "vertex") {
            this.shaders[type] = ((_a = this.gl) === null || _a === void 0 ? void 0 : _a.createShader(this.gl.VERTEX_SHADER));
        }
        else {
            this.shaders[type] = ((_b = this.gl) === null || _b === void 0 ? void 0 : _b.createShader(this.gl.FRAGMENT_SHADER));
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
        var translation = this.gl.getUniformLocation(this.shaderProgram, "u_translation");
        console.log(translation);
        this.gl.uniform2f(translation, 0.5, 0.5);
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
}());
export default Scene;
//# sourceMappingURL=Scene.js.map