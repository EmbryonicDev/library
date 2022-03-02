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