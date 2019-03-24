define(['context', 'combat_log'], (ctx, clog) => {
    let Player = function (name) {
        this.name = name;
    };

    Player.prototype.login = function() {
        console.log(this.name + ' LOGGED IN');
    };

    Player.prototype.shoot = function(e) {
        let mouse = ctx.get_mouse_pos(e);

        ctx.draw_bullet(mouse);

        clog.write(this.name + ' make a shot');
    };

    return {
        init(name) {
            let gamer = new Player(name);

            gamer.login();
            // gamer auth, connect, set props methods etc

            return gamer;
        },
    }
});