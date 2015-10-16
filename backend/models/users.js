/**
 * @file Модель для доступа к пользователям
 */

'use strict';

var UsersDAO = require('../dao/users');

class Users {
    constructor() {
        if (Users.__instance) return Users.__instance;
        this._DAO = new UsersDAO();

        Users.__instance = this;
    }

    /**
     * @returns {UserEntity} объект-оболочку для отдельной доски
     */
    getUserByHash(hash) {
        return this._DAO.getAllByHash(hash);
    }

    getUserHist(hash) {
        return this._DAO.getBoards(hash);
    }
}

module.exports = Users;