var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("core/interfaces/LifeCycle", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("core/YaceContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    var YaceContainer = (function () {
        function YaceContainer() {
            this.childs = [];
        }
        YaceContainer.prototype.add = function (obj) {
            this.childs.push(obj);
            return this;
        };
        YaceContainer.prototype.remove = function (obj) {
            var start = this.childs.indexOf(obj);
            if (start >= 1) {
                this.childs.slice(start, 1);
            }
            return this;
        };
        YaceContainer.prototype.onUpdate = function () {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.onUpdate();
            }
        };
        return YaceContainer;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceContainer;
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
        Point2D.subtract = function (v1, v2) {
            return new Point2D(v1.x - v2.x, v1.y - v2.y);
        };
        Point2D.multiply = function (v1, v2) {
            return new Point2D(v1.x * v2.x, v1.y * v2.y);
        };
        Point2D.divide = function (v1, v2) {
            return new Point2D(v1.x / v2.x, v1.y / v2.y);
        };
        Point2D.max = function (v1, v2) {
            return new Point2D(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
        };
        Point2D.min = function (v1, v2) {
            return new Point2D(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
        };
        Point2D.equals = function (v1, v2) {
            return v1.x === v2.x && v1.y === v2.y;
        };
        Point2D.ONE = new Point2D(1, 1);
        Point2D.ZERO = new Point2D(0, 0);
        return Point2D;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Point2D;
});
define("utils/Box2D", ["require", "exports", "utils/Point2D"], function (require, exports, Point2D_1) {
    "use strict";
    var Box2D = (function () {
        function Box2D(min, max) {
            this.min = min;
            this.max = max;
        }
        Box2D.prototype.width = function () {
            return this.max.x - this.min.x;
        };
        Box2D.prototype.height = function () {
            return this.max.y - this.min.y;
        };
        Box2D.bound = function (bounds, point) {
            return Point2D_1.default.max(bounds.min, Point2D_1.default.min(bounds.max, point));
        };
        return Box2D;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Box2D;
});
define("core/interfaces/Boxed", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("core/YaceCamera", ["require", "exports", "core/YaceObject", "utils/Point2D", "utils/Box2D"], function (require, exports, YaceObject_1, Point2D_2, Box2D_1) {
    "use strict";
    var YaceCamera = (function (_super) {
        __extends(YaceCamera, _super);
        function YaceCamera(canvas) {
            _super.call(this);
            this.dragSpeed = Point2D_2.default.ZERO;
            this.zoomSpeed = Point2D_2.default.ZERO;
            this.canvas = canvas.get(0);
            this.context = this.canvas.getContext("2d");
            canvas
                .bind("mousedown", this.dragStart.bind(this))
                .bind("mouseup mouseleave", this.dragEnd.bind(this))
                .bind("mousemove", this.dragEvent.bind(this))
                .bind("wheel", this.zoomEvent.bind(this));
        }
        YaceCamera.prototype.draw = function (scene, context) {
            context.fillStyle = "#9ea7b8";
            context.fillRect(0, 0, scene.canvas.width, scene.canvas.height);
            for (var _i = 0, _a = scene.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(scene, context);
            }
            this.context.fillStyle = "#000000";
            this.context.fillRect(0, 0, scene.canvas.width, scene.canvas.height);
            var box = this.box();
            this.context.drawImage(scene.canvas, box.min.x, box.min.y, box.max.x - box.min.x, box.max.y - box.min.y, 0, 0, this.canvas.width, this.canvas.height);
        };
        YaceCamera.prototype.box = function () {
            var min = new Point2D_2.default((this.position.x - (this.canvas.width / 2 / this.scale.x)), (this.position.y - (this.canvas.height / 2 / this.scale.y)));
            var max = new Point2D_2.default(min.x + this.canvas.width / this.scale.x, min.y + this.canvas.height / this.scale.y);
            return new Box2D_1.default(min, max);
        };
        YaceCamera.prototype.dragStart = function (event) {
            this.mousePoint = new Point2D_2.default(event.pageX, event.pageY);
            this.cameraPoint = new Point2D_2.default(this.position.x, this.position.y);
        };
        YaceCamera.prototype.dragEnd = function () {
            this.mousePoint = this.cameraPoint = null;
        };
        YaceCamera.prototype.dragEvent = function (event) {
            if (Point2D_2.default.equals(Point2D_2.default.ZERO, this.dragSpeed)) {
                return;
            }
            if (this.mousePoint == null) {
                return;
            }
            this.position = new Point2D_2.default(this.cameraPoint.x - (event.pageX - this.mousePoint.x) * this.dragSpeed.x / this.scale.x, this.cameraPoint.y - (event.pageY - this.mousePoint.y) * this.dragSpeed.y / this.scale.y);
        };
        YaceCamera.prototype.zoomEvent = function (event) {
            if (Point2D_2.default.equals(Point2D_2.default.ZERO, this.zoomSpeed)) {
                return;
            }
            var offset = new Point2D_2.default(event.originalEvent["offsetX"] - this.canvas.width / 2, event.originalEvent["offsetY"] - this.canvas.height / 2);
            var point = new Point2D_2.default(this.position.x + offset.x / this.scale.x, this.position.y + offset.y / this.scale.y);
            var operand = event.originalEvent["deltaY"] < 0
                ? Point2D_2.default.subtract(Point2D_2.default.ONE, this.zoomSpeed)
                : Point2D_2.default.concat(Point2D_2.default.ONE, this.zoomSpeed);
            this.scale = Point2D_2.default.multiply(this.scale, operand);
            this.position = new Point2D_2.default(point.x - offset.x / this.scale.x, point.y - offset.y / this.scale.y);
        };
        return YaceCamera;
    }(YaceObject_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceCamera;
});
define("core/YaceScene", ["require", "exports", "core/YaceContainer"], function (require, exports, YaceContainer_1) {
    "use strict";
    var YaceScene = (function (_super) {
        __extends(YaceScene, _super);
        function YaceScene(width, height) {
            _super.call(this);
            this.cameras = [];
            this.canvas = document.createElement("canvas");
            this.canvas.width = width;
            this.canvas.height = height;
            this.context = this.canvas.getContext("2d");
            setInterval(this.onUpdate.bind(this), 30);
        }
        YaceScene.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            for (var _i = 0, _a = this.cameras; _i < _a.length; _i++) {
                var camera = _a[_i];
                camera.onUpdate();
                camera.draw(this, this.context);
            }
        };
        YaceScene.prototype.addCamera = function (camera) {
            this.cameras.push(camera);
        };
        YaceScene.prototype.removeCamera = function (camera) {
            var start = this.cameras.indexOf(camera);
            if (start >= 0) {
                this.cameras.splice(start, 1);
            }
        };
        return YaceScene;
    }(YaceContainer_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceScene;
});
define("core/interfaces/Drawable", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("core/YaceObject", ["require", "exports", "core/YaceContainer", "utils/Point2D"], function (require, exports, YaceContainer_2, Point2D_3) {
    "use strict";
    var YaceObject = (function (_super) {
        __extends(YaceObject, _super);
        function YaceObject() {
            _super.apply(this, arguments);
            this.behaviors = [];
            this.position = new Point2D_3.default(0, 0);
            this.scale = new Point2D_3.default(1, 1);
        }
        YaceObject.prototype.addBehavior = function (behavior) {
            this.behaviors.push(behavior);
            behavior.object = this;
            return this;
        };
        YaceObject.prototype.removeBehavior = function (behavior) {
            behavior.object = null;
            var start = this.behaviors.indexOf(behavior);
            if (start >= 0) {
                this.behaviors.splice(start, 1);
            }
            return this;
        };
        YaceObject.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            for (var _i = 0, _a = this.behaviors; _i < _a.length; _i++) {
                var behavior = _a[_i];
                behavior.onUpdate();
            }
        };
        YaceObject.prototype.draw = function (scene, context) {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.draw(scene, context);
            }
            for (var _b = 0, _c = this.behaviors; _b < _c.length; _b++) {
                var behavior = _c[_b];
                var drawable = behavior;
                if (typeof (drawable.draw) === "undefined") {
                    continue;
                }
                drawable.draw(scene, context);
            }
        };
        return YaceObject;
    }(YaceContainer_2.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceObject;
});
define("core/YaceBehavior", ["require", "exports"], function (require, exports) {
    "use strict";
    var YaceBehavior = (function () {
        function YaceBehavior() {
        }
        YaceBehavior.prototype.onUpdate = function () {
        };
        return YaceBehavior;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceBehavior;
});
define("behaviors/BoundsBehavior", ["require", "exports", "core/YaceBehavior", "utils/Box2D", "utils/Point2D"], function (require, exports, YaceBehavior_1, Box2D_2, Point2D_4) {
    "use strict";
    var BoundsBehavior = (function (_super) {
        __extends(BoundsBehavior, _super);
        function BoundsBehavior() {
            _super.apply(this, arguments);
        }
        BoundsBehavior.prototype.onUpdate = function () {
            _super.prototype.onUpdate.call(this);
            if (this.positionBound != null) {
                this.object.position = Box2D_2.default.bound(this.positionBound, this.object.position);
            }
            if (this.scaleBound != null) {
                this.object.scale = Box2D_2.default.bound(this.scaleBound, this.object.scale);
            }
            if (this.boxBound != null) {
                var boxed = this.object;
                if (typeof (boxed.box) !== "undefined") {
                    var box = boxed.box();
                    this.object.scale = Point2D_4.default.multiply(this.object.scale, new Point2D_4.default(Math.max(1, box.width() / this.boxBound.width()), Math.max(1, box.height() / this.boxBound.height())));
                    box = boxed.box();
                    this.object.position = Point2D_4.default.subtract(this.object.position, Point2D_4.default.min(Point2D_4.default.ZERO, Point2D_4.default.subtract(box.min, this.boxBound.min)));
                    this.object.position = Point2D_4.default.concat(this.object.position, Point2D_4.default.min(Point2D_4.default.ZERO, Point2D_4.default.subtract(this.boxBound.max, box.max)));
                }
            }
        };
        return BoundsBehavior;
    }(YaceBehavior_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BoundsBehavior;
});
define("renders/ImageRenderer", ["require", "exports", "core/YaceBehavior"], function (require, exports, YaceBehavior_2) {
    "use strict";
    var ImageRenderer = (function (_super) {
        __extends(ImageRenderer, _super);
        function ImageRenderer(url) {
            _super.call(this);
            this.image = new Image();
            this.image.src = url;
            this.image.onload = function () {
            };
        }
        ImageRenderer.prototype.draw = function (scene, context) {
            context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.object.position.x * this.object.scale.x, this.object.position.y * this.object.scale.y, this.image.width * this.object.scale.x, this.image.height * this.object.scale.y);
        };
        return ImageRenderer;
    }(YaceBehavior_2.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageRenderer;
});
//# sourceMappingURL=yace.js.map