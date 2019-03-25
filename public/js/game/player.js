define(['view', 'log'], (view, log) => {

    let colors = [
            "#b22",
            "#2b2",
            "#bb2",
            "#22b",
            "#b2b",
            "#2bb",
        ],

        Player = function (name) {
            this.name = name;
            this.width = 32;
            this.height = 64;
            this.pos = { X: 0, Y: 0 };
            this.velocity = { X: 15, Y: 15 };
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


    Player.prototype.Shoot = function (position) {

        view.bullets.push(position);

        this.score++;

        log.write('combat', `<span style="color:${this.color}">${this.name}</span> makes a shot.score: ${this.score}`);
    };

    Player.prototype.Login = function () {
        this.id = view.players.length;
        this.color = colors[this.id];

        view.players.push(this);

        log.write('system', `<span style="color:${this.color}">${this.name}</span> LOGGED IN`);

    };


    return {
        init(name) {
            let gamer = new Player(name);

            gamer.Login();


            // TODO: gamer auth, connect, set props methods etc

            return gamer;
        },
        get_players() {
            // TODO: ws getter from the server

        },
        set_player() {
            // TODO: ws setter to the server
        }
    }
});