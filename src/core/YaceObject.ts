import YaceContainer from "./YaceContainer";
import YaceBehavior from "./YaceBehavior";
import Drawable from "./interfaces/Drawable";
import Point2D from "../utils/Point2D";
import YaceScene from "./YaceScene";

export default class YaceObject extends YaceContainer implements Drawable {

    public behaviors: YaceBehavior[] = [];

    public position: Point2D = new Point2D(0, 0);
    public scale: Point2D = new Point2D(1, 1);

    public dirty: boolean = true;

    public addBehavior(behavior: YaceBehavior): YaceObject {
        this.behaviors.push(behavior);
        behavior.object = this;
        return this;
    }

    public removeBehavior(behavior: YaceBehavior): YaceObject {
        behavior.object = null;
        let start = this.behaviors.indexOf(behavior);
        if (start >= 0) {
            this.behaviors.splice(start, 1);
        }
        return this;
    }

    onUpdate(): void {
        super.onUpdate();
        for (let behavior of this.behaviors) {
            behavior.onUpdate();
        }
    }

    public draw(scene: YaceScene, context: CanvasRenderingContext2D): void {
        this.dirty = false;

        for (let child of this.childs) {
            if(child.isDirty()) {
                child.draw(scene, context);
            }
        }

        for (let behavior of this.behaviors) {
            let drawable = behavior as any as Drawable;
            if(typeof(drawable.draw) === "undefined") {
                continue;
            }

            if(drawable.isDirty()) {
                drawable.draw(scene, context);
            }
        }
    }

    public isDirty(): boolean {
        if(this.dirty) {
            return true;
        }

        for (let child of this.childs) {
            if(child.isDirty()) {
                return true;
            }
        }

        for (let behavior of this.behaviors) {
            let drawable = behavior as any as Drawable;
            if(typeof(drawable.isDirty) !== "undefined" && drawable.isDirty()) {
                return true;
            }
        }
    }
}