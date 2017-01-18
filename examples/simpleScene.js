define(["require", "exports", "core/YaceScene", "core/YaceObject", "core/YaceCamera", "renders/ImageRenderer", "renders/PolyRenderer", "behaviors/BoundsBehavior", "utils/Point2D", "utils/Box2D", "../src/utils/ImageUtils"], function (require, exports, YaceScene_1, YaceObject_1, YaceCamera_1, ImageRenderer_1, PolyRenderer_1, BoundsBehavior_1, Point2D_1, Box2D_1, ImageUtils_1) {
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
            bounds.boxFixRatio = true;
            camera.addBehavior(bounds);
            var poly = new YaceObject_1.default();
            var polyRenderer = new PolyRenderer_1.default([
                new Point2D_1.default(0, 0),
                new Point2D_1.default(1600, 0),
                new Point2D_1.default(1600, 1080),
                new Point2D_1.default(0, 1080)
            ]);
            polyRenderer.fillColor = "#666666";
            poly.addBehavior(polyRenderer);
            poly.position = new Point2D_1.default(0, 0);
            scene.add(poly);
            ImageUtils_1.default.load('images/train.jpg', function (image) {
                var sprite = new YaceObject_1.default();
                sprite.addBehavior(new ImageRenderer_1.default(image));
                sprite.position = new Point2D_1.default(170, 120);
                scene.add(sprite);
            });
        }
        return SimpleScene;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map