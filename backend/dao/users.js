/**
 * @fileOverview реализация Data Access Object(DAO) для сущности users
 *
 * users - пользователи, и связанная с ними информация
 */

'use strict';

class UsersDAO {
    /**
     * @FIXME real data
     *
     * @param {String} hash - sessionID пользователя
     *
     * @returns {UserEntity}
     */
    getAllByHash(hash) {
        return {
            sessionID: hash,
            name: 'Василевс',
            boards: [
                'dn123n' + hash + 'snbq31',
                'b31bl1' + hash + 'nfabwj'
            ]
        };
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
}

module.exports = UsersDAO;

/**
 * @typedef {Object} UserEntity
 * @property {String} sessionID - уникальный идентификатор сессии пользователя
 * @property {String[]} boards - массив из id интерактивных досок, принадлежащих пользователю
 * @property {String} [name=anonymous] - имя пользователя, по-умолчанию 'anonymous'
 */