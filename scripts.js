const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let newTitle = '';
let newAuthor = '';
let newPages = '';
let newRead = '';
let newBook = '';

// localStorage.clear();

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

if(myLibrary.length > table.rows.length -1) {
  for(i = table.rows.length -1; i < myLibrary.length; i++) {
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
  }
}

function addBookToLibrary() {
  newBook = new book(newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  for(i = table.rows.length -1; i < myLibrary.length; i++) {
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
  }
}

addBtn.addEventListener('click', () => {
  console.log("clicked");
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
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
