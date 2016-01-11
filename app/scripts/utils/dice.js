'use strict';

const dice = {};

dice.roll = function(times) {
    if (times === undefined) {
        return dice._floor(dice._random() * 6) + 1;
    }

    if (typeof times !== 'number' || times < 1) {
        times = 1;
    }

    let rolls = [];
    for (var i = 0; i < times; i++) {
        rolls.push(dice._floor(dice._random() * 6) + 1);
    }

    return rolls;
};

dice._random = Math.random;
dice._floor = Math.floor;

module.exports = dice;
