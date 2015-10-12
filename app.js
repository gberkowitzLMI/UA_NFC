var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

var cart = require('./Cart.js');


app.get('/scanItem', function(req,res){
    var item = req.query.item;
    var index = cart.items.indexOf(item);
    if(index != -1)
        cart.items.splice(index,1);
    else {
        cart.items.push(item)
    }
});