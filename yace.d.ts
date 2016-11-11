/// <reference path="typings/index.d.ts" />
declare module "core/interfaces/Drawable" {
    export interface Drawable {
        draw(context: CanvasRenderingContext2D): void;
    }
}
declare module "core/interfaces/LifeCycle" {
    export interface LifeCycle {
        onEnable(): void;
        onUpdate(): void;
        onDisable(): void;
    }
}
declare module "core/YaceObjectContainer" {
    import { YaceObject } from "core/YaceObject";
    import { LifeCycle } from "core/interfaces/LifeCycle";
    export abstract class YaceObjectContainer implements LifeCycle {
        protected childs: YaceObject[];
        add(obj: YaceObject): void;
        remove(obj: YaceObject): void;
        onEnable(): void;
        onUpdate(): void;
        onDisable(): void;
    }
}
declare module "utils/Point2D" {
    export class Point2D {
        x: number;
        y: number;
        constructor(x: number, y: number);
        static concat(v1: Point2D, v2: Point2D): Point2D;
        static substract(v1: Point2D, v2: Point2D): Point2D;
        static multiply(v1: Point2D, v2: Point2D): Point2D;
        static divide(v1: Point2D, v2: Point2D): Point2D;
    }
}
declare module "core/YaceObject" {
    import { YaceObjectContainer } from "core/YaceObjectContainer";
    import { YaceBehavior } from "core/YaceBehavior";
    import { Drawable } from "core/interfaces/Drawable";
    import { Point2D } from "utils/Point2D";
    export class YaceObject extends YaceObjectContainer implements Drawable {
        behaviors: YaceBehavior[];
        position: Point2D;
        rotation: Point2D;
        scale: Point2D;
        addBehavior(behavior: YaceBehavior): void;
        removeBehavior(behavior: YaceBehavior): void;
        onEnable(): void;
        onUpdate(): void;
        onDisable(): void;
        draw(context: CanvasRenderingContext2D): void;
    }
}
declare module "core/YaceBehavior" {
    import { YaceObject } from "core/YaceObject";
    import { LifeCycle } from "core/interfaces/LifeCycle";
    export abstract class YaceBehavior implements LifeCycle {
        object: YaceObject;
        onEnable(): void;
        onUpdate(): void;
        onDisable(): void;
    }
}
declare module "core/YaceScene" {
    import { YaceObjectContainer } from "core/YaceObjectContainer";
    import { Drawable } from "core/interfaces/Drawable";
    export class YaceScene extends YaceObjectContainer implements Drawable {
        private canvas;
        private context;
        constructor(canvas: HTMLCanvasElement);
        draw(context: CanvasRenderingContext2D): void;
    }
}
declare module "renders/ImageRenderer" {
    import { YaceBehavior } from "core/YaceBehavior";
    import { Drawable } from "core/interfaces/Drawable";
    export class ImageRenderer extends YaceBehavior implements Drawable {
        private image;
        private width;
        private height;
        constructor(url: string);
        draw(context: CanvasRenderingContext2D): void;
    }
}
