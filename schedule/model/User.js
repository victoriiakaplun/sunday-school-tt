'use strict';

const utils = require('../utils/utils');

module.exports = class User {
    constructor( name, email) {
        this.id = utils.randomInt(10000, 99998);
        this.name = name;
        this.email = email;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(nameStr) {
        if (nameStr !== "") {
            this._name = nameStr;
        }
    }

    get email() {
        return this._email;
    }

    set email(emailStr) {
        if (emailStr !== "") {
            this._email = emailStr;
        }
    }
}