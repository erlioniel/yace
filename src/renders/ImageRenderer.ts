import YaceBehavior from "../core/YaceBehavior";
import Drawable from "../core/interfaces/Drawable";
import YaceScene from "../core/YaceScene";

export default class ImageRenderer extends YaceBehavior implements Drawable {
    public image: HTMLImageElement;
    public dirty: boolean;

    constructor(image: HTMLImageElement) {
        super();
        this.image = image;
        this.dirty = true;
    }

    draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean {
        this.dirty = false;
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

        return true;
    }

    public isDirty(): boolean {
        return this.dirty;
    }
}