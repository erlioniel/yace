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
        let scene = new YaceScene(1600, 1080);

        // Prepare camera
        let canvas = $('#canvas');
        let camera = new YaceCamera(<HTMLCanvasElement>canvas.get(0));
        camera.scale = new Point2D(0.5, 0.5);
        scene.addCamera(camera);

        // Add simple sprite
        let sprite = new YaceObject();
        sprite.addBehavior(new ImageRenderer('images/train.jpg'));
        sprite.position = new Point2D(170, 120);
        // sprite.scale = new Point2D(0.5, 0.5);
        scene.add(sprite);

        scene.onUpdate();

        let mouse_point, camera_point;

        // Bind camera control
        canvas
            .bind("mousedown", function(event) {
                mouse_point = new Point2D(event.pageX, event.pageY);
                camera_point = new Point2D(camera.position.x, camera.position.y);
            })
            .bind("mouseup mouseleave", function () {
                mouse_point = camera_point = null;
            })
            .bind("mousemove", function (event) {
                if(mouse_point != null) {
                    let newX = camera_point.x - (event.pageX - mouse_point.x) / camera.scale.x;
                    let newY = camera_point.y - (event.pageY - mouse_point.y) / camera.scale.y;
                    camera.position = new Point2D(newX, newY);
                }
            });
    }
}