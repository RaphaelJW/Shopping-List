#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return;
}

var async = require('async');
var ShoppingItem = require('./models/shopping-item');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var ShoppingItems = [];

function ItemCreate(product, count, shoppingStatus, cb)
{
    shoppingItemDetail = {
        name: product,
        count: count,
        shoppingstatus: shoppingStatus
    };
    var shoppingitem = new ShoppingItem(shoppingItemDetail);
    shoppingitem.save((err) => {
        if(err) {
            cb(err, null);
        }
        console.log('New Item: ' + shoppingitem);
        ShoppingItems.push(shoppingitem);
        cb(null, shoppingitem);
    });
}

function CreateItems(cb)
{
    async.parallel([
        (callback) => {
            ItemCreate("bananen", 20, false, callback);
        },
        (callback) => {
            ItemCreate("appels", 8, false, callback);
        },
        (callback) => {
            ItemCreate("Hagelslag", 2, false, callback);
        }
    ], cb);
}

async.series([CreateItems], (err, res) => {
    if(err){
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log("New item created: "+ res);
        mongoose.connection.close();
    }
})