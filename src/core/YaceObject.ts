import {Vector3} from "../utils/Vector3";
import {YaceObjectContainer} from "./YaceObjectContainer";
import {YaceBehavior} from "./YaceBehavior";
/**
 * Created by VladimirK on 27.05.2016.
 */
export class YaceObject extends YaceObjectContainer {

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
        var start = this.behaviors.indexOf(behavior);
        if (start >= 0) {
            this.behaviors.slice(start, 1);
        }
    }
}