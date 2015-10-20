/**
 * @fileOverview реализация Data Access Object(DAO) для сущности boards
 *
 * boards - это интерактивные доски
 */

'use strict';

let _ = require('lodash');

class BoardsDAO {

    constructor() {
        if (BoardsDAO.__instance) return BoardsDAO.__instance;
        this._DB = [];

        BoardsDAO.__instance = this;
    }

    /**
     * @FIXME real data
     *
     * @returns {BoaуrdEntity}
     */
    getByHash(hash) {
        return _.find(this._DB, { id: hash });
    }

    getAll() {
        return this._DB;
    }

    insertBoard(board) {
        this._DB.push(board);
    }
}

module.exports = BoardsDAO;

/**
 * @typedef {Object} BoardEntity
 * @property {String} id - уникальный идентификатор доски
 * @property {String} owner - sessionID владельца
 * @property {BoardAction[]} [hist] - история действий, произведенных в доске
 */

/**
 * @typedef {Object} BoardAction
 *
 * @property {String} type - тип фигуры
 * @property {Coords} startCoord - начальные координаты
 * @property {Coords} endCoord - конечные координаты
 */

/**
 * @typedef {String[]} Coords
 * @property {Number} 0 - x координата
 * @property {Number} 1 - y координата
 */