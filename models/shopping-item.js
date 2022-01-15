var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shoppingItemSchema = new Schema({
    name: {type: String, required: true},
    count: {type: Number, min: 1,  default: 1},
    shoppingstatus: {type: Boolean, default: false}
})

module.exports = mongoose.model('ShoppingItem', shoppingItemSchema);

