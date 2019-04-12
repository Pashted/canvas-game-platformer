define(['view', 'player'], (view, player) => {

    /**
     * TODO: gamers stack with ids for login
     *  db for saving stats
     *  stats loader
     */

    return {

        init() {
            view.init();
            player.init()
                .then(() => this.game_start());

        },

        game_start() {
            console.log('GAME START');
            // TODO: вынести обработчики этих событий в модуль control
            let shooting, mousePos;

            view.$ctx.on({

                mousedown(e) {
                    if (e.which !== 1) // != ЛКМ
                        return false;

                    mousePos = { X: e.offsetX, Y: e.offsetY };

                    player.char.shoot(mousePos);
                    shooting = setInterval(() => player.char.shoot(mousePos), 100);
                },

                "mouseup mouseout": () => clearInterval(shooting),

                contextmenu:        () => false,

                mousemove:          e => mousePos = { X: e.offsetX, Y: e.offsetY }
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
                            player.char.state.move_left = true;
                            player.char.state.move_right = false;
                            break;
                        case 68:
                        case 39:
                            player.char.state.move_right = true;
                            player.char.state.move_left = false;
                            break;
                        case 83:
                        case 40:
                            player.char.state.move_down = true;
                            player.char.state.move_up = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            player.char.state.move_up = true;
                            player.char.state.move_down = false;
                            break;
                        default:
                            console.log(e.which);
                    }
                },
                keyup(e) {

                    switch (e.which) {
                        case 65:
                        case 37:
                            player.char.state.move_left = false;
                            break;
                        case 68:
                        case 39:
                            player.char.state.move_right = false;
                            break;
                        case 83:
                        case 40:
                            player.char.state.move_down = false;
                            break;
                        case 87:
                        case 38:
                        case 32:
                            player.char.state.move_up = false;
                            break;
                        default:
                            console.log(e.which);
                    }
                }
            })
        },

        game_over() {

        }

    };

});
