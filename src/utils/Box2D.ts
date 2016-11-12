import Point2D from "utils/Point2D";
export default class Box2D {
    public lt: Point2D;
    public rb: Point2D;

    constructor(lt: Point2D, rb: Point2D) {
        this.lt = lt;
        this.rb = rb;
    }
}