define(['view', 'player'], (view, player) => {

    /**
     * TODO: gamers stack with ids for login
     *  db for saving stats
     *  stats loader
     */

    let app = {


        init() {
            let $player = player.init();


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

                    $player.shoot(mousePos);
                    shooting = setInterval(() => $player.shoot(mousePos), 100);
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
                            $player.state.move_left = true;
                            $player.state.move_right = false;
                            break;
                        case 68:
                        case 39:
                            $player.state.move_right = true;
                            $player.state.move_left = false;
                            break;
                        case 83:
                        case 40:
                            $player.state.move_down = true;
                            $player.state.move_up = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            $player.state.move_up = true;
                            $player.state.move_down = false;
                            break;
                        default:
                            console.log(e.which);
                    }
                },
                keyup(e) {

                    switch (e.which) {
                        case 65:
                        case 37:
                            $player.state.move_left = false;
                            break;
                        case 68:
                        case 39:
                            $player.state.move_right = false;
                            break;
                        case 83:
                        case 40:
                            $player.state.move_down = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            $player.state.move_up = false;
                            break;
                        default:
                            console.log(e.which);
                    }
                }
            })

        },


    };

    app.init();

});
