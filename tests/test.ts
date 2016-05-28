/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai');
import {Vector3} from "../src/utils/Vector3";
var assert = chai.assert;

var vector3 = new Vector3(2,3,4);
describe('Vector', () => {
    it('has x', (done) => {
        assert.equal(vector3.x, 2);
        done();
    });
    it('has y', (done) => {
        assert.equal(vector3.y, 3);
        done();
    });
    it('has z', (done) => {
        assert.equal(vector3.z, 4);
        done();
    });
});