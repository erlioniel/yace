/// <reference path="../../typings/index.d.ts" />
import YaceObject from "./YaceObject";
import YaceScene from "./YaceScene";

export default class YaceCamera extends YaceObject {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    public draw(scene: YaceScene, context: CanvasRenderingContext2D): void {

        context.fillStyle = "#9ea7b8";
        context.fillRect(0, 0, scene.canvas.width, scene.canvas.height);

        for (let child of scene.childs) {
            child.draw(scene, context);
        }

        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, scene.canvas.width, scene.canvas.height);

        this.context.drawImage(
            scene.canvas,

            // Crop
            (this.position.x - (this.canvas.width / 2 / this.scale.x)),
            (this.position.y - (this.canvas.height / 2 / this.scale.y)),

            this.canvas.width / this.scale.x,
            this.canvas.height / this.scale.y,

            // Offset
            0,
            0,

            // Scale
            this.canvas.width,
            this.canvas.height
        );
    }
}