import YaceScene from "../YaceScene";

interface Drawable {
    draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
    isDirty(): boolean;
}

export default Drawable;