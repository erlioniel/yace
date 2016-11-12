import YaceScene from "../YaceScene";

interface Drawable {
    draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean;
    isDirty(): boolean;
}

export default Drawable;