/// <reference path="../typings/index.d.ts" />
/// <reference path="../yace.d.ts" />

import YaceScene from "core/YaceScene";
import YaceObject from "core/YaceObject";
import YaceCamera from "core/YaceCamera";
import ImageRenderer from "renders/ImageRenderer";
import PolyRenderer from "renders/PolyRenderer";
import BoundsBehavior from "behaviors/BoundsBehavior";
import Point2D from "utils/Point2D";
import Box2D from "utils/Box2D";

declare let $: JQueryStatic;

export default class SimpleScene {
    constructor(selector: string) {
        // Prepare scene
        let scene = new YaceScene(1600, 1080);

        // Prepare camera
        let canvas = $(selector);
        let camera = new YaceCamera(canvas);
        camera.position = new Point2D(800, 540);
        camera.scale = new Point2D(0.5, 0.5);
        camera.dragSpeed = Point2D.ONE;
        camera.zoomSpeed = new Point2D(0.1, 0.1);
        scene.addCamera(camera);

        // Add camera bounds
        let bounds = new BoundsBehavior();
        bounds.scaleBound = new Box2D(new Point2D(0.1, 0.1), new Point2D(1.5, 1.5));
        bounds.boxBound = new Box2D(new Point2D(-100, -100), new Point2D(1700, 1180));
        bounds.boxFixRatio = true;
        camera.addBehavior(bounds);

        let poly = new YaceObject();
        let polyRenderer = new PolyRenderer([
            new Point2D(0,0),
            new Point2D(1600,0),
            new Point2D(1600,1080),
            new Point2D(0,1080)
        ]);
        polyRenderer.fillColor = "#666666";
        poly.addBehavior(polyRenderer);
        poly.position = new Point2D(0, 0);
        scene.add(poly);

        setTimeout(function() {
            // Add simple sprite
            let sprite = new YaceObject();
            sprite.addBehavior(new ImageRenderer('images/train.jpg'));
            sprite.position = new Point2D(170, 120);
            scene.add(sprite);
        }, 1000);
    }
}