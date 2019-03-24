let express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', { title: 'Platformer' });

});
router.get('/ship/', function (req, res, next) {

    res.render('starship', { title: 'Starship' });

});
router.get('/video/', function (req, res, next) {

    res.render('video', { title: 'Express' });

});
router.get('/map/', function (req, res, next) {

    res.render('map', { title: 'Express' });

});

module.exports = router;
