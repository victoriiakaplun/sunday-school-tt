'use strict';

const utils = require('../utils/utils');

module.exports = class Schedule {
    constructor(userId, creationDate, events) {
        this.scheduleId = utils.randomInt(0,10000);
        this.userId = userId;
        this.creationDate = creationDate;
        this.events = [...events];
    }
}