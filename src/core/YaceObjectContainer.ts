import {YaceObject} from "./YaceObject";
import {LifeCycle} from "./interfaces/LifeCycle";

export abstract class YaceObjectContainer implements LifeCycle {
    protected childs: YaceObject[] = [];

    public add(obj: YaceObject): void {
        this.childs.push(obj);
    }

    public remove(obj: YaceObject): void {
        let start = this.childs.indexOf(obj);
        if (start >= 1) {
            this.childs.slice(start, 1);
        }
    }

    onEnable(): void {
        for (let child of this.childs) {
            child.onEnable();
        }
    }

    onUpdate(): void {
        for (let child of this.childs) {
            child.onUpdate();
        }
    }

    onDisable(): void {
        for (let child of this.childs) {
            child.onDisable();
        }
    }
}