'use strict';

const utils = require('../utils/utils');

module.exports = class Event {
    constructor(title, startDate, endDate) {
        this.id = utils.randomInt(10000, 99998);
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

