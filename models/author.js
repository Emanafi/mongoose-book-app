    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var AuthorSchema = new Schema({
      name: String,
      alive: {
      	type: String,
      	default: "alive"
      },
      image: String,
    });

    var Author = mongoose.model('Author', AuthorSchema);

    module.exports = Author;