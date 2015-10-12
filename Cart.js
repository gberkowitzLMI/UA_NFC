var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    items: [String]
});

var Cart = mongoose.model('Cart', cartSchema);

module.exports.Cart = Cart;