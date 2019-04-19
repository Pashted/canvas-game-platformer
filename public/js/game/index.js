require.config({
    baseUrl: '/js/game',
    paths:   {
        jquery: '/node_modules/jquery/dist/jquery.min',
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

