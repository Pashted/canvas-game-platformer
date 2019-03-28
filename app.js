let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),

    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),

    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/video', indexRouter);
app.use('/map', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? {} : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


let webSocket = require('ws'),
    clients = {},
    players = {},
    webSocketServer = new webSocket.Server({ port: 8081 });


webSocketServer.on('connection', function (ws) {

    let id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    players[id] = {};

    ws.send(JSON.stringify(players));

    ws.on('message', function (message) {
        let $msg = JSON.parse(message),
            response = {};

        console.log('получено сообщение ' + $msg);

        if ($msg.name) {

            players[id] = {
                name:     $msg.name,
                status:   'player',
                color_id: 0
            };
            response = {
                type:   'new_login',
                player: players[id]
            }
        }


        for (let key in clients) {
            clients[key].send(JSON.stringify(response));
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
        delete players[id];
    });

});

module.exports = app;
