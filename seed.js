// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

  ////////////////////
  //  DATA
  ///////////////////

  var books_list = [
    {
      _id: 15,
      title: "The Four Hour Workweek",
      author: "Tim Ferriss",
      image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
      release_date: "April 1, 2007"
    },
    {
      _id: 16,
      title: "Of Mice and Men",
      author: "John Steinbeck",
      image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
      release_date: "Unknown 1937"
    },
    {
      _id: 17,
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
      release_date: "Unknown 1597"
    }
  ];


  var authors_list = [
    {
      name: "Harper Lee",
      alive: false
    },
    {
      name: "F Scott Fitzgerald",
      alive: false
    },
    {
      name: "Victor Hugo",
      alive: false
    },
    {
      name: "Jules Verne",
      alive: false
    },
    {
      name: "Sheryl Sandberg",
      alive: true
    },
    {
      name: "Tim Ferriss",
      alive: true
    },
    {
      name: "John Steinbeck",
      alive: false
    },
    {
      name: "William Shakespeare",
      alive: false
    }
  ];

  // var books_list = [];


db.Author.deleteMany({}, function(err, authors) {
  console.log('removed all authors');
  db.Author.create(authors_list, function(err, authors){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all authors');
    console.log("created", authors.length, "authors");


    db.Book.deleteMany({}, function(err, books){
      console.log('removed all books');
      books_list.forEach(function (bookData) {
        var book = new db.Book({
          title: bookData.title,
          image: bookData.image,
          releaseDate: bookData.releaseDate
        });
        db.Author.findOne({name: bookData.author}, function (err, foundAuthor) {
          console.log('found author ' + foundAuthor.name + ' for book ' + book.title);
          if (err) {
            console.log(err);
            return;
          }
          book.author = foundAuthor;
          book.save(function(err, savedBook){
            if (err) {
              console.log(err);
            }
            console.log('saved ' + savedBook.title + ' by ' + foundAuthor.name);
          });
        });
      });
    });

  });
});



// // remove all records that match {} -- which means remove ALL records
// db.Book.remove({}, function(err, books){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all books');

//     // create new records based on the array books_list
//     db.Book.create(books_list, function(err, books){
//       if (err) { return console.log('err', err); }
//       console.log("created", books.length, "books");
//       process.exit();
//     });
//   }
// });
