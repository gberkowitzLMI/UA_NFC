var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    items: [String]
});

var Cart = mongoose.model('Cart', cartSchema);

var cart = new Cart({items:[]});

module.exports.Cart = cart;