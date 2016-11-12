import YaceContainer from "./YaceContainer";
import YaceBehavior from "./YaceBehavior";
import Drawable from "./interfaces/Drawable";
import Point2D from "../utils/Point2D";
import YaceScene from "./YaceScene";

export default class YaceObject extends YaceContainer implements Drawable {

    public behaviors: YaceBehavior[] = [];

    public position: Point2D = new Point2D(0, 0);
    public rotation: Point2D = new Point2D(0, 0);
    public scale: Point2D = new Point2D(1, 1);

    public addBehavior(behavior: YaceBehavior): void {
        this.behaviors.push(behavior);
        behavior.object = this;
    }

    public removeBehavior(behavior: YaceBehavior): void {
        behavior.object = null;
        let start = this.behaviors.indexOf(behavior);
        if (start >= 0) {
            this.behaviors.splice(start, 1);
        }
    }

    onUpdate(): void {
        super.onUpdate();
        for (let behavior of this.behaviors) {
            behavior.onUpdate();
        }
    }

    draw(scene: YaceScene, context: CanvasRenderingContext2D): void {
        for (let child of this.childs) {
            child.draw(scene, context);
        }

        for (let behavior of this.behaviors) {
            let drawable = behavior as any as Drawable;
            if(typeof(drawable.draw) === "undefined") {
                continue;
            }

            drawable.draw(scene, context);
        }
    }
}