import Point2D from "utils/Point2D";
export default class Box2D {
    public min: Point2D;
    public max: Point2D;

    constructor(min: Point2D, max: Point2D) {
        this.min = min;
        this.max = max
    }

    public width(): number {
        return this.max.x - this.min.x;
    }

    public height(): number {
        return this.max.y - this.min.y;
    }

    public static bound(bounds: Box2D, point: Point2D): Point2D {
        return Point2D.max(bounds.min, Point2D.min(bounds.max, point));
    }
}