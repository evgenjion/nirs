/**
 * @fileOverview реализация Data Access Object(DAO) для сущности boards
 *
 * boards - это интерактивные доски
 */

// TODO: убрать
/* eslint "no-unused-vars": "warn", "no-console": "warn" */

'use strict';

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let url = 'mongodb://localhost:27017/nirs';


class BoardsDAO {

    constructor() {
        if (BoardsDAO.__instance) return BoardsDAO.__instance;

        BoardsDAO.__instance = this;
    }

    /**
     * @FIXME real data
     *
     * @returns {Promise}
     */
    getByHash(hash) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log('Connected correctly to server.');


                resolve(db.collection('boards')
                    .find({ id: hash }))
                    .toArray(function(arr, docs) {
                        assert.equal(err, null, 'Error request from db');

                        resolve(docs);

                        db.close();
                    });
            });
        });
    }

    /**
     * @returns {Promise}
     */
    getAll() {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log('Connected correctly to server.');

                db.collection('boards')
                    .find()
                    .toArray(function(err, docs) {
                        assert.equal(err, null, 'Error request from db');

                        resolve(docs);

                        db.close();
                    });
            });
        });
    }

    insertBoard(board) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log('Connected correctly to server.');


                resolve(db.collection('boards').insertOne(board));


                db.close();
            });
        });
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
