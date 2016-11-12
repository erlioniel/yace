export default class Point2D {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static concat(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x + v2.x, v1.y + v2.y);
    }

    static substract(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x * v2.x, v1.y * v2.y);
    }

    static divide(v1: Point2D, v2: Point2D): Point2D {
        return new Point2D(v1.x / v2.x, v1.y / v2.y);
    }
}
