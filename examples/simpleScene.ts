/// <reference path="../typings/index.d.ts" />
/// <reference path="../yace.d.ts" />

import {YaceScene} from "core/YaceScene";
import {YaceObject} from "core/YaceObject";
import {ImageRenderer} from "renders/ImageRenderer";

declare let $: JQueryStatic;

export class SimpleScene {
    public test(): void {
        let canvas = $('#canvas');
        let scene = new YaceScene(<HTMLCanvasElement>canvas.get(0));
        let sprite = new YaceObject();
        sprite.addBehavior(new ImageRenderer('images/train.jpg'));
        scene.add(sprite);
    }
}