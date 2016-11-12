/// <reference path="../../typings/index.d.ts" />
import YaceObject from "./YaceObject";
import YaceScene from "./YaceScene";
import Point2D from "../utils/Point2D";
import Boxed from "./interfaces/Boxed";
import Box2D from "../utils/Box2D";

export default class YaceCamera extends YaceObject implements Boxed {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public backgroundColor: string | CanvasGradient | CanvasPattern = null

    public dragSpeed: Point2D = Point2D.ZERO;
    public zoomSpeed: Point2D = Point2D.ZERO;

    private mousePoint: Point2D;
    private cameraPoint: Point2D;

    constructor(canvas: JQuery) {
        super();

        this.canvas = canvas.get(0) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        // Bind camera control
        canvas
            .bind("mousedown", this.dragStart.bind(this))
            .bind("mouseup mouseleave", this.dragEnd.bind(this))
            .bind("mousemove", this.dragEvent.bind(this))
            .bind("wheel", this.zoomEvent.bind(this));
    }

    public draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean {
        this.dirty = false;

        if(this.backgroundColor == null) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        let box = this.box();
        console.log("CAMERA DRAW CALL");
        this.context.drawImage(
            scene.canvas,

            // Crop
            box.min.x,
            box.min.y,
            box.max.x - box.min.x,
            box.max.y - box.min.y,

            // Offset
            0, 0,

            // Scale
            this.canvas.width,
            this.canvas.height
        );

        return true;
    }

    public box(): Box2D {
        let min = new Point2D(
            (this.position.x - (this.canvas.width / 2 / this.scale.x)),
            (this.position.y - (this.canvas.height / 2 / this.scale.y))
        );
        let max = new Point2D(
            min.x + this.canvas.width / this.scale.x,
            min.y + this.canvas.height / this.scale.y
        );
        return new Box2D(min, max);
    }

    private dragStart(event) {
        this.mousePoint = new Point2D(event.pageX, event.pageY);
        this.cameraPoint = new Point2D(this.position.x, this.position.y);
    }

    private dragEnd() {
        this.mousePoint = this.cameraPoint = null;
    }

    private dragEvent(event) {
        if(Point2D.equals(Point2D.ZERO, this.dragSpeed)) {
            return;
        }

        if (this.mousePoint == null) {
            return;
        }

        this.dirty = true;

        this.position = new Point2D(
            this.cameraPoint.x - (event.pageX - this.mousePoint.x) * this.dragSpeed.x / this.scale.x,
            this.cameraPoint.y - (event.pageY - this.mousePoint.y) * this.dragSpeed.y / this.scale.y
        );
    }

    private zoomEvent (event) {
        if(Point2D.equals(Point2D.ZERO, this.zoomSpeed)) {
            return;
        }

        this.dirty = true;

        // Save current focus
        let offset = new Point2D(
            event.originalEvent["offsetX"] - this.canvas.width / 2,
            event.originalEvent["offsetY"] - this.canvas.height / 2
        );
        let point = new Point2D(
            this.position.x + offset.x / this.scale.x,
            this.position.y + offset.y / this.scale.y
        );

        // Scale
        let operand = event.originalEvent["deltaY"] < 0
            ? Point2D.subtract(Point2D.ONE, this.zoomSpeed)
            : Point2D.concat(Point2D.ONE, this.zoomSpeed);
        this.scale = Point2D.multiply(this.scale, operand);

        // Offset camera
        this.position = new Point2D(
            point.x - offset.x / this.scale.x,
            point.y - offset.y / this.scale.y
        );
    }
}