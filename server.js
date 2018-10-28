// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

  //import models module
  var db = require('./models')

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));






var newBookUUID = 18;



////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find()
    // populate fills in the author id with all the author data
    .populate('author')
    .exec(function(err, books){
      if (err) { console.log("index error: " + err); }
      res.json(books);
    });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new db.Book({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });

  // this code will only add an author to a book if the author already exists
  db.Author.findOne({name: req.body.author}, function(err, author){

    if(author === null) {

      db.Author.create({
        name: req.body.author,
        alive: '',
        image: '',
      }, function(err, newAuthor) {
        console.log(newAuthor);
        if(err) {
          console.log('Creating new author error: ' + err);
        }
        newBook.author = newAuthor;
      });

    } else {
      newBook.author = author;
    }

    // add newBook to database
    newBook.save(function(err, book){
      if (err) {
        console.log("create error: " + err);
      }
      console.log("created ", db.Book.title);
      res.json(book);
    });
  });

});


// delete book
app.delete('/api/books/:id', function (req, res) {
  console.log('books delete', req.params);
  var bookId = req.params.id;
  db.Book.findByIdAndRemove(bookId, (err, deletedBook) => {
    if(err) {
      console.log('Deleting book: ' + err);
    }
    res.json(deletedBook);
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});




/*// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find((err, books) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  var requestedBook = req.params.id;

  db.Book.findById(requestedBook, (err, books) => {
    if(err) {
      console.log("FindById error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  })
  // console.log('books show', req.params);
  // for(var i=0; i < books.length; i++) {
  //   if (books[i]._id === req.params.id) {
  //     res.json(books[i]);
  //     break; // we found the right book, we can stop searching
  //   }
  // }
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('books create', req.body);
  var newBook = req.body;
  // newBook._id = newBookUUID++;
  //second arg in callback is the new book
  db.Book.create(newBook, (err, savedBook) => {
    if(err) {
      console.log("Create error: " + err);
    }
    res.json(savedBook);
  })
  // books.push(newBook);
  // res.json(newBook);
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  // var updateBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('updating book with index', deleteBookIndex);
  // var bookToUpdate = books[deleteBookIndex];
  // books.splice(updateBookIndex, 1, req.params);
  // res.json(req.params);
  db.Book.findOneAndUpdate(bookId, { $set: { title: 'Successfully Updated' }},(err, updatedBook) => {
    if(err) {
      console.log('Update error: ' + err);
      }
      res.json(updatedBook);
    })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  // var deleteBookIndex = books.findIndex(function(element, index) {
  //   return (element._id === parseInt(req.params.id)); //params are strings
  // });
  // console.log('deleting book with index', deleteBookIndex);
  // var bookToDelete = books[deleteBookIndex];
  // books.splice(deleteBookIndex, 1);
  // res.json(bookToDelete);
  db.Book.findByIdAndRemove(bookId, (err, deletedBook) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(deletedBook);
  })
});*/
