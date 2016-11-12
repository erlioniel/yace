import YaceObject from "./YaceObject";
import LifeCycle from "./interfaces/LifeCycle";

abstract class YaceContainer implements LifeCycle {
    public childs: YaceObject[] = [];

    public add(obj: YaceObject): void {
        this.childs.push(obj);
    }

    public remove(obj: YaceObject): void {
        let start = this.childs.indexOf(obj);
        if (start >= 1) {
            this.childs.slice(start, 1);
        }
    }

    onUpdate(): void {
        for (let child of this.childs) {
            child.onUpdate();
        }
    }
}

export default YaceContainer;