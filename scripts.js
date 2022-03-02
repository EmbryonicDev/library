const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

let myLibrary = [];
let newTitle = '';
let newAuthor = '';
let newPages = '';
let newRead = '';
let newBook = '';

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
  newBook = new book(newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook)
}

addBtn.addEventListener('click', () => {
  console.log("clicked");
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  const form = document.getElementById('form');
  form.style.visibility = "visible";
})

const formData = new FormData(document.querySelector('form'));
console.log(formData);

// function handleSubmit(e) {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const formProps = Object.fromEntries(formData);
// }

const check = (e) => {
  const form = new FormData(e.target);
  const title = form.get("title");
  console.log(title);
  return false
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.visibility = 'hidden';
  newTitle = title.value;
  newAuthor = author.value;
  newPages = pages.value;
  newRead = read.value;
  addBookToLibrary();
  console.log(myLibrary);
})

// Dummy Books
const book1 = new book('Atlas Shrugged', 'Ayan Rand', 1853, true);
const book2 = new book('The Unbound Soul', 'Richard L. Haight', 251, true);
const book3 = new book('Psycho-Cybernetics', 'Maxwell Maltz', 336, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
// console.log(myLibrary)