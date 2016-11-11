/// <reference path="../../typings/index.d.ts" />

import {YaceObjectContainer} from "./YaceObjectContainer";
import {Drawable} from "./interfaces/Drawable";

export class YaceScene extends YaceObjectContainer implements Drawable {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        setInterval(function () {
            this.draw(this.context);
            this.onUpdate();
        }.bind(this), 1000);
    }

    draw(context: CanvasRenderingContext2D): void {
        for (let child of this.childs) {
            child.draw(context);
        }
    }
}