/// <reference path="../../typings/index.d.ts" />
import YaceContainer from "./YaceContainer";
import YaceCamera from "./YaceCamera";

export default class YaceScene extends YaceContainer {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private cameras: YaceCamera[] = [];

    constructor(width: number, height: number) {
        super();

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");

        setInterval(this.onUpdate.bind(this), 1000);
    }

    public onUpdate() {
        super.onUpdate();

        for (let camera of this.cameras) {
            camera.draw(this, this.context);
        }
    }

    public addCamera(camera: YaceCamera): void {
        this.cameras.push(camera);
    }

    public removeCamera(camera: YaceCamera): void {
        let start = this.cameras.indexOf(camera);
        if (start >= 0) {
            this.cameras.splice(start, 1);
        }
    }
}