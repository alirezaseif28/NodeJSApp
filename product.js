var mongoos = require('mongoose');

var Schema = mongoos.Schema;

var  productSchema = new Schema({
    title : String,
    price: Number,
    instock:Boolean,
    photo:String
});

module.exports = mongoos.model('Product',productSchema);