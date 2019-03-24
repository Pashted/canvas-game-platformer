define(['context', 'player'], (ctx, player) => {

    /**
     * TODO: gamers stack with ids for login
     *  db for saving stats
     *  stats loader
     */

    let app = {


        init() {
            ctx.init();
            let p1 = player.init('Вася');
            console.log(p1);
            console.log(ctx.c);
            // this.ctx.rect(0, 0, 700, 550);
            // this.ctx.fillStyle = "#aaa";
            // this.ctx.fill();

            ctx.$c.click((e) => p1.shoot(e));
        }


    };
    app.init();

});
