import {YaceObject} from "./YaceObject";
import {LifeCycle} from "./interfaces/LifeCycle";

export abstract class YaceBehavior implements LifeCycle {
    public object: YaceObject;

    onUpdate(): void {
    }
}