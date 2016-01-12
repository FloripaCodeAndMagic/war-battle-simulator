'use strict';

function Battle(attackRoll, defenseRoll) {
    if (!Array.isArray(attackRoll) || !Array.isArray(defenseRoll)) {
        throw new Error('Battle expected 2 arrays as arguments for contructor');
    }

    const sortFunc = function(a, b) {
        return a < b;
    };

    this.attackRoll = attackRoll.sort(sortFunc);
    this.defenseRoll = defenseRoll.sort(sortFunc);
    this.attackLoss = 0;
    this.defenseLoss = 0;
}

Battle.prototype.battle = function() {
    while (this.attackRoll.length > this.defenseRoll.length) {
        this.attackRoll.pop();
    }

    while (this.defenseRoll.length > this.attackRoll.length) {
        this.defenseRoll.pop();
    }

    for (let i = 0; i < this.attackRoll.length; i++) {
        if (this.attackRoll[i] > this.defenseRoll[i]) {
            this.defenseLoss++;
        } else {
            this.attackLoss++;
        }
    }
};

Battle.prototype.toString = function() {
    return `Attack roll: [${this.attackRoll}]\t` +
        `Defense roll: [${this.defenseRoll}]\n` +
        `Attack loss: ${this.attackLoss}\t\t` +
        `Defense loss: ${this.defenseLoss}\n` +
        `------------------------------------------`;
}

module.exports = Battle;
