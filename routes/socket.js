module.exports = server => {
    let io = require('socket.io')(server),

        players = {}, limit = 3,

        have_free_space = () => Object.keys(players).length < limit;


    io.on('connection', socket => {

        let id = Math.random();

        socket.on('disconnect', () => {
            if (players[id]) {
                console.log('User disconnected', id);
                let res = {
                    id,
                    name:  players[id].name,
                    color: players[id].color
                };
                socket.broadcast.emit('logoff', res);
                delete players[id];
            }
        });

        // смотреть статы игроков могут все
        socket.on('update', char => {
            // игрок раздает другим свои статы, сам же клиент формирует их на своей странице без участия сервера
            players[id] = char;
            socket.broadcast.emit('update', { id, char });
        });


        // есть ли место на сервере для нового игрока?
        socket.on('check', () => {
            socket.emit('check', have_free_space() ? "OK" : "FULL");
            for (let i in players)
                socket.emit('update', { id: i, char: players[i] });
        });


        socket.on('login', char => {

            if (!have_free_space()) {
                socket.emit('login', { status: 'FULL' });

            } else {
                // char.id = key;
                players[id] = char;

                io.emit('login', {
                    status: "OK",
                    name:   char.name,
                    color:  char.color
                });
                socket.emit('game_start');

                socket.broadcast.emit('update', { id, char });

            }

        });

    });

};
