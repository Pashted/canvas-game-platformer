let express = require('express'),
    router = express.Router(),
    fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', { title: 'Platformer' });

});

router.get('/jquery.js', (req, res, next) =>
    fs.readFile("./node_modules/jquery/dist/jquery.js", 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
);
router.get('/require.js', (req, res, next) =>
    fs.readFile("./node_modules/requirejs/require.js", 'utf8', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
);
module.exports = router;
