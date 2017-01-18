/// <reference path="../typings/index.d.ts" />
/// <reference path="../yace.d.ts" />

import YaceScene from "core/YaceScene";
import YaceCamera from "core/YaceCamera";
import BoundsBehavior from "behaviors/BoundsBehavior";
import Point2D from "utils/Point2D";
import Box2D from "utils/Box2D";
import TileSet from "utils/TileSet";
import YaceObject from "core/YaceObject";
import TileRenderer from "renders/TileRenderer";
import ImageUtils from "../src/utils/ImageUtils";

declare let $: JQueryStatic;

export default class SimpleScene {



    constructor(selector: string) {
        // Prepare scene
        let scene = new YaceScene(2000, 2000);

        // Prepare camera
        let canvas = $(selector);
        let camera = new YaceCamera(canvas);
        camera.dragSpeed = Point2D.ONE;
        camera.zoomSpeed = new Point2D(0.1, 0.1);
        scene.addCamera(camera);

        // Add camera bounds
        let bounds = new BoundsBehavior();
        bounds.scaleBound = new Box2D(new Point2D(0.1, 0.1), new Point2D(1.5, 1.5));
        bounds.boxBound = new Box2D(new Point2D(0, 0), new Point2D(2000, 2000));
        bounds.boxFixRatio = true;
        camera.addBehavior(bounds);

        ImageUtils.load('images/tiles.png', (image) => {
            let tileset = TileSet.simpleGrid(image, new Point2D(32, 32));
            let poly = new YaceObject();
            let tileRenderer = new TileRenderer(tileset);
            tileRenderer.activate(4);
            poly.addBehavior(tileRenderer);
            poly.position = new Point2D(0, 0);
            scene.add(poly);
        });

    }
}