define(() => {

    return {
        clog: $('#combat-log'),
        flog: $('#fps-log'),

        write(type, text) {
            let line = $(`<p class="${type}">${text}</p>`)
                .prependTo(this.clog);

            setTimeout(
                () => line.fadeOut(
                    1000,
                    () => line.remove()
                ),
                7000
            );
        },

        Fps(frames) {
            this.flog.text(frames);
        },
    }
});