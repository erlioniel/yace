define(["require", "exports"], function (require, exports) {
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
//# sourceMappingURL=ImageUtils.js.map