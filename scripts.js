const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');
const cancelBtn = document.getElementById('cancelBtn')

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

// Adds books in myLibrary from local storage
if(myLibrary.length > table.rows.length -1) {
    populateTable();
}

function addBookToLibrary() {
  newBook = new book(title.value, author.value, pages.value, read.value);
  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  populateTable();
}

function populateTable() {
  for(i = table.rows.length -1; i < myLibrary.length; i++)  {
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
    const deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.className = "deleteBtn";
    deleteBtn.value = "Delete"
    cell5.appendChild(deleteBtn);
  }
}

addBtn.addEventListener('click', () => {
  form.style.visibility = "visible";
  clearForm();
})

cancelBtn.addEventListener('click', () => {
  form.style.visibility = "hidden";
  clearForm();
})

function clearForm()  {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.visibility = 'hidden';
  addBookToLibrary();
})
