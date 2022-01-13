var ShoppingItem = require("../models/shopping-item");

exports.index = (req, res) =>{
    res.send("NOT IMPLEMENTED: HomePage");
}

exports.item_list = (req, res) =>{
    res.send("NOT IMPLEMENTED: shopping list")
}

exports.item_details = (req, res) =>{
    res.send("NOT IMPLEMENTED: shopping item details: " + req.params.id);
}

exports.item_create_post = (req, res) =>{
    res.send("NOT IMPLEMENTED: new item posted on shopping list");
}

exports.item_update_post = (req, res) =>{
    res.send("NOT IMPLEMENTED: update existing item");
}
