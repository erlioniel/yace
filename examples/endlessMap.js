define(["require", "exports", "core/YaceScene", "core/YaceCamera", "behaviors/BoundsBehavior", "utils/Point2D", "utils/Box2D", "utils/TileSet", "core/YaceObject", "renders/TileRenderer", "../src/utils/ImageUtils"], function (require, exports, YaceScene_1, YaceCamera_1, BoundsBehavior_1, Point2D_1, Box2D_1, TileSet_1, YaceObject_1, TileRenderer_1, ImageUtils_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene(selector) {
            var scene = new YaceScene_1.default(2000, 2000);
            var canvas = $(selector);
            var camera = new YaceCamera_1.default(canvas);
            camera.dragSpeed = Point2D_1.default.ONE;
            camera.zoomSpeed = new Point2D_1.default(0.1, 0.1);
            scene.addCamera(camera);
            var bounds = new BoundsBehavior_1.default();
            bounds.scaleBound = new Box2D_1.default(new Point2D_1.default(0.1, 0.1), new Point2D_1.default(1.5, 1.5));
            bounds.boxBound = new Box2D_1.default(new Point2D_1.default(0, 0), new Point2D_1.default(2000, 2000));
            bounds.boxFixRatio = true;
            camera.addBehavior(bounds);
            ImageUtils_1.default.load('images/tiles.png', function (image) {
                var tileset = TileSet_1.default.simpleGrid(image, new Point2D_1.default(32, 32));
                var poly = new YaceObject_1.default();
                var tileRenderer = new TileRenderer_1.default(tileset);
                tileRenderer.activate(3);
                poly.addBehavior(tileRenderer);
                poly.position = new Point2D_1.default(0, 0);
                scene.add(poly);
            });
        }
        return SimpleScene;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SimpleScene;
});
//# sourceMappingURL=endlessMap.js.map