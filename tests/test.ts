/// <reference path="../typings/index.d.ts" />

import chai = require('chai');
import {Point2D} from "../src/utils/Point2D";
let assert = chai.assert;

let vector3 = new Point2D(2, 3);
describe('Vector', () => {
    it('has x', (done) => {
        assert.equal(vector3.x, 2);
        done();
    });
    it('has y', (done) => {
        assert.equal(vector3.y, 3);
        done();
    });
});