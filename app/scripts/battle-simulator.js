'use strict';

const dice = require('./utils/dice');

function BattleSimulator(attackers, defenders, stopAt) {
    this.attackers = attackers;
    this.defenders = defenders;
    this.stopAt = stopAt || 1;
    this.battles = [];
}

BattleSimulator.prototype.simulate = function() {
    let battle;
    let attackSize;
    let defenseSize;

    while (this.attackers > this.stopAt && this.defenders > 0) {
        attackSize = this.attackers > 3 ? 3 : this.attackers - 1;
        defenseSize = this.defenders > 3 ? 3 : this.defenders;
        battle = this._createBattle(dice.roll(attackSize), dice.roll(defenseSize));
        battle.battle();
        this.battles.push(battle);
        this.attackers -= battle.attackLoss;
        this.defenders -= battle.defenseLoss;
        this._log(battle);
    }
}

BattleSimulator.prototype._createBattle = function(attackRoll, defenseRoll) {
    return new Battle(attackRoll, defenseRoll);
}

BattleSimulator.prototype._log = console.log;

module.exports = BattleSimulator;
