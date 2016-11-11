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
declare module "utils/Vector3" {
    export class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x: number, y: number, z: number);
        static concat(v1: Vector3, v2: Vector3): Vector3;
        static substract(v1: Vector3, v2: Vector3): Vector3;
        static multiply(v1: Vector3, v2: Vector3): Vector3;
        static divide(v1: Vector3, v2: Vector3): Vector3;
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
declare module "core/YaceObject" {
    import { Vector3 } from "utils/Vector3";
    import { YaceObjectContainer } from "core/YaceObjectContainer";
    import { YaceBehavior } from "core/YaceBehavior";
    import { Drawable } from "core/interfaces/Drawable";
    export class YaceObject extends YaceObjectContainer implements Drawable {
        behaviors: YaceBehavior[];
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
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
        onUpdate(): void;
        draw(context: CanvasRenderingContext2D): void;
    }
}
