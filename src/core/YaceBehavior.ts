import {YaceObject} from "./YaceObject";
/**
 * Created by VladimirK on 27.05.2016.
 */
export abstract class YaceBehavior {
    public object: YaceObject;

    onEnable(): void {}
    onUpdate(): void {}
    onDisable(): void {}
}