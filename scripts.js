const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');
const cancelBtn = document.getElementById('cancelBtn');

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let newTitle = '';
let newAuthor = '';
let newPages = '';
let newRead = '';
let newBook = '';

// addDummyBooks();

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
  populateTable();
}

function deleteBook() {
  table.deleteRow(bookTag + 1);
  myLibrary.splice(bookTag, 1);
  resetBookTag();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function resetBookTag() {
  for(i = 0; i < myLibrary.length; i++)  {
    let tableRow = table.rows[i + 1];
    tableRow.dataset.bookTag = [i];
  }
}

function populateTable() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    for(i = table.rows.length - 1; i < myLibrary.length; i++) {
    let tableRow = table.insertRow(-1);
    tableRow.dataset.bookTag = [i];
    let cell1 = tableRow.insertCell(0);
    let cell2 = tableRow.insertCell(1);
    let cell3 = tableRow.insertCell(2);
    let cell4 = tableRow.insertCell(3);
    let cell5 = tableRow.insertCell(4);
    let button = document.createElement('input');
    cell1.textContent = myLibrary[i].title;
    cell2.textContent = myLibrary[i].author;
    cell3.textContent = myLibrary[i].pages;
    cell4.textContent = myLibrary[i].read;
    button.type = "button";
    button.className = "deleteBtn";
    button.value = "Delete"
    button.onclick = function() {
      bookTag = parseInt(tableRow.dataset.bookTag);
      deleteBook();
    }
    cell5.appendChild(button);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
});

function addDummyBooks()  {
  const book1 = new book('Atlas Shrugged', 'Ayan Rand', 1853, true);
  const book2 = new book('The Unbound Soul', 'Richard L. Haight', 251, true);
  const book3 = new book('Psycho-Cybernetics', 'Maxwell Maltz', 336, true);
  const book4 = new book('Fountainhead', 'Ayan Rand', 961, true);
  const book5 = new book('Book 5', 'Ayan Rand', 1853, true);
  const book6 = new book('Book 6', 'Richard L. Haight', 251, true);
  const book7 = new book('Book 7', 'Maxwell Maltz', 336, true);
  const book8 = new book('Book 8', 'Ayan Rand', 961, true);
  
  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
  myLibrary.push(book4);
  myLibrary.push(book5);
  myLibrary.push(book6);
  myLibrary.push(book7);
  myLibrary.push(book8);
}