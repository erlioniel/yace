/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import {Someone} from "../src/Someone";
import chai = require('chai');
var assert = chai.assert;

var person = new Someone('Bill', 'Doe');
describe('Person', () => {
    it('has name', (done) => {
        assert.equal(person.firstName, 'Bill');
        done();
    });
    it('has lastname', (done) => {
        assert.equal(person.lastName, 'Doe');
        done();
    });
    it('can say hi', (done) => {
        assert.equal('Hi! My name is BillDoe', person.hi());
        done();
    })
});