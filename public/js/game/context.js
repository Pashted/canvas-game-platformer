define(() => {
    return {
        $c: $('#canvas'), c: {},

        init() {
            this.set_context();
        },

        set_context() {
            this.c = this.$c[0].getContext('2d');
        },

        draw_bullet(mouse) {
            this.c.fillStyle = "#000000";
            this.c.beginPath();
            this.c.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI);
            this.c.fill();
        },

        get_mouse_pos(e) {
            return {
                x: e.offsetX,
                y: e.offsetY
            };
        }
    }
});