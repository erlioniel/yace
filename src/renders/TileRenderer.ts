import YaceBehavior from "../core/YaceBehavior";
import Drawable from "../core/interfaces/Drawable";
import YaceScene from "../core/YaceScene";
import TileSet from "../utils/TileSet";

export default class TileRenderer extends YaceBehavior implements Drawable {
    public tileSet: TileSet;
    public dirty: boolean;
    public active: number = 0;

    constructor(tileSet: TileSet) {
        super();
        this.tileSet = tileSet;
        this.dirty = true;
    }

    activate(active: number) {
        this.active = active;
        this.dirty = true;
    }

    draw(scene: YaceScene, context: CanvasRenderingContext2D): boolean {
        this.dirty = false;
        context.drawImage(
            this.tileSet.image,

            // Crop
            this.tileSet.tile(this.active).min.x,
            this.tileSet.tile(this.active).min.y,
            this.tileSet.tile(this.active).width(),
            this.tileSet.tile(this.active).height(),

            // Offset
            this.object.position.x * this.object.scale.x,
            this.object.position.y * this.object.scale.y,

            // Scale
            this.tileSet.tile(this.active).width() * this.object.scale.x,
            this.tileSet.tile(this.active).height() * this.object.scale.y
        );

        return true;
    }

    public isDirty(): boolean {
        return this.dirty;
    }
}