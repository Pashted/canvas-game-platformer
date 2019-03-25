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
        players: [],

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

            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].state.move_left)
                    this.players[i].moveLeft();
                else if (this.players[i].state.move_right)
                    this.players[i].moveRight();

                if (this.players[i].state.move_up)
                    this.players[i].moveUp();
                else if (this.players[i].state.move_down)
                    this.players[i].moveDown();

                if (this.players[i].pos.Y + this.players[i].height >= this.ctx.canvas.height)
                    this.players[i].pos.Y = this.ctx.canvas.height - this.players[i].height;

                else if (this.players[i].pos.Y <= 0)
                    this.players[i].pos.Y = 0;

                if (this.players[i].pos.X + this.players[i].width >= this.ctx.canvas.width)
                    this.players[i].pos.X = this.ctx.canvas.width - this.players[i].width;

                else if (this.players[i].pos.X <= 0)
                    this.players[i].pos.X = 0;
            }

        },

        /**
         * ГРАФИКА
         */
        render() {
            this.ctx.fillStyle = "#aaa";
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


            for (let i = 0; i < this.players.length; i++) {
                this.draw(this.players[i]);
            }
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