var BoardController = require('../controllers/board-controller');

exports.fetch = function(req, res){
    BoardController.all(['_id', 'isComplete', 'turn', 'players', 'spots']).then(function(b){
        res.send(b);
    });
};

exports.create = function(req, res, next){
    BoardController.create()
        .then(function(b){
            return BoardController.addPlayer(b.id, req.user.id);
        })
        .then(function(b){
            res.send({
                id: b.id
            });
        }, next);
};

exports.addPlayer = function(req, res, next){
    if(req.body.boardId === null || req.body.playerId === null){
        res.send(500, 'Invalid parameters');
    }

    BoardController.addPlayer(req.body.boardId, req.body.playerId).then(function(b){
        res.send({
            success: true
        });
    }, next);
};

exports.removePlayer = function(req, res, next){
    if(req.body.boardId === null || req.body.playerId === null){
        res.send(500, 'Invalid parameters');
    }

    BoardController.removePlayer(req.body.boardId, req.body.playerId).then(function(b){
        res.send({
            success: true
        });
    }, next);
};

exports.play = function(req, res, next){
    if(req.body.boardId === null ||
        req.body.playerId === null ||
        req.body.spot === null){
        res.send(500, 'Invalid parameters');
    }

    BoardController.play(req.body.boardId, req.body.playerId, req.body.spot).then(function(b){
        res.send({
            success: true
        });
    }, next);
};