import YaceBehavior from "../core/YaceBehavior";
import Drawable from "../core/interfaces/Drawable";
import YaceScene from "../core/YaceScene";

export default class ImageRenderer extends YaceBehavior implements Drawable {
    private image: HTMLImageElement;

    constructor(url: string) {
        super();
        this.image = new Image();
        this.image.src = url;
        this.image.onload = function () {
            // ToDo Mark as dirty?
        };
    }

    draw(scene: YaceScene, context: CanvasRenderingContext2D): void {
        context.drawImage(
            this.image,

            // Crop
            0,
            0,
            this.image.width,
            this.image.height,

            // Offset
            this.object.position.x * this.object.scale.x,
            this.object.position.y * this.object.scale.y,

            // Scale
            this.image.width * this.object.scale.x,
            this.image.height * this.object.scale.y
        );
    }
}