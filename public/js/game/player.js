define(['view', 'log', 'ws'], (view, log, ws) => {

    let colors = [
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
        ],

        Player = function () {
            this.width = 32;
            this.height = 64;
            this.pos = { X: 0, Y: 0 };
            this.velocity = { X: 3, Y: 3 };
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
    };
    Player.prototype.moveRight = function () {
        this.pos.X += this.velocity.X;
    };
    Player.prototype.moveUp = function () {
        this.pos.Y -= this.velocity.Y;
    };
    Player.prototype.moveDown = function () {
        this.pos.Y += this.velocity.Y;
    };


    Player.prototype.shoot = function (position) {

        view.bullets.push(position);

        this.score++;

        log.write('combat', `<span style="color:${this.color}">${this.name}</span> makes a shot.score: ${this.score}`);
    };

    Player.prototype.login = function () {
        ws.connect()
            .then(() => {
                let name =
                    // prompt('Как Вас зовут?',
                        "Player" + Math.floor(Math.random() * 100)
                    // )
                ;

                if (!name) {
                    alert('Имя не определено. Соединение невозможно.');
                    return false;
                }

                this.name = name;

                ws.socket.send(JSON.stringify({ name }));

                this.id = view.players.length;
                this.color = colors[this.id];

                view.players.push(this);

                log.write('system', `<span style="color:${this.color}">${this.name}</span> LOGGED IN`);

            });

    };


    return {
        init() {
            let gamer = new Player();

            gamer.login();


            // TODO: gamer auth, connect, set props methods etc

            return gamer;
        },
        get_players() {
            // TODO: ws getter from the server

        },
        set_player() {
            // TODO: ws setter to the server
        },
    }
});