require.config({
    baseUrl: '/js/game',
    paths:   {
        jquery: '/jquery',
        io:     '/socket.io/socket.io',
    }
});

require(
    ['jquery'],
    () => require(
        ['main'],
        app => app.init()
    )
);

