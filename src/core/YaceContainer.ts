import YaceObject from "./YaceObject";
import LifeCycle from "./interfaces/LifeCycle";

abstract class YaceContainer implements LifeCycle {
    public childs: YaceObject[] = [];

    public add(obj: YaceObject): YaceContainer {
        this.childs.push(obj);
        return this;
    }

    public remove(obj: YaceObject): YaceContainer {
        let start = this.childs.indexOf(obj);
        if (start >= 1) {
            this.childs.slice(start, 1);
        }
        return this;
    }

    onUpdate(): void {
        for (let child of this.childs) {
            child.onUpdate();
        }
    }
}

export default YaceContainer;