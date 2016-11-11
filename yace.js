var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("core/interfaces/Drawable", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("core/interfaces/LifeCycle", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("core/YaceObjectContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    var YaceObjectContainer = (function () {
        function YaceObjectContainer() {
            this.childs = [];
        }
        YaceObjectContainer.prototype.add = function (obj) {
            this.childs.push(obj);
        };
        YaceObjectContainer.prototype.remove = function (obj) {
            var start = this.childs.indexOf(obj);
            if (start >= 1) {
                this.childs.slice(start, 1);
            }
        };
        YaceObjectContainer.prototype.onEnable = function () {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.onEnable();
            }
        };
        YaceObjectContainer.prototype.onUpdate = function () {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.onUpdate();
            }
        };
        YaceObjectContainer.prototype.onDisable = function () {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.onDisable();
            }
        };
        return YaceObjectContainer;
    }());
    exports.YaceObjectContainer = YaceObjectContainer;
});
define("utils/Point2D", ["require", "exports"], function (require, exports) {
    "use strict";
    var Point2D = (function () {
        function Point2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Point2D.concat = function (v1, v2) {
            return new Point2D(v1.x + v2.x, v1.y + v2.y);
        };
        Point2D.substract = function (v1, v2) {
            return new Point2D(v1.x - v2.x, v1.y - v2.y);
        };
        Point2D.multiply = function (v1, v2) {
            return new Point2D(v1.x * v2.x, v1.y * v2.y);
        };
        Point2D.divide = function (v1, v2) {
            return new Point2D(v1.x / v2.x, v1.y / v2.y);
        };
        return Point2D;
    }());
    exports.Point2D = Point2D;
});
define("core/YaceObject", ["require", "exports", "core/YaceObjectContainer", "utils/Point2D"], function (require, exports, YaceObjectContainer_1, Point2D_1) {
    "use strict";
    var YaceObject = (function (_super) {
        __extends(YaceObject, _super);
        function YaceObject() {
            _super.apply(this, arguments);
            this.behaviors = [];
            this.position = new Point2D_1.Point2D(0, 0);
            this.rotation = new Point2D_1.Point2D(0, 0);
            this.scale = new Point2D_1.Point2D(1, 1);
        }
        YaceObject.prototype.addBehavior = function (behavior) {
            this.behaviors.push(behavior);
            behavior.object = this;
        };
        YaceObject.prototype.removeBehavior = function (behavior) {
            behavior.object = null;
            var start = this.behaviors.indexOf(behavior);
            if (start >= 0) {
                this.behaviors.slice(start, 1);
            }
        };
        YaceObject.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
            for (var _i = 0, _a = this.behaviors; _i < _a.length; _i++) {
                var behavior = _a[_i];
                behavior.onEnable();
            }
        };
        YaceObject.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            for (var _i = 0, _a = this.behaviors; _i < _a.length; _i++) {
                var behavior = _a[_i];
                behavior.onUpdate();
            }
        };
        YaceObject.prototype.onDisable = function () {
            _super.prototype.onDisable.call(this);
            for (var _i = 0, _a = this.behaviors; _i < _a.length; _i++) {
                var behavior = _a[_i];
                behavior.onDisable();
            }
        };
        YaceObject.prototype.draw = function (context) {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(context);
            }
            for (var _b = 0, _c = this.behaviors; _b < _c.length; _b++) {
                var behavior = _c[_b];
                var drawable = behavior;
                if (typeof (drawable.draw) === "undefined") {
                    continue;
                }
                drawable.draw(context);
            }
        };
        return YaceObject;
    }(YaceObjectContainer_1.YaceObjectContainer));
    exports.YaceObject = YaceObject;
});
define("core/YaceBehavior", ["require", "exports"], function (require, exports) {
    "use strict";
    var YaceBehavior = (function () {
        function YaceBehavior() {
        }
        YaceBehavior.prototype.onEnable = function () {
        };
        YaceBehavior.prototype.onUpdate = function () {
        };
        YaceBehavior.prototype.onDisable = function () {
        };
        return YaceBehavior;
    }());
    exports.YaceBehavior = YaceBehavior;
});
define("core/YaceScene", ["require", "exports", "core/YaceObjectContainer"], function (require, exports, YaceObjectContainer_2) {
    "use strict";
    var YaceScene = (function (_super) {
        __extends(YaceScene, _super);
        function YaceScene(canvas) {
            _super.call(this);
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            setInterval(function () {
                this.draw(this.context);
                this.onUpdate();
            }.bind(this), 1000);
        }
        YaceScene.prototype.draw = function (context) {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(context);
            }
        };
        return YaceScene;
    }(YaceObjectContainer_2.YaceObjectContainer));
    exports.YaceScene = YaceScene;
});
define("renders/ImageRenderer", ["require", "exports", "core/YaceBehavior"], function (require, exports, YaceBehavior_1) {
    "use strict";
    var ImageRenderer = (function (_super) {
        __extends(ImageRenderer, _super);
        function ImageRenderer(url) {
            _super.call(this);
            var that = this;
            this.image = new Image();
            this.image.src = url;
            this.image.onload = function () {
                that.width = that.width || this.width;
                that.height = that.height || this.height;
            };
        }
        ImageRenderer.prototype.draw = function (context) {
            context.drawImage(this.image, 0, 0, this.width, this.height, this.object.position.x * this.object.scale.x, this.object.position.y * this.object.scale.y, this.width * this.object.scale.x, this.height * this.object.scale.y);
        };
        return ImageRenderer;
    }(YaceBehavior_1.YaceBehavior));
    exports.ImageRenderer = ImageRenderer;
});
//# sourceMappingURL=yace.js.map