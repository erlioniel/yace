/// <reference path="../../typings/index.d.ts" />

import {YaceObjectContainer} from "./YaceObjectContainer";
/**
 * Created by VladimirK on 27.05.2016.
 */
export class YaceScene extends YaceObjectContainer {

    private canvas: JQuery;

    constructor(canvas: JQuery) {
        super();

        this.canvas = canvas;
    }
}