'use strict';

let crypto = require('crypto');
let jade = require('jade');
let _ = require('lodash');

/* eslint "no-console": "warn" */

/**
 * @param {Object} app - express server
 */
module.exports = (app) => {
    app.get('/boards/paint/:id', (req, res) => {
        let boardID = req.params.id;

        let UsersModel = require('../models/users');
        let userBoards = new UsersModel().getUserBoards(req.sessionID);

        let isOwner = false;

        if (userBoards.find(i => i === boardID)) {
            isOwner = true;
        }

        let params = {
            isOwner
        };

        res.send(jade.renderFile('./backend/views/draw.jade', params));
    });

    /**
     * Создаем уникальный id для доски
     */
    app.get('/boards/new', (req, res) => {
        let BoardsModel = require('../models/boards');
        let boardsModel = new BoardsModel();

        let UsersModel = require('../models/users');
        let usersModel = new UsersModel();

        let boardID = crypto.createHash('md5')
                            .update(Math.random() + '')
                            .digest('hex')
                            .slice(0, 10);

        let sessID = req.sessionID;

        boardsModel.insertBoard({
            id: boardID,
            owner: sessID
        });

        boardsModel.getAll()
        .then(function(boards) {
            console.log(boards);
        });

        usersModel.addBoard({
            sessID,
            boardID
        });

        res.redirect(`/boards/paint/${boardID}`);
    });

    app.get('/boards/my', (req, res) => {
        let BoardsModel = require('../models/boards');
        let boardsModel = new BoardsModel();

        // TEMP:
        // TODO: запрашивать это все в userModel
        boardsModel.getAll()
        .then(function(boards) {
            // _.map instead of _.pluck (lodash v4)
            res.send(_.map(boards, 'id').join());
        });
    });
};
