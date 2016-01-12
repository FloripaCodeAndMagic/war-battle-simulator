'use strict';

const dice = require('../../../app/scripts/utils/dice');
const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

chai.should();

describe('dice', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('.roll', () => {
        describe('with no argument', () => {
            it('should return a single dice roll if no argument', () => {
                dice.roll().should.be.a('number');
            });

            it('should call _random', () => {
                sandbox.spy(dice, '_random');
                dice.roll();
                sinon.assert.calledOnce(dice._random);
            });

            it('should call _floor with _random * 6', () => {
                sandbox.stub(dice, '_random').returns(0.5);
                sandbox.spy(dice, '_floor');
                dice.roll();
                sinon.assert.calledWith(dice._floor, 3);
            });

            it('should add 1', () => {
                sandbox.stub(dice, '_random').returns(0.5);
                sandbox.stub(dice, '_floor').returns(3);
                dice.roll().should.be.eql(4);
            });
        });

        describe('with argument', () => {
            it('times should be normalized to 1', () => {
                sandbox.stub(dice, '_random').returns(0.5);

                dice.roll('zueira').should.be.eql([4]);
                dice.roll(0).should.be.eql([4]);
                dice.roll(-1).should.be.eql([4]);
                dice.roll([]).should.be.eql([4]);
                dice.roll({}).should.be.eql([4]);
                dice.roll(null).should.be.eql([4]);
            });

            it('should return an array of rolls with length equal to argument', () => {
                dice.roll(2).should.be.a('array').with.length(2)
            });

            it('should call _random', () => {
                sandbox.spy(dice, '_random');
                dice.roll(2);
                sinon.assert.calledTwice(dice._random);
            });

            it('should call _floor with _random * 6', () => {
                sandbox.stub(dice, '_random').returns(0.5);
                sandbox.spy(dice, '_floor');
                dice.roll(2);
                sinon.assert.calledWith(dice._floor, 3);
            });

            it('should add 1', () => {
                sandbox.stub(dice, '_random').returns(0.5);
                sandbox.stub(dice, '_floor').returns(3);
                dice.roll(2).should.be.eql([4, 4]);
            });
        });
    });
});
