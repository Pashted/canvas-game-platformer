define(['log'], (log) => {

    let requestAnimFrame = (() => {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 20);
            };
    })();

    return {
        $ctx:    $('#canvas'), ctx: {},
        bullets: [],
        players: {},

        fps:  0,
        rate: 4, // сколько раз в сек обновлять счетчик фпс

        init() {
            this.ctx = this.$ctx[0].getContext('2d');

            // console.log(this.ctx);

            setInterval(() => {
                log.Fps(this.fps * this.rate);
                this.fps = 0;
            }, 1000 / this.rate);

            this.game();
        },

        /**
         * ФИЗИКА
         */
        update() {

            if (!this.players.main)
                return;

            // ограничитель до краев карты

            if (this.players.main.pos.Y + this.players.main.height >= this.ctx.canvas.height)
                this.players.main.pos.Y = this.ctx.canvas.height - this.players.main.height;

            if (this.players.main.pos.Y <= 0)
                this.players.main.pos.Y = 0;

            if (this.players.main.pos.X + this.players.main.width >= this.ctx.canvas.width)
                this.players.main.pos.X = this.ctx.canvas.width - this.players.main.width;

            if (this.players.main.pos.X <= 0)
                this.players.main.pos.X = 0;

            if (this.players.main.state.move_left)
                this.players.main.moveLeft();
            if (this.players.main.state.move_right)
                this.players.main.moveRight();

            if (this.players.main.state.move_up)
                this.players.main.moveUp();
            if (this.players.main.state.move_down)
                this.players.main.moveDown();


        },

        /**
         * ГРАФИКА
         */
        render() {
            this.ctx.fillStyle = "#aaa";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


            for (let id in this.players) {
                if (id === 'main')
                    continue;
                this.draw(this.players[id]);
            }

            if (this.players.main)
                this.draw(this.players.main);

            for (let i = 0; i < this.bullets.length; i++) {
                this.draw_bullet(this.bullets[i]);
            }
        },

        /**
         * ИГРОВОЙ ЦИКЛ
         */
        game() {
            this.fps++;

            this.update();
            this.render();
            requestAnimFrame(() => {
                this.game()
            });
        },

        /**
         * Рисвание пули
         * @param obj
         */
        draw_bullet(obj) {

            this.ctx.fillStyle = "#333";
            this.ctx.beginPath();
            this.ctx.arc(obj.X, obj.Y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        },

        draw(obj) {
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(obj.pos.X, obj.pos.Y, obj.width, obj.height);
        }

    }
});