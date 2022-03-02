const addBtn = document.getElementById('addBtn');
let myLibrary = [];

// Object constructor
function book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  
  this.bookInfo = function() {
    return(`${this.title} by ${this.author} , ${this.pages} pages, ${this.read}`);
  }
}

function addBookToLibrary() {
  
}

addBtn.addEventListener('click', () => {
  console.log("clicked");
  const form = document.getElementById('form');
  form.style.visibility = "visible";
})

// Dummy Books
const book1 = new book('Atlas Shrugged', 'Ayan Rand', 1853, true);
const book2 = new book('The Unbound Soul', 'Richard L. Haight', 251, true);
const book3 = new book('Psycho-Cybernetics', 'Maxwell Maltz', 336, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
console.log(myLibrary)