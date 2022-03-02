const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const table = document.getElementById('table');

let myLibrary = [];
let bookCounter = 0;
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
  myLibrary.push(newBook);
  
  // let tableRow = table.insertRow(-1);
  // let cell1 = tableRow.insertCell(0);
  // let cell2 = tableRow.insertCell(1);
  // let cell3 = tableRow.insertCell(2);
  // let cell4 = tableRow.insertCell(3);
  // let cell5 = tableRow.insertCell(4);
  // cell1.textContent = myLibrary[bookCounter].title;
  // cell2.textContent = myLibrary[bookCounter].author;
  // cell3.textContent = myLibrary[bookCounter].pages;
  // cell4.textContent = myLibrary[bookCounter].read;

  for(i = bookCounter; i < myLibrary.length; i++) {
    let tableRow = table.insertRow(-1);
    let cell1 = tableRow.insertCell(0);
    let cell2 = tableRow.insertCell(1);
    let cell3 = tableRow.insertCell(2);
    let cell4 = tableRow.insertCell(3);
    let cell5 = tableRow.insertCell(4);
    cell1.textContent = myLibrary[i].title;
    cell2.textContent = myLibrary[i].author;
    cell3.textContent = myLibrary[i].pages;
    cell4.textContent = myLibrary[i].read;

    bookCounter += 1;
  }
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