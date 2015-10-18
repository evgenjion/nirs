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

    getAll() {
        return this._DAO.getAll();
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

    /**
     * @param {Object} params
     * @param {String} params.sessID - sessionID пользователя
     * @param {String} params.boardID - id доски, которую добавляет пользователь
     *
     */
    addBoard(params) {
        return this._DAO.addBoard(params.sessID, params.boardID);
    }
}

module.exports = Users;