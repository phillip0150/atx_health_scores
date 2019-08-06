const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("in find by all:" + req);
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
    console.log("in find by email:" + req);
    db.User
      .findOne({email: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("in find by id:" + req);
    db.User
      .findOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("req: "+ JSON.stringify(req.body.favs));
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$push: {favs: req.body.favs}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  removeFav: function(req,res){
    console.log(req);
    db.User
    .findOneAndUpdate({ _id: req.params.id }, {$pullAll: {favs: [req.body.favs]}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};
