var config = require('../config');
var pubnub = require('pubnub').init({
    publish_key: config.pubnub.publish_key,
    subscribe_key: config.pubnub.subscribe_key
});
var Events = require('../events');
var AI = require('./ai');

var channel = function(name){
    return name + (config.isDevelopment ? '-dev' : '');
};

/**
 * Board Events
 */
Events.on('board:create', function(board){
    pubnub.publish({
        channel: channel('board:create'),
        message: {
            boardId: board._id
        }
    });
});

Events.on('board:join', function(board, boardId, playerId){
    pubnub.publish({
        channel: channel('board:join'),
        message: {
            boardId: boardId,
            playerId: playerId
        }
    });
});

Events.on('board:leave', function(board, boardId, playerId){
    pubnub.publish({
        channel: channel('board:leave'),
        message: {
            boardId: boardId,
            playerId: playerId
        }
    });
});

Events.on('board:ready', function(board, boardId){
    pubnub.publish({
        channel: channel('board:ready'),
        message: {
            boardId: boardId
        }
    });
});

Events.on('board:play', function(board, boardId, playerId, spot){
    pubnub.publish({
        channel: channel('board:play'),
        message: {
            boardId: boardId,
            playerId: playerId,
            spots: board.spots
        }
    });
});

Events.on('board:turn', function(board, boardId, playerId){
    if(playerId === 0){
        //AI plays if the playerId is 0
        AI.play(boardId);
    }
    else{
        //only broadcast if the turn is for a real player
        pubnub.publish({
            channel: channel('board:turn'),
            message: {
                boardId: boardId,
                playerId: playerId
            }
        });
    }
});

Events.on('board:complete', function(board, boardId){
    pubnub.publish({
        channel: channel('board:complete'),
        message: {
            boardId: boardId
        }
    });
});

/**
 * User Events
 */
Events.on('user:loginEmail', function(user){
    pubnub.publish({
        channel: channel('user:loginEmail'),
        message: {
            token: user.token,
            email: user.email
        }
    });
});