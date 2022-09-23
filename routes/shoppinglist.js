var express = require('express');
var router = express.Router();

var item_controller = require("../controllers/shoppingitemcontroller");

router.get('/', item_controller.index);

router.get('/item/:id', item_controller.item_details);

router.get('/items', item_controller.item_list);

router.get('/items', item_controller.index)

router.post('/items', item_controller.item_create_post);

router.patch('/item/:id', item_controller.item_update_patch);

router.delete('/item/:id', item_controller.item_update_delete);

module.exports = router;