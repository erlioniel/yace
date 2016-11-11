/// <reference path="typings/index.d.ts" />
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
    export abstract class YaceObjectContainer {
        childs: YaceObject[];
        add(obj: YaceObject): void;
        remove(obj: YaceObject): void;
    }
}
declare module "core/YaceObject" {
    import { Vector3 } from "utils/Vector3";
    import { YaceObjectContainer } from "core/YaceObjectContainer";
    import { YaceBehavior } from "core/YaceBehavior";
    export class YaceObject extends YaceObjectContainer {
        behaviors: YaceBehavior[];
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
        addBehavior(behavior: YaceBehavior): void;
        removeBehavior(behavior: YaceBehavior): void;
    }
}
declare module "core/YaceBehavior" {
    import { YaceObject } from "core/YaceObject";
    export abstract class YaceBehavior {
        object: YaceObject;
        onEnable(): void;
        onUpdate(): void;
        onDisable(): void;
    }
}
declare module "core/YaceScene" {
    import { YaceObjectContainer } from "core/YaceObjectContainer";
    export class YaceScene extends YaceObjectContainer {
        private canvas;
        constructor(canvas: JQuery);
    }
}
declare module "renders/SpriteRender" {
    import { YaceBehavior } from "core/YaceBehavior";
    export class SpriteRender extends YaceBehavior {
    }
}
