import Point2D from "./Point2D";
import Box2D from "./Box2D";

export default class TileSet {

    public image: HTMLImageElement;
    public tiles: Box2D[] = [];

    constructor(image: HTMLImageElement) {
        this.image = image;
    }

    tile(idx: number): Box2D {
        return this.tiles[idx];
    }

    public static simpleGrid(image: HTMLImageElement, grid: Point2D) {
        let tileSet = new TileSet(image);
        for (let k = 0; k + 1 < Math.floor(tileSet.image.height / grid.y); k++) {
            for (let i = 0; i + 1 < Math.floor(tileSet.image.width / grid.x); i++) {
                tileSet.tiles.push(new Box2D(
                    new Point2D(i * grid.x, k * grid.y),
                    new Point2D((i + 1) * grid.x, (k + 1) * grid.y)
                ))
            }
        }
        return tileSet;
    }
}
