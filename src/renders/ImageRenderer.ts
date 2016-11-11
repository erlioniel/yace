import {YaceBehavior} from "../core/YaceBehavior";
import {Drawable} from "../core/interfaces/Drawable";

export class ImageRenderer extends YaceBehavior implements Drawable {
    private image: HTMLImageElement;
    private width: number;
    private height: number;

    constructor(url: string) {
        super();
        let that = this;
        this.image = new Image();
        this.image.src = url;
        this.image.onload = function () {
            that.width = that.width || this.width;
            that.height = that.height || this.height;
        };
    }

    draw(context: CanvasRenderingContext2D): void {
        context.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            this.object.position.x * this.object.scale.x,
            this.object.position.y * this.object.scale.y,
            this.width * this.object.scale.x,
            this.height * this.object.scale.y
        );
    }
}