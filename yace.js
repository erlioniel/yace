var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("core/interfaces/LifeCycle", ["require", "exports"], function (require, exports) {
    "use strict";
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
define("core/YaceObject", ["require", "exports", "core/YaceContainer", "utils/Point2D"], function (require, exports, YaceContainer_1, Point2D_1) {
    "use strict";
    var YaceObject = (function (_super) {
        __extends(YaceObject, _super);
        function YaceObject() {
            _super.apply(this, arguments);
            this.behaviors = [];
            this.position = new Point2D_1.default(0, 0);
            this.scale = new Point2D_1.default(1, 1);
        }
        YaceObject.prototype.addBehavior = function (behavior) {
            this.behaviors.push(behavior);
            behavior.object = this;
        };
        YaceObject.prototype.removeBehavior = function (behavior) {
            behavior.object = null;
            var start = this.behaviors.indexOf(behavior);
            if (start >= 0) {
                this.behaviors.splice(start, 1);
            }
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
    }(YaceContainer_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceObject;
});
define("core/YaceContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    var YaceContainer = (function () {
        function YaceContainer() {
            this.childs = [];
        }
        YaceContainer.prototype.add = function (obj) {
            this.childs.push(obj);
        };
        YaceContainer.prototype.remove = function (obj) {
            var start = this.childs.indexOf(obj);
            if (start >= 1) {
                this.childs.slice(start, 1);
            }
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
define("core/YaceCamera", ["require", "exports", "core/YaceObject", "utils/Point2D"], function (require, exports, YaceObject_1, Point2D_2) {
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
            this.context.drawImage(scene.canvas, (this.position.x - (this.canvas.width / 2 / this.scale.x)), (this.position.y - (this.canvas.height / 2 / this.scale.y)), this.canvas.width / this.scale.x, this.canvas.height / this.scale.y, 0, 0, this.canvas.width, this.canvas.height);
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
                ? Point2D_2.default.substract(Point2D_2.default.ONE, this.zoomSpeed)
                : Point2D_2.default.concat(Point2D_2.default.ONE, this.zoomSpeed);
            this.scale = Point2D_2.default.multiply(this.scale, operand);
            this.position = new Point2D_2.default(point.x - offset.x / this.scale.x, point.y - offset.y / this.scale.y);
        };
        return YaceCamera;
    }(YaceObject_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceCamera;
});
define("core/YaceScene", ["require", "exports", "core/YaceContainer"], function (require, exports, YaceContainer_2) {
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
    }(YaceContainer_2.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = YaceScene;
});
define("core/interfaces/Drawable", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("renders/ImageRenderer", ["require", "exports", "core/YaceBehavior"], function (require, exports, YaceBehavior_1) {
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
    }(YaceBehavior_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageRenderer;
});
define("utils/Box2D", ["require", "exports"], function (require, exports) {
    "use strict";
    var Box2D = (function () {
        function Box2D(lt, rb) {
            this.lt = lt;
            this.rb = rb;
        }
        return Box2D;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Box2D;
});
//# sourceMappingURL=yace.js.map