var GraphicObject = (function () {
    function GraphicObject(mesh) {
        this.mesh = mesh;
    }
    GraphicObject.prototype.setMesh = function (mesh) {
        this.mesh = mesh;
    };
    GraphicObject.prototype.getMesh = function () {
        return this.mesh;
    };
    return GraphicObject;
}());
export default GraphicObject;
//# sourceMappingURL=GraphicObject.js.map