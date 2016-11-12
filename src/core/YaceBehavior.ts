import YaceObject from "./YaceObject";
import LifeCycle from "./interfaces/LifeCycle";

abstract class YaceBehavior implements LifeCycle {
    public object: YaceObject;

    onUpdate(): void {
    }
}

export default YaceBehavior;