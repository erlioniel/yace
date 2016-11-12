import YaceBehavior from "../core/YaceBehavior";
import Drawable from "../core/interfaces/Drawable";
import YaceScene from "../core/YaceScene";
import Point2D from "../utils/Point2D";

export default class PolyRenderer extends YaceBehavior implements Drawable {
    public dirty: boolean = true;
    public points: Point2D[] = [];
    public fillColor: string | CanvasGradient | CanvasPattern;
    public strokeColor: string | CanvasGradient | CanvasPattern;
    public strokeSize: number = 1;

    constructor(points: Point2D[]) {
        super();

        this.points = points;
    }

    draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean {
        this.dirty = false;
        console.log("POLY DRAW CALL");
        context.beginPath();

        let offset = new Point2D(
            this.object.position.x * this.object.scale.x,
            this.object.position.y * this.object.scale.y
        );
        let first = true;
        for (let point of this.points) {
            let targetPoint = new Point2D(
                offset.x + point.x * this.object.scale.x,
                offset.y + point.y * this.object.scale.y
            );

            if(first) {
                first = false;
                context.moveTo(targetPoint.x, targetPoint.y);
            } else {
                context.lineTo(targetPoint.x, targetPoint.y);
            }
        }

        context.closePath();
        // ToDo

        if(this.strokeColor != null) {
            context.lineWidth = this.strokeSize;
            context.strokeStyle = this.strokeColor;
            context.stroke();
        }

        if(this.fillColor != null) {
            context.fillStyle = this.fillColor;
            context.fill();
        }

        return true;
    }

    public isDirty(): boolean {
        return this.dirty;
    }
}