define(['view', 'player'], (view, player) => {

    /**
     * TODO: gamers stack with ids for login
     *  db for saving stats
     *  stats loader
     */

    let app = {


        init() {
            let p1 = player.init('Вася');
            let p2 = player.init('Петя');


            view.init();
            // this.ctx.rect(0, 0, 700, 550);
            // this.ctx.fillStyle = "#aaa";
            // this.ctx.fill();

            let shooting, mousePos;

            view.$ctx.on({

                mousedown(e) {
                    if (e.which !== 1) // != ЛКМ
                        return false;

                    mousePos = { X: e.offsetX, Y: e.offsetY };

                    p1.Shoot(mousePos);
                    shooting = setInterval(() => p1.Shoot(mousePos), 100);
                },

                mousemove:   e => mousePos = { X: e.offsetX, Y: e.offsetY },
                mouseup:     () => clearInterval(shooting),
                contextmenu: () => false,
            });

            $(document).on({
                /**
                 * W - 87
                 * A - 65
                 * S - 83
                 * D - 68
                 * Up - 38
                 * Down - 40
                 * Left - 37
                 * Right - 39
                 * Space - 32
                 * @param e
                 */
                keydown(e) {
                    switch (e.which) {
                        case 65:
                        case 37:
                            p1.state.move_left = true;
                            p1.state.move_right = false;
                            break;
                        case 68:
                        case 39:
                            p1.state.move_right = true;
                            p1.state.move_left = false;
                            break;
                        case 83:
                        case 40:
                            p1.state.move_down = true;
                            p1.state.move_up = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            p1.state.move_up = true;
                            p1.state.move_down = false;
                            break;
                        default:
                            console.log(e.which);
                        // return false
                    }
                },
                keyup(e) {

                    switch (e.which) {
                        case 65:
                        case 37:
                            p1.state.move_left = false;
                            break;
                        case 68:
                        case 39:
                            p1.state.move_right = false;
                            break;
                        case 83:
                        case 40:
                            p1.state.move_down = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            p1.state.move_up = false;
                            break;
                        default:
                            console.log(e.which);
                        // return false
                    }
                }
            })

        }


    };

    app.init();

});
