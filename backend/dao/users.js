/**
 * @fileOverview реализация Data Access Object(DAO) для сущности users
 *
 * users - пользователи, и связанная с ними информация
 */

'use strict';

var _ = require('lodash');

class UsersDAO {
    constructor() {
        if (UsersDAO.__instance) return UsersDAO.__instance;

        this._DB = [];

        UsersDAO.__instance = this;
    }

    getAll() {
        return this._DB;
    }

    /**
     * @FIXME real data
     *
     * @param {String} hash - sessionID пользователя
     *
     * @returns {UserEntity}
     */
    getAllByHash(hash) {
        return _.find(this._DB, {
            sessionID: hash
        });
    }

    /**
     * @FIXME real data
     *
     * @param {String} hash - sessionID пользователя
     *
     * @returns {String[]} Массив ID досок
     */
    getBoards(hash) {
        return [
            'sd2k3f23j',
            'fdkj24q3o'
        ];
    }

    /**
     * @param {String} sessID - sessionID пользователя
     * @param {String} boardID - id доски, которую добавляет пользователь
     *
     */
    addBoard(sessID, boardID) {
        var usr = _.find(this._DB, {
            sessionID: sessID
        });

        // Если пользователя нет - добавлем
        if (!usr) {
            usr = this.addUser({
                sessionID: sessID,
                boards: []
            });
        }

        usr.boards.push(boardID);
    }

    /**
     * @param {UserEntity} user
     *
     * @returns {UserEntity} ссылка на конкретного пользователя
     */
    addUser(user) {
        this._DB.push(user);

        // TODO: обратить внимание, когда будет БД
        return user;
    }
}

module.exports = UsersDAO;

/**
 * @typedef {Object} UserEntity
 * @property {String} sessionID - уникальный идентификатор сессии пользователя
 * @property {String[]} boards - массив из id интерактивных досок, принадлежащих пользователю
 * @property {String} [name=anonymous] - имя пользователя, по-умолчанию 'anonymous'
 */