/// <reference path="../../typings/index.d.ts" />
import YaceContainer from "./YaceContainer";
import YaceCamera from "./YaceCamera";

export default class YaceScene extends YaceContainer {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    public cameras: YaceCamera[] = [];

    constructor(width: number, height: number) {
        super();

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");

        setInterval(this.onUpdate.bind(this), 30);
    }

    public onUpdate() {
        super.onUpdate();
        let drawn = false;

        for (let child of this.childs) {
            if(child.isDirty()) {
                drawn = child.draw(this, this.context) || drawn;
            }
        }

        // ToDo Separate update and draw logic
        // ToDo Add deltaTime
        for (let camera of this.cameras) {
            camera.onUpdate();

            if(camera.isDirty() || drawn) {
                camera.draw(this, this.context);
            }
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