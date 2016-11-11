/// <reference path="typings/index.d.ts" />
declare module "core/interfaces/LifeCycle" {
    export interface LifeCycle {
        onUpdate(): void;
    }
}
declare module "core/YaceBehavior" {
    import { YaceObject } from "core/YaceObject";
    import { LifeCycle } from "core/interfaces/LifeCycle";
    export abstract class YaceBehavior implements LifeCycle {
        object: YaceObject;
        onUpdate(): void;
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
    import { YaceContainer } from "core/YaceContainer";
    import { YaceBehavior } from "core/YaceBehavior";
    import { Drawable } from "core/interfaces/Drawable";
    import { Point2D } from "utils/Point2D";
    import { YaceScene } from "core/YaceScene";
    export class YaceObject extends YaceContainer implements Drawable {
        behaviors: YaceBehavior[];
        position: Point2D;
        rotation: Point2D;
        scale: Point2D;
        addBehavior(behavior: YaceBehavior): void;
        removeBehavior(behavior: YaceBehavior): void;
        onUpdate(): void;
        draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
    }
}
declare module "core/YaceContainer" {
    import { YaceObject } from "core/YaceObject";
    import { LifeCycle } from "core/interfaces/LifeCycle";
    export abstract class YaceContainer implements LifeCycle {
        childs: YaceObject[];
        add(obj: YaceObject): void;
        remove(obj: YaceObject): void;
        onUpdate(): void;
    }
}
declare module "core/YaceCamera" {
    import { YaceObject } from "core/YaceObject";
    import { YaceScene } from "core/YaceScene";
    export class YaceCamera extends YaceObject {
        private canvas;
        private context;
        constructor(canvas: HTMLCanvasElement);
        draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
    }
}
declare module "core/YaceScene" {
    import { YaceContainer } from "core/YaceContainer";
    import { YaceCamera } from "core/YaceCamera";
    export class YaceScene extends YaceContainer {
        private canvas;
        private context;
        private cameras;
        constructor(width: number, height: number);
        onUpdate(): void;
        addCamera(camera: YaceCamera): void;
        removeCamera(camera: YaceCamera): void;
    }
}
declare module "core/interfaces/Drawable" {
    import { YaceScene } from "core/YaceScene";
    export interface Drawable {
        draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
    }
}
declare module "renders/ImageRenderer" {
    import { YaceBehavior } from "core/YaceBehavior";
    import { Drawable } from "core/interfaces/Drawable";
    import { YaceScene } from "core/YaceScene";
    export class ImageRenderer extends YaceBehavior implements Drawable {
        private image;
        private width;
        private height;
        constructor(url: string);
        draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
    }
}
declare module "utils/Box2D" {
    import { Point2D } from "utils/Point2D";
    export class Box2D {
        lt: Point2D;
        rb: Point2D;
        constructor(lt: Point2D, rb: Point2D);
    }
}
