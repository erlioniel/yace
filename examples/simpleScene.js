define(["require", "exports", "core/YaceScene", "core/YaceObject"], function (require, exports, YaceScene_1, YaceObject_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene() {
        }
        SimpleScene.prototype.test = function () {
            var canvas = $('#canvas');
            var scene = new YaceScene_1.YaceScene(canvas);
            scene.add(new YaceObject_1.YaceObject());
        };
        return SimpleScene;
    }());
    exports.SimpleScene = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map