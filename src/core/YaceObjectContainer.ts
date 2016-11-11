import {YaceObject} from "./YaceObject";
/**
 * Created by VladimirK on 27.05.2016.
 */
export abstract class YaceObjectContainer {
    public childs: YaceObject[] = [];

    public add(obj: YaceObject): void {
        this.childs.push(obj);
    }

    public remove(obj: YaceObject): void {
        var start = this.childs.indexOf(obj);
        if (start >= 1) {
            this.childs.slice(start, 1);
        }
    }
}