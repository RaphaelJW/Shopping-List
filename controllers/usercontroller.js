const User = require("../models/user");
const async = require("async")
const shoppingitem = require ("../models/shopping-item")

//Laat de lijst zien van een gebruiker
exports.user_detail = (req, res, next) => {
  async.parallel(
    {
      user(callback){
        User.findById(req.params.id).exec(callback)
      },
      user_items(callback){
        shoppingitem.find({ user: req.params.id }, "name count shoppingstatus").exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        // No results.
        const err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      res.render("usershoppinglist",{
        title: "Shopping List",
        useritems: results.user_items,
        userresult: results.user
      });
    }
  )
}

//Laadt de inlogpagina
exports.user_login = (req, res) =>{
  res.render("login",{
    title: "login"
  })
}
