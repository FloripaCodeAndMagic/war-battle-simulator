'use strict';

const BattleSimulator = require('../../app/scripts/battle-simulator');
const Battle = require('../../app/scripts/battle');
const chai = require('chai');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

chai.should();

describe('BattleSimulator', () => {
    afterEach(() => {
        sandbox.restore();
    });

    describe('new', () => {
        it('should set properties from parameters', () => {
            const battleSimulator = new BattleSimulator(174, 67, 1);

            battleSimulator.attackers.should.be.eql(174);
            battleSimulator.defenders.should.be.eql(67);
            battleSimulator.stopAt.should.be.eql(1);
        });

        it('should initialize battles as an empty array', () => {
            const battleSimulator = new BattleSimulator(174, 67, 1);

            battleSimulator.battles.should.be.a('array').with.length(0);
        });
    });

    describe('.simulate', () => {
        let battleSimulator;

        beforeEach(() => {
            battleSimulator = new BattleSimulator(10, 3, 1);
            sandbox.stub(battleSimulator, '_log').returns();
        });

        it('should stop when attackers reach stopAt', () => {
            const battle = new Battle([1, 1, 1], [2, 2, 2]);

            sandbox.stub(battleSimulator, '_createBattle').returns(battle);
            battleSimulator.simulate();
            battleSimulator.attackers.should.be.eql(1);
        });

        it('should stop when defenders reach 0', () => {
            const battle = new Battle([2, 2, 2], [1, 1, 1]);

            sandbox.stub(battleSimulator, '_createBattle').returns(battle);
            battleSimulator.simulate();
            battleSimulator.defenders.should.be.at.most(0);
        });

        it('should call _log every battle', () => {
            const battle = new Battle([2, 2, 2], [1, 1, 1]);

            sandbox.stub(battleSimulator, '_createBattle').returns(battle);
            battleSimulator.defenders = 4;
            battleSimulator.simulate();
            sinon.assert.calledTwice(battleSimulator._log)
        });
    });

    describe('._createBattle', () => {
        let battleSimulator;

        beforeEach(() => {
            battleSimulator = new BattleSimulator(10, 3, 1);
        });

        it('should return an instance of Battle', () => {
            battleSimulator._createBattle([3, 2, 1], [3, 2, 1]).should.be.instanceof(Battle);
        });

        it('should return a Battle created with the arguments rolls', () => {
            const battle = battleSimulator._createBattle([3, 2, 1], [4, 3, 2]);

            battle.attackRoll.should.be.eql([3, 2, 1]);
            battle.defenseRoll.should.be.eql([4, 3, 2]);
        });
    });
});
