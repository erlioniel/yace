define(["require", "exports", "core/YaceScene", "core/YaceObject", "renders/ImageRenderer"], function (require, exports, YaceScene_1, YaceObject_1, ImageRenderer_1) {
    "use strict";
    var SimpleScene = (function () {
        function SimpleScene() {
        }
        SimpleScene.prototype.test = function () {
            var canvas = $('#canvas');
            var scene = new YaceScene_1.YaceScene(canvas.get(0));
            var sprite = new YaceObject_1.YaceObject();
            sprite.addBehavior(new ImageRenderer_1.ImageRenderer('images/train.jpg'));
            scene.add(sprite);
        };
        return SimpleScene;
    }());
    exports.SimpleScene = SimpleScene;
});
//# sourceMappingURL=simpleScene.js.map