var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {result: ''});
});

router.post('/', function (req, res) {
    var name = req.body.name;
    res.redirect(name);
});


router.get('/wordSettings', function (req, res) {
    var db = req.app.get('db');
    var words = db.model('words');

    words.find({}, '-_id -__v').exec(function (err, result) {
        var wordsDB = result[0].toObject();


        res.render('wordSettings', {words: wordsDB, message: '' });
    });


});

router.post('/wordSettings', function (req, res) {
    var wordsDB = {};

    var db = req.app.get('db');
    var words = db.model('words');

    words.find({}, '-_id -__v').exec(function (err, result) {
        wordsDB = result[0].toObject();


        var word = req.body.word || '',
            letter = req.body.letter || '',
            message = '';

        if (word == '') {
            message = 'Please enter the word'
        } else {
            for (var w in wordsDB[letter]) {
                if (word.toLowerCase() === wordsDB[letter][w].toLowerCase()) {
                    message = "Entered word already exists"
                    break;
                }
            }
        }

        if (message == '' && word[0].toLowerCase() === letter.toLowerCase()) {


            var resArray = result[0].toObject()[letter];
            resArray.push(word);
            var object = {};
            object[letter] = resArray;
            //wordsDB[letter] = resArray;

            message = 'Successfully added';

            words.update({}, {$set: object}, function (err, res) {

            });


        } else if (!message) {
            message = 'Entered word must start with given letter'
        }
        res.render('wordSettings', {words: object, message: message });
    });
});

router.get('/:name', function (req, res) {
    var wordsDB = {};

    var db = req.app.get('db');
    var words = db.model('words');

    words.find({}, '-_id -__v').exec(function (err, result) {

    wordsDB = result[0].toObject();

    var name = req.params.name;
    var result = [];
    if (/^[A-z]+$/.test(name)) {
        for (var i in name) {
            result.push([name[i].toUpperCase()] + '-' + wordsDB[name[i].toUpperCase()][Math.floor(Math.random() * wordsDB[name[i].toUpperCase()].length)])
        }
    }
    res.render('index', { result: result });
    })
})


module.exports = router;