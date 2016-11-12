define(["require", "exports", "core/YaceScene", "core/YaceObject", "renders/ImageRenderer", "utils/Point2D", "core/YaceCamera"], function (require, exports, YaceScene_1, YaceObject_1, ImageRenderer_1, Point2D_1, YaceCamera_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene() {
        }
        SimpleScene.prototype.test = function () {
            var scene = new YaceScene_1.default(1600, 1080);
            var canvas = $('#canvas');
            var camera = new YaceCamera_1.default(canvas);
            camera.scale = new Point2D_1.default(0.5, 0.5);
            camera.dragSpeed = Point2D_1.default.ONE;
            camera.zoomSpeed = new Point2D_1.default(0.1, 0.1);
            scene.addCamera(camera);
            var sprite = new YaceObject_1.default();
            sprite.addBehavior(new ImageRenderer_1.default('images/train.jpg'));
            sprite.position = new Point2D_1.default(170, 120);
            scene.add(sprite);
        };
        return SimpleScene;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map