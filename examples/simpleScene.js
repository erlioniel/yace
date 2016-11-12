define(["require", "exports", "core/YaceScene", "core/YaceObject", "renders/ImageRenderer", "utils/Point2D", "core/YaceCamera"], function (require, exports, YaceScene_1, YaceObject_1, ImageRenderer_1, Point2D_1, YaceCamera_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene() {
        }
        SimpleScene.prototype.test = function () {
            var scene = new YaceScene_1.default(1600, 1080);
            var canvas = $('#canvas');
            var camera = new YaceCamera_1.default(canvas.get(0));
            camera.scale = new Point2D_1.default(0.5, 0.5);
            scene.addCamera(camera);
            var sprite = new YaceObject_1.default();
            sprite.addBehavior(new ImageRenderer_1.default('images/train.jpg'));
            sprite.position = new Point2D_1.default(170, 120);
            scene.add(sprite);
            scene.onUpdate();
            var mouse_point, camera_point;
            canvas
                .bind("mousedown", function (event) {
                mouse_point = new Point2D_1.default(event.pageX, event.pageY);
                camera_point = new Point2D_1.default(camera.position.x, camera.position.y);
            })
                .bind("mouseup mouseleave", function () {
                mouse_point = camera_point = null;
            })
                .bind("mousemove", function (event) {
                if (mouse_point != null) {
                    var newX = camera_point.x - (event.pageX - mouse_point.x) / camera.scale.x;
                    var newY = camera_point.y - (event.pageY - mouse_point.y) / camera.scale.y;
                    camera.position = new Point2D_1.default(newX, newY);
                }
            })
                .bind("wheel", function (event) {
                var c = canvas.get(0);
                var offset = new Point2D_1.default(event.originalEvent["offsetX"] - c.width / 2, event.originalEvent["offsetY"] - c.height / 2);
                var point = new Point2D_1.default(camera.position.x + offset.x / camera.scale.x, camera.position.y + offset.y / camera.scale.y);
                var operand = event.originalEvent["deltaY"] < 0
                    ? new Point2D_1.default(0.9, 0.9)
                    : new Point2D_1.default(1.1, 1.1);
                camera.scale = Point2D_1.default.multiply(camera.scale, operand);
                camera.position = new Point2D_1.default(point.x - offset.x / camera.scale.x, point.y - offset.y / camera.scale.y);
            });
        };
        return SimpleScene;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map