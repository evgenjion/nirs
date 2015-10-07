/**
 * @fileOverview реализация Data Access Object(DAO) для сущности boards
 *
 * boards - это интерактивные доски
 */

'use strict';

class BoardsDAO {
    /**
     * @FIXME real data
     *
     * @returns {BoardEntity}
     */
    getByHash(hash) {
        return {
            id: hash,
            title: 'Доска про линейную алгебру',
            owner: 'sess-id:dfj193nffds13',
            hist: [
                {
                    type: 'Rect',
                    startCoord: [10, 10],
                    endCoord: [400, 100]
                }
            ]
        };
    }
}

module.exports = BoardsDAO;

/**
 * @typedef {Object} BoardEntity
 * @property {String} id
 * @property {BoardAction[]}
 */

/**
 * @typedef {Object} BoardAction
 *
 * @property {String} type - тип фигуры
 * @property {Coords} startCoord - начальные координаты
 * @property {Coords} endCoord - конечные координаты
 */

/**
 * @typedef {Array} Coords
 * @property {Number} 0 - x координата
 * @property {Number} 1 - y координата
 */