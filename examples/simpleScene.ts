/// <reference path="../typings/index.d.ts" />
/// <reference path="../yace.d.ts" />

import YaceScene from "core/YaceScene";
import YaceObject from "core/YaceObject";
import ImageRenderer from "renders/ImageRenderer";
import Point2D from "utils/Point2D";
import YaceCamera from "core/YaceCamera";

declare let $: JQueryStatic;

export default class SimpleScene {
    public test(): void {
        // Prepare scene
        let scene = new YaceScene(1000, 1000);

        // Prepare camera
        let canvas = $('#canvas');
        let camera = new YaceCamera(<HTMLCanvasElement>canvas.get(0));
        scene.addCamera(camera);

        // Add simple sprite
        let sprite = new YaceObject();
        sprite.addBehavior(new ImageRenderer('images/train.jpg'));
        sprite.scale = new Point2D(0.5, 0.5);
        scene.add(sprite);

        scene.onUpdate();
    }
}