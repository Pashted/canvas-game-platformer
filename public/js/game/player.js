define(['view', 'log', 'socket'], (view, log, socket) => {

    let /*colors = [
            "#b22",
            "#3cba23",
            "#baba23",
            "#2323b8",
            "#a123ba",
            "#23baa1",
            "#84f",
            "#e70",
            "#eee",
            "#111",
        ],*/
        rand = () => Math.floor(Math.random() * 256),

        // TODO: вынести формирование всех статичных свойств игрока на сервер

        Player = function (name) {
            this.name = name;
            this.color = `rgb(${rand()},${rand()},${rand()})`;
            this.width = 32;
            this.height = 64;
            this.pos = { X: 0, Y: 0 };
            this.velocity = { X: 4, Y: 4 };
            this.score = 0;
            this.state = {
                move_left:  false,
                move_right: false,
                move_up:    false,
                move_down:  false
            };
        };

    Player.prototype.moveLeft = function () {
        this.pos.X -= this.velocity.X;

        if (this.pos.X + this.width >= view.ctx.canvas.width)
            this.pos.X = view.ctx.canvas.width - this.width;
        if (this.pos.X <= 0)
            this.pos.X = 0;

        socket.socket.emit('update', this);
    };
    Player.prototype.moveRight = function () {
        this.pos.X += this.velocity.X;
        if (this.pos.X + this.width >= view.ctx.canvas.width)
            this.pos.X = view.ctx.canvas.width - this.width;

        if (this.pos.X <= 0)
            this.pos.X = 0;

        socket.socket.emit('update', this);
    };
    Player.prototype.moveUp = function () {
        this.pos.Y -= this.velocity.Y;

        if (this.pos.Y + this.height >= view.ctx.canvas.height)
            this.pos.Y = view.ctx.canvas.height - this.height;
        else if (this.pos.Y <= 0)
            this.pos.Y = 0;

        socket.socket.emit('update', this);
    };
    Player.prototype.moveDown = function () {
        this.pos.Y += this.velocity.Y;

        if (this.pos.Y + this.height >= view.ctx.canvas.height)
            this.pos.Y = view.ctx.canvas.height - this.height;
        else if (this.pos.Y <= 0)
            this.pos.Y = 0;

        socket.socket.emit('update', this);
    };


    Player.prototype.shoot = function (bullet) {

        view.bullets.push(bullet);

        this.score++;

        socket.socket.emit('shoot', { bullet, score: this.score });

        log.write('combat', `<span style="color:${this.color}">${this.name}</span> делает выстрел. Счёт: ${this.score}`);
    };

    // Player.prototype.login = function () {
    //
    //
    // };


    return {
        init() {
            return new Promise(
                game_start => socket.connect()
                    .then(() => {

                        socket.socket.on('update', res => {
                            view.players[res.id] = res.char;
                        });

                        socket.socket.on('shoot', res => {
                            view.bullets.push(res.bullet);
                            log.write('combat', `<span style="color:${res.color}">${res.name}</span> делает выстрел. Счёт: ${res.score}`);
                        });

                        socket.socket.on('logoff', res => {

                            console.log('offline', res.id);

                            log.write('system', `<span style="color:${res.color}">${res.name}</span> вышел из игры`);

                            delete view.players[res.id];
                        });

                        socket.check()
                            .then(() => {

                                // let name = "Player_" + Math.floor(Math.random() * 100);
                                let name = prompt('Как Вас зовут?', "Player_" + Math.floor(Math.random() * 100)) || 'noname';

                                this.char = new Player(name);

                                socket.login(this.char)
                                    .then(() => {
                                        view.players.main = this.char;
                                        game_start();

                                    });
                            });
                    }),
            );

        },

    }
});
