var async = require("async")
var ShoppingItem = require("../models/shopping-item");


exports.index = (req, res) =>{
    async.parallel({
        item_count: (callback) => {
            ShoppingItem.countDocuments({}, callback);
        }
    }, (err, results) => {
        res.render("index", {title: "Home", error: err, data: results})
    });
    
}

exports.item_list = (req, res) =>{
    ShoppingItem.find({}, "name count").exec((err, result) =>{
        if(err) {return next(err);}
        res.render("shoppinglist", { title: "Shopping List", shoppingItems: result});
    });
}

exports.item_details = (req, res) =>{
    res.send("NOT IMPLEMENTED: shopping item details: " + req.params.id);
}

exports.item_create_post = (req, res) =>{
    res.setHeader("Content-type", "application/json");
    var data = {
        name: req.body.item,
        count: req.body.amount,
        shoppingstatus: false,
    }
    var shoppingItem = new ShoppingItem(data);
    shoppingItem.save((err) =>
    {
        if(err){
            res.status(424).send(JSON.stringify({succes: false, body: req.body, error: err}));
        }
        res.status(201).send(JSON.stringify({succes: true, body: req.body}));
    })
}

exports.item_update_post = (req, res) =>{
    res.send("NOT IMPLEMENTED: update existing item");
}
