define(["require", "exports", "core/YaceScene", "core/YaceObject", "renders/ImageRenderer", "utils/Point2D"], function (require, exports, YaceScene_1, YaceObject_1, ImageRenderer_1, Point2D_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene() {
        }
        SimpleScene.prototype.test = function () {
            var canvas = $('#canvas');
            var scene = new YaceScene_1.YaceScene(canvas.get(0));
            var sprite = new YaceObject_1.YaceObject();
            sprite.addBehavior(new ImageRenderer_1.ImageRenderer('images/train.jpg'));
            sprite.scale = new Point2D_1.Point2D(0.5, 0.5);
            scene.add(sprite);
        };
        return SimpleScene;
    }());
    exports.SimpleScene = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map