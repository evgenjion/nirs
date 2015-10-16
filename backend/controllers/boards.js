var crypto = require('crypto');
var jade = require('jade');

/**
 * @param {Object} app - express server
 */
module.exports = (app) => {

    app.get('/boards/paint/:id', (req, res) => {
        console.log(req.params.id);

        var session = req.session;

        if (session.viewTimes === undefined)
            session.viewTimes = 0;
        else
            session.viewTimes++;

        var params = {
            viewInfo: session.viewTimes || 'Страница не была посещена раннее'
        };

        res.send(jade.renderFile('views/draw.jade', params));
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

        // TODO: писать еще в модель users
        boardsModel.insertBoard({
            id: boardID,
            owner: req.sessionID
        });

        console.log(boardsModel.getAll());

        res.redirect('/boards/paint/' + boardID);
    });
};
