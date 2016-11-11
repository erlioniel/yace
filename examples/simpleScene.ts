/**
 * Created by VladimirK on 11.06.2016.
 */
/// <reference path="../typings/index.d.ts" />
import {YaceScene} from "../src/core/YaceScene";
import {YaceObject} from "../src/core/YaceObject";

declare let $: JQueryStatic;

export class SimpleScene {
    public test(): void {
        let canvas = $('#canvas');
        let scene = new YaceScene(canvas);
        scene.add(new YaceObject());
    }
}