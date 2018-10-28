var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app", { useNewUrlParser: true });   
// the mongoose.connect line above  needs to happen exactly once in your code
// move it from book.js to index.js  :)

module.exports.Book = require("./book.js");
module.exports.Author = require("./author.js");