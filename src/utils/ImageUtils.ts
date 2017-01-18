export default class ImageUtils {
    public static load(url : string, callback: (HTMLImageElement) => void) : void {
        let image = new Image();
        image.src = url;
        image.onload = function () {
            callback(image);
        }.bind(this);
    }
}