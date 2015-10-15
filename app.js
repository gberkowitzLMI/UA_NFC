var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var config = require('./config.js');
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

var mongooseURI = process.env.MONGOLAB_URI || 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.database
mongoose.connect(mongooseURI);

app.use('/images',express.static('images'));

require('./Cart.js');
var Cart = mongoose.model('Cart');

app.get('/scanItem', function(req,res){
    
    Cart.findOne({}, function(err,cart){
        if(!cart)
            cart = new Cart({items:[]});

        var item = req.query.item;
        var index = cart.items.indexOf(item);
        if(index != -1){
            cart.items.splice(index,1);
            io.emit('itemRemoved', item);
        }
        else {
            cart.items.push(item);
            io.emit('itemAdded', item);
        }
        cart.save();
        res.end();
    });
});

app.get('/cart', function(req,res){
    Cart.findOne({}, function(err,cart){
        if(!cart)
            cart = new Cart({items:[]});
        res.json({"cart":cart.items});
        res.end();
    });
});

app.get('/', function(req,res){
    res.sendFile(__dirname +'/index.html');
});