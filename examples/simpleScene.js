define(["require", "exports", "core/YaceScene", "core/YaceObject", "core/YaceCamera", "renders/ImageRenderer", "behaviors/BoundsBehavior", "utils/Point2D", "utils/Box2D"], function (require, exports, YaceScene_1, YaceObject_1, YaceCamera_1, ImageRenderer_1, BoundsBehavior_1, Point2D_1, Box2D_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene(selector) {
            var scene = new YaceScene_1.default(1600, 1080);
            var canvas = $(selector);
            var camera = new YaceCamera_1.default(canvas);
            camera.position = new Point2D_1.default(800, 540);
            camera.scale = new Point2D_1.default(0.5, 0.5);
            camera.dragSpeed = Point2D_1.default.ONE;
            camera.zoomSpeed = new Point2D_1.default(0.1, 0.1);
            scene.addCamera(camera);
            var bounds = new BoundsBehavior_1.default();
            bounds.scaleBound = new Box2D_1.default(new Point2D_1.default(0.1, 0.1), new Point2D_1.default(1.5, 1.5));
            bounds.boxBound = new Box2D_1.default(new Point2D_1.default(-100, -100), new Point2D_1.default(1700, 1180));
            camera.addBehavior(bounds);
            var sprite = new YaceObject_1.default();
            sprite.addBehavior(new ImageRenderer_1.default('images/train.jpg'));
            sprite.position = new Point2D_1.default(170, 120);
            scene.add(sprite);
        }
        return SimpleScene;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map