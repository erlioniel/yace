import {YaceScene} from "../YaceScene";

export interface Drawable {
    draw(scene: YaceScene, context: CanvasRenderingContext2D): void;
}