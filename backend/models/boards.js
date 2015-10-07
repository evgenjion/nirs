/**
 * @file Модель для доступа ко всем интерактивным доскам
 */

'use strict';

var BoardsDAO = require('../dao/boards');

class Boards {
    constructor() {
        this._DAO = new BoardsDAO();
    }

    /**
     * @returns {BoardEntity} объект-оболочку для отдельной доски
     */
    getBoardByHash(hash) {
        return this._DAO.getByHash(hash);
    }
}

module.exports = Boards;