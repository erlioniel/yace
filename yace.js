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
        Point2D.invert = function (v1) {
            return new Point2D(v1.y, v1.x);
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
            this.backgroundColor = null;
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
            this.dirty = false;
            if (this.backgroundColor == null) {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            else {
                this.context.fillStyle = this.backgroundColor;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
            var box = this.box();
            console.log("CAMERA DRAW CALL");
            this.context.drawImage(scene.canvas, box.min.x, box.min.y, box.max.x - box.min.x, box.max.y - box.min.y, 0, 0, this.canvas.width, this.canvas.height);
            return true;
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
            this.dirty = true;
            this.position = new Point2D_2.default(this.cameraPoint.x - (event.pageX - this.mousePoint.x) * this.dragSpeed.x / this.scale.x, this.cameraPoint.y - (event.pageY - this.mousePoint.y) * this.dragSpeed.y / this.scale.y);
        };
        YaceCamera.prototype.zoomEvent = function (event) {
            if (Point2D_2.default.equals(Point2D_2.default.ZERO, this.zoomSpeed)) {
                return;
            }
            this.dirty = true;
            event.preventDefault();
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
            var drawn = false;
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.isDirty()) {
                    drawn = child.draw(this, this.context) || drawn;
                }
            }
            for (var _b = 0, _c = this.cameras; _b < _c.length; _b++) {
                var camera = _c[_b];
                camera.onUpdate();
                if (camera.isDirty() || drawn) {
                    camera.draw(this, this.context);
                }
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
            this.dirty = true;
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
            this.dirty = false;
            var drawn = false;
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.isDirty()) {
                    drawn = child.draw(scene, context) || drawn;
                }
            }
            for (var _b = 0, _c = this.behaviors; _b < _c.length; _b++) {
                var behavior = _c[_b];
                var drawable = behavior;
                if (typeof (drawable.draw) === "undefined") {
                    continue;
                }
                if (drawable.isDirty()) {
                    drawn = drawable.draw(scene, context) || drawn;
                }
            }
            return drawn;
        };
        YaceObject.prototype.isDirty = function () {
            if (this.dirty) {
                return true;
            }
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.isDirty()) {
                    return true;
                }
            }
            for (var _b = 0, _c = this.behaviors; _b < _c.length; _b++) {
                var behavior = _c[_b];
                var drawable = behavior;
                if (typeof (drawable.isDirty) !== "undefined" && drawable.isDirty()) {
                    return true;
                }
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
                    var scale = Point2D_4.default.multiply(this.object.scale, new Point2D_4.default(Math.max(1, box.width() / this.boxBound.width()), Math.max(1, box.height() / this.boxBound.height())));
                    this.object.scale = Point2D_4.default.max(scale, Point2D_4.default.invert(scale));
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
        function ImageRenderer(image) {
            _super.call(this);
            this.image = image;
            this.dirty = true;
        }
        ImageRenderer.prototype.draw = function (scene, context) {
            this.dirty = false;
            context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.object.position.x * this.object.scale.x, this.object.position.y * this.object.scale.y, this.image.width * this.object.scale.x, this.image.height * this.object.scale.y);
            return true;
        };
        ImageRenderer.prototype.isDirty = function () {
            return this.dirty;
        };
        return ImageRenderer;
    }(YaceBehavior_2.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageRenderer;
});
define("renders/PolyRenderer", ["require", "exports", "core/YaceBehavior", "utils/Point2D"], function (require, exports, YaceBehavior_3, Point2D_5) {
    "use strict";
    var PolyRenderer = (function (_super) {
        __extends(PolyRenderer, _super);
        function PolyRenderer(points) {
            _super.call(this);
            this.dirty = true;
            this.points = [];
            this.strokeSize = 1;
            this.points = points;
        }
        PolyRenderer.prototype.draw = function (scene, context) {
            this.dirty = false;
            console.log("POLY DRAW CALL");
            context.beginPath();
            var offset = new Point2D_5.default(this.object.position.x * this.object.scale.x, this.object.position.y * this.object.scale.y);
            var first = true;
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var point = _a[_i];
                var targetPoint = new Point2D_5.default(offset.x + point.x * this.object.scale.x, offset.y + point.y * this.object.scale.y);
                if (first) {
                    first = false;
                    context.moveTo(targetPoint.x, targetPoint.y);
                }
                else {
                    context.lineTo(targetPoint.x, targetPoint.y);
                }
            }
            context.closePath();
            if (this.strokeColor != null) {
                context.lineWidth = this.strokeSize;
                context.strokeStyle = this.strokeColor;
                context.stroke();
            }
            if (this.fillColor != null) {
                context.fillStyle = this.fillColor;
                context.fill();
            }
            return true;
        };
        PolyRenderer.prototype.isDirty = function () {
            return this.dirty;
        };
        return PolyRenderer;
    }(YaceBehavior_3.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PolyRenderer;
});
define("utils/TileSet", ["require", "exports", "utils/Point2D", "utils/Box2D"], function (require, exports, Point2D_6, Box2D_3) {
    "use strict";
    var TileSet = (function () {
        function TileSet(image) {
            this.tiles = [];
            this.image = image;
        }
        TileSet.prototype.tile = function (idx) {
            return this.tiles[idx];
        };
        TileSet.simpleGrid = function (image, grid) {
            var tileSet = new TileSet(image);
            for (var k = 0; k + 1 < Math.floor(tileSet.image.height / grid.y); k++) {
                for (var i = 0; i + 1 < Math.floor(tileSet.image.width / grid.x); i++) {
                    tileSet.tiles.push(new Box2D_3.default(new Point2D_6.default(i * grid.x, k * grid.y), new Point2D_6.default((i + 1) * grid.x, (k + 1) * grid.y)));
                }
            }
            return tileSet;
        };
        return TileSet;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TileSet;
});
define("renders/TileRenderer", ["require", "exports", "core/YaceBehavior"], function (require, exports, YaceBehavior_4) {
    "use strict";
    var TileRenderer = (function (_super) {
        __extends(TileRenderer, _super);
        function TileRenderer(tileSet) {
            _super.call(this);
            this.active = 0;
            this.tileSet = tileSet;
            this.dirty = true;
        }
        TileRenderer.prototype.activate = function (active) {
            this.active = active;
        };
        TileRenderer.prototype.draw = function (scene, context) {
            this.dirty = false;
            context.drawImage(this.tileSet.image, this.tileSet.tile(this.active).min.x, this.tileSet.tile(this.active).min.y, this.tileSet.tile(this.active).width(), this.tileSet.tile(this.active).height(), this.object.position.x * this.object.scale.x, this.object.position.y * this.object.scale.y, this.tileSet.tile(this.active).width() * this.object.scale.x, this.tileSet.tile(this.active).height() * this.object.scale.y);
            return true;
        };
        TileRenderer.prototype.isDirty = function () {
            return this.dirty;
        };
        return TileRenderer;
    }(YaceBehavior_4.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TileRenderer;
});
define("utils/ImageUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    var ImageUtils = (function () {
        function ImageUtils() {
        }
        ImageUtils.load = function (url, callback) {
            var image = new Image();
            image.src = url;
            image.onload = function () {
                callback(image);
            }.bind(this);
        };
        return ImageUtils;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageUtils;
});
//# sourceMappingURL=yace.js.map