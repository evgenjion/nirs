/**
 * @file Модель для доступа ко всем интерактивным доскам
 */

'use strict';

var BoardsDAO = require('../dao/boards');

/**
 * @Singletone
 */
class Boards {
    constructor() {
        if (Boards.__instance) return Boards.__instance;

        this._DAO = new BoardsDAO();
        Boards.__instance = this;
    }

    /**
     * @returns {BoardEntity} объект-оболочку для отдельной доски
     */
    getBoardByHash(hash) {
        return this._DAO.getByHash(hash);
    }

    getAll() {
        return this._DAO.getAll();
    }

    /**
     * @param {BoardEntity} board
     *
     * @returns {Boolean} успешна ли вставка
     */
    insertBoard(board) {
        return this._DAO.insertBoard(board);
    }
}

module.exports = Boards;