import YaceBehavior from "../core/YaceBehavior";
import Box2D from "../utils/Box2D";
import Boxed from "../core/interfaces/Boxed";
import Point2D from "../utils/Point2D";
export default class BoundsBehavior extends YaceBehavior {
    public positionBound: Box2D;
    public scaleBound: Box2D;
    public boxBound: Box2D;
    public boxFixRatio: boolean;

    onUpdate(): void {
        super.onUpdate();

        if(this.positionBound != null) {
            this.object.position = Box2D.bound(this.positionBound, this.object.position);
        }

        if(this.scaleBound != null) {
            this.object.scale = Box2D.bound(this.scaleBound, this.object.scale);
        }

        if(this.boxBound != null) {
            let boxed = this.object as any as Boxed;
            if(typeof(boxed.box) !== "undefined") {

                // Calculate max scale for boxBound
                let box = boxed.box();
                let scale = Point2D.multiply(
                    this.object.scale,
                    new Point2D(
                        Math.max(1, box.width() / this.boxBound.width()),
                        Math.max(1, box.height() / this.boxBound.height())
                    )
                );
                this.object.scale = Point2D.max(scale, Point2D.invert(scale));

                // Bound object box
                box = boxed.box();
                this.object.position = Point2D.subtract(
                    this.object.position,
                    Point2D.min(Point2D.ZERO, Point2D.subtract(box.min, this.boxBound.min))
                );
                this.object.position = Point2D.concat(
                    this.object.position,
                    Point2D.min(Point2D.ZERO, Point2D.subtract(this.boxBound.max, box.max))
                );
            }
        }
    }
}