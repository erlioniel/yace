import {Vector3} from "../utils/Vector3";
import {YaceObjectContainer} from "./YaceObjectContainer";
import {YaceBehavior} from "./YaceBehavior";
import {Drawable} from "./interfaces/Drawable";

export class YaceObject extends YaceObjectContainer implements Drawable {

    public behaviors: YaceBehavior[] = [];

    public position: Vector3 = new Vector3(0, 0, 0);
    public rotation: Vector3 = new Vector3(0, 0, 0);
    public scale: Vector3 = new Vector3(1, 1, 1);

    public addBehavior(behavior: YaceBehavior): void {
        this.behaviors.push(behavior);
        behavior.object = this;
    }

    public removeBehavior(behavior: YaceBehavior): void {
        behavior.object = null;
        let start = this.behaviors.indexOf(behavior);
        if (start >= 0) {
            this.behaviors.slice(start, 1);
        }
    }

    onEnable(): void {
        super.onEnable();
        for (let behavior of this.behaviors) {
            behavior.onEnable();
        }
    }

    onUpdate(): void {
        super.onUpdate();
        for (let behavior of this.behaviors) {
            behavior.onUpdate();
        }
    }

    onDisable(): void {
        super.onDisable();
        for (let behavior of this.behaviors) {
            behavior.onDisable();
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        for (let child of this.childs) {
            child.draw(context);
        }

        for (let behavior of this.behaviors) {
            let drawable = behavior as any as Drawable;
            if(typeof(drawable.draw) === "undefined") {
                continue;
            }

            drawable.draw(context);
        }
    }
}