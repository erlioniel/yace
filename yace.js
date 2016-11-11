var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("utils/Vector3", ["require", "exports"], function (require, exports) {
    "use strict";
    var Vector3 = (function () {
        function Vector3(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector3.concat = function (v1, v2) {
            return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        };
        Vector3.substract = function (v1, v2) {
            return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        };
        Vector3.multiply = function (v1, v2) {
            return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
        };
        Vector3.divide = function (v1, v2) {
            return new Vector3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
        };
        return Vector3;
    }());
    exports.Vector3 = Vector3;
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
        return YaceObjectContainer;
    }());
    exports.YaceObjectContainer = YaceObjectContainer;
});
define("core/YaceObject", ["require", "exports", "utils/Vector3", "core/YaceObjectContainer"], function (require, exports, Vector3_1, YaceObjectContainer_1) {
    "use strict";
    var YaceObject = (function (_super) {
        __extends(YaceObject, _super);
        function YaceObject() {
            _super.apply(this, arguments);
            this.behaviors = [];
            this.position = new Vector3_1.Vector3(0, 0, 0);
            this.rotation = new Vector3_1.Vector3(0, 0, 0);
            this.scale = new Vector3_1.Vector3(1, 1, 1);
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
        }
        return YaceScene;
    }(YaceObjectContainer_2.YaceObjectContainer));
    exports.YaceScene = YaceScene;
});
define("renders/SpriteRender", ["require", "exports", "core/YaceBehavior"], function (require, exports, YaceBehavior_1) {
    "use strict";
    var SpriteRender = (function (_super) {
        __extends(SpriteRender, _super);
        function SpriteRender() {
            _super.apply(this, arguments);
        }
        return SpriteRender;
    }(YaceBehavior_1.YaceBehavior));
    exports.SpriteRender = SpriteRender;
});
//# sourceMappingURL=yace.js.map