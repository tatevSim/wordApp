var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var words = new Schema({
    A    : Array,
    B    : Array,
    C    : Array,
    D    : Array,
    E    : Array,
    F    : Array,
    G    : Array,
    H    : Array,
    I    : Array,
    J    : Array,
    K    : Array,
    L    : Array,
    M    : Array,
    N    : Array,
    O    : Array,
    P    : Array,
    Q    : Array,
    R    : Array,
    S    : Array,
    T    : Array,
    U    : Array,
    V    : Array,
    W    : Array,
    X    : Array,
    Y    : Array,
    Z    : Array

});

mongoose.model('words', words);
mongoose.connect( 'mongodb://localhost/wordApp' );

module.exports = mongoose;