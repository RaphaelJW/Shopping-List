var express = require('express');
var router = express.Router();

var item_controller = require("../controllers/shoppingitemcontroller");

router.get('/', item_controller.index);

router.get('/item/:id', item_controller.item_details);

router.get('/items', item_controller.item_list);

router.post('/', item_controller.item_create_post);

router.post('/item/:id', item_controller.item_update_post);

module.exports = router;