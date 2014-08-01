var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {result:''});
});

router.post('/', function(req, res) {
    var name = req.body.name;
    res.redirect(name);
});


router.get('/wordSettings', function(req, res) {
    console.log(req);
    var wordsDB = fs.readFileSync('database.json', 'utf-8');
    wordsDB = JSON.parse(wordsDB);

    res.render('wordSettings', {words :wordsDB, message: '' });
});

router.post('/wordSettings', function(req, res){
    var wordsDB = fs.readFileSync('database.json', 'utf-8');
    var word = req.body.word || '',
        letter = req.body.letter || '',
        message = '';
        wordsDB = JSON.parse(wordsDB);

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

        wordsDB[letter].push(word);
        fs.truncateSync('database.json', 0);
        fs.writeFileSync('database.json', JSON.stringify(wordsDB));
        message = 'Successfully added'
    } else if (!message) {
        message = 'Entered word must start with given letter'
    }
    res.render('wordSettings', {words :wordsDB, message: message });
});

router.get('/:name', function(req, res){
    var wordsDB = fs.readFileSync('database.json', 'utf-8');
    wordsDB = JSON.parse(wordsDB);
    var name = req.params.name;
    var result = [];
    if(/^[A-z]+$/.test(name)){
        for(var i in name){
            result.push([name[i].toUpperCase()] + '-'+wordsDB[name[i].toUpperCase()][Math.floor(Math.random() * wordsDB[name[i].toUpperCase()].length)])
        }
    }
console.log(result);
    res.render('index', { result:result });
})

module.exports = router;
