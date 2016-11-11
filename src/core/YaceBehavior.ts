import {YaceObject} from "./YaceObject";
import {LifeCycle} from "./interfaces/LifeCycle";

export abstract class YaceBehavior implements LifeCycle {
    protected object: YaceObject;

    onEnable(): void {
    }

    onUpdate(): void {
    }

    onDisable(): void {
    }
}