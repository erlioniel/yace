/// <reference path="typings/index.d.ts" />
declare module "core/interfaces/LifeCycle" {
    interface LifeCycle {
        onUpdate(): void;
    }
    export default LifeCycle;
}
declare module "core/YaceContainer" {
    import YaceObject from "core/YaceObject";
    import LifeCycle from "core/interfaces/LifeCycle";
    abstract class YaceContainer implements LifeCycle {
        childs: YaceObject[];
        add(obj: YaceObject): YaceContainer;
        remove(obj: YaceObject): YaceContainer;
        onUpdate(): void;
    }
    export default YaceContainer;
}
declare module "utils/Point2D" {
    export default class Point2D {
        static ONE: Point2D;
        static ZERO: Point2D;
        x: number;
        y: number;
        constructor(x: number, y: number);
        static concat(v1: Point2D, v2: Point2D): Point2D;
        static subtract(v1: Point2D, v2: Point2D): Point2D;
        static multiply(v1: Point2D, v2: Point2D): Point2D;
        static divide(v1: Point2D, v2: Point2D): Point2D;
        static max(v1: Point2D, v2: Point2D): Point2D;
        static min(v1: Point2D, v2: Point2D): Point2D;
        static invert(v1: Point2D): Point2D;
        static equals(v1: Point2D, v2: Point2D): boolean;
    }
}
declare module "utils/Box2D" {
    import Point2D from "utils/Point2D";
    export default class Box2D {
        min: Point2D;
        max: Point2D;
        constructor(min: Point2D, max: Point2D);
        width(): number;
        height(): number;
        static bound(bounds: Box2D, point: Point2D): Point2D;
    }
}
declare module "core/interfaces/Boxed" {
    import Box2D from "utils/Box2D";
    interface Boxed {
        box(): Box2D;
    }
    export default Boxed;
}
declare module "core/YaceCamera" {
    import YaceObject from "core/YaceObject";
    import YaceScene from "core/YaceScene";
    import Point2D from "utils/Point2D";
    import Boxed from "core/interfaces/Boxed";
    import Box2D from "utils/Box2D";
    export default class YaceCamera extends YaceObject implements Boxed {
        private canvas;
        private context;
        dragSpeed: Point2D;
        zoomSpeed: Point2D;
        private mousePoint;
        private cameraPoint;
        constructor(canvas: JQuery);
        draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
        box(): Box2D;
        private dragStart(event);
        private dragEnd();
        private dragEvent(event);
        private zoomEvent(event);
    }
}
declare module "core/YaceScene" {
    import YaceContainer from "core/YaceContainer";
    import YaceCamera from "core/YaceCamera";
    export default class YaceScene extends YaceContainer {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        cameras: YaceCamera[];
        constructor(width: number, height: number);
        onUpdate(): void;
        addCamera(camera: YaceCamera): void;
        removeCamera(camera: YaceCamera): void;
    }
}
declare module "core/interfaces/Drawable" {
    import YaceScene from "core/YaceScene";
    interface Drawable {
        draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
        isDirty(): boolean;
    }
    export default Drawable;
}
declare module "core/YaceObject" {
    import YaceContainer from "core/YaceContainer";
    import YaceBehavior from "core/YaceBehavior";
    import Drawable from "core/interfaces/Drawable";
    import Point2D from "utils/Point2D";
    import YaceScene from "core/YaceScene";
    export default class YaceObject extends YaceContainer implements Drawable {
        behaviors: YaceBehavior[];
        position: Point2D;
        scale: Point2D;
        dirty: boolean;
        addBehavior(behavior: YaceBehavior): YaceObject;
        removeBehavior(behavior: YaceBehavior): YaceObject;
        onUpdate(): void;
        draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
        isDirty(): boolean;
    }
}
declare module "core/YaceBehavior" {
    import YaceObject from "core/YaceObject";
    import LifeCycle from "core/interfaces/LifeCycle";
    abstract class YaceBehavior implements LifeCycle {
        object: YaceObject;
        onUpdate(): void;
    }
    export default YaceBehavior;
}
declare module "behaviors/BoundsBehavior" {
    import YaceBehavior from "core/YaceBehavior";
    import Box2D from "utils/Box2D";
    export default class BoundsBehavior extends YaceBehavior {
        positionBound: Box2D;
        scaleBound: Box2D;
        boxBound: Box2D;
        boxFixRatio: boolean;
        onUpdate(): void;
    }
}
declare module "renders/ImageRenderer" {
    import YaceBehavior from "core/YaceBehavior";
    import Drawable from "core/interfaces/Drawable";
    import YaceScene from "core/YaceScene";
    export default class ImageRenderer extends YaceBehavior implements Drawable {
        image: HTMLImageElement;
        dirty: boolean;
        constructor(url: string);
        draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
        isDirty(): boolean;
    }
}
declare module "renders/PolyRenderer" {
    import YaceBehavior from "core/YaceBehavior";
    import Drawable from "core/interfaces/Drawable";
    import YaceScene from "core/YaceScene";
    import Point2D from "utils/Point2D";
    export default class PolyRenderer extends YaceBehavior implements Drawable {
        dirty: boolean;
        points: Point2D[];
        fillColor: string | CanvasGradient | CanvasPattern;
        strokeColor: string | CanvasGradient | CanvasPattern;
        strokeSize: number;
        constructor(points: Point2D[]);
        draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
        isDirty(): boolean;
    }
}
