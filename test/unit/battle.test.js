'use strict'; 

const Battle = require('../../app/scripts/battle');
const chai = require('chai');
const expect = chai.expect;

chai.should();

describe('Battle', () => {
    describe('new', () => {
        it('should only accept 2 arrays', () => {
            const assertFn = function() {
                return new Battle('lala', {hue: 'hue'});
            };

            expect(assertFn).to.throw(Error);
        });

        it('should set properties from parameters', () => {
            const battle = new Battle([1, 2, 3], [3, 2, 1]);

            battle.attackRoll.should.be.eql([3, 2, 1]);
            battle.defenseRoll.should.be.eql([3, 2, 1]);
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(0);
        });
    });

    describe('.battle', () => {
        it('should set attackLoss and defenseLoss correctly', () => {
            let battle = new Battle([3, 2, 1], [3, 2, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(3);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([4, 2, 1], [3, 2, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(2);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([4, 3, 1], [3, 2, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(2);

            battle = new Battle([4, 3, 2], [3, 2, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(3);

            battle = new Battle([4, 3, 2], [4, 3]);

            battle.battle();
            battle.attackLoss.should.be.eql(2);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([4, 3, 2], [3, 3]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([4, 3, 2], [3, 2]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(2);

            battle = new Battle([4, 3, 2], [4]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([4, 3, 2], [3]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([4, 3], [4, 3, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(2);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([4, 4], [4, 3, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([5, 4], [4, 3, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(2);

            battle = new Battle([5], [5, 3, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([5], [4, 3, 1]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([5, 4], [5, 4]);

            battle.battle();
            battle.attackLoss.should.be.eql(2);
            battle.defenseLoss.should.be.eql(0);

            battle = new Battle([5, 4], [4, 4]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([5, 4], [4, 3]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(2);

            battle = new Battle([5], [4]);

            battle.battle();
            battle.attackLoss.should.be.eql(0);
            battle.defenseLoss.should.be.eql(1);

            battle = new Battle([5], [5]);

            battle.battle();
            battle.attackLoss.should.be.eql(1);
            battle.defenseLoss.should.be.eql(0);
        });
    });

    describe('.toString', () => {
        it('should transform battle into a beautiful string', () => {
            const battle = new Battle([4, 3, 1], [3, 2, 1]);

            battle.battle();
            battle.toString().should.be.eql(
                'Attack roll: [4,3,1]\tDefense roll: [3,2,1]\n' +
                'Attack loss: 1\t\tDefense loss: 2\n' +
                '------------------------------------------'
            );
        });
    });
});
