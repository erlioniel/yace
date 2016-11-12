export default class Point2D {

    public static ONE: Point2D = new Point2D(1, 1);
    public static ZERO: Point2D = new Point2D(0, 0);

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static concat(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x * v2.x, v1.y * v2.y);
    }

    static divide(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x / v2.x, v1.y / v2.y);
    }

    static max(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
    }

    static min(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
    }

    static equals(v1: Point2D, v2: Point2D): boolean {
        return v1.x === v2.x && v1.y === v2.y;
    }
}
