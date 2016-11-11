/// <reference path="../typings/index.d.ts" />
/// <reference path="../yace.d.ts" />

import {YaceScene} from "core/YaceScene";
import {YaceObject} from "core/YaceObject";
/**
 * Created by VladimirK on 11.06.2016.
 */

declare let $: JQueryStatic;

export class SimpleScene {
    public test(): void {
        let canvas = $('#canvas');
        let scene = new YaceScene(canvas);
        scene.add(new YaceObject());
    }
}