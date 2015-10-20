'use strict';

var crypto = require('crypto');
var jade = require('jade');

/**
 * @param {Object} app - express server
 */
module.exports = (app) => {

    app.get('/boards/paint/:id', (req, res) => {
        let boardID = req.params.id;

        let UsersModel = require('../models/users');
        let userBoards = new UsersModel().getUserBoards(req.sessionID);

        let isOwner = false;

        if(userBoards.find(i => i === boardID)) {
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
        var BoardsModel = require('../models/boards');
        var boardsModel = new BoardsModel();

        var UsersModel = require('../models/users');
        var usersModel = new UsersModel();

        var boardID = crypto.createHash('md5')
                            .update(Math.random() + '')
                            .digest('hex')
                            .slice(0, 10);

        var sessID = req.sessionID;

        boardsModel.insertBoard({
            id: boardID,
            owner: sessID
        });

        usersModel.addBoard({
            sessID,
            boardID
        });

        res.redirect('/boards/paint/' + boardID);
    });
};
