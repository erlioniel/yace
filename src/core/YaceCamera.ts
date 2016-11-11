/// <reference path="../../typings/index.d.ts" />
import {YaceObject} from "./YaceObject";
import {YaceScene} from "./YaceScene";

export class YaceCamera extends YaceObject {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    public draw(scene: YaceScene, context: CanvasRenderingContext2D): void {
        console.log("Draw?");
        // ToDo Get camera settings?
        for (let child of scene.childs) {
            child.draw(scene, this.context);
        }
    }
}