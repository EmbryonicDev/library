const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');
const cancelBtn = document.getElementById('cancelBtn');
const formCheckbox = document.getElementById('formCheckbox');

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let newBook = '';

// addDummyBooks();

// Object constructor
function book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
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
    for(i = table.rows.length - 1; i < myLibrary.length; i++) {
    let tableRow = table.insertRow(-1);
    tableRow.dataset.bookTag = [i];
    let cell1 = tableRow.insertCell(0);
    let cell2 = tableRow.insertCell(1);
    let cell3 = tableRow.insertCell(2);
    let cell4 = tableRow.insertCell(3);
    let cell5 = tableRow.insertCell(4);
    cell1.textContent = myLibrary[i].title;
    cell2.textContent = myLibrary[i].author;
    cell3.textContent = myLibrary[i].pages;
    
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "tableCheckbox";
    // ↓ Make sure read status is updated after refresh ↓
    if(myLibrary[i].read === 'yes') {
      checkbox.checked = true;
    } 
    cell4.appendChild(checkbox);

    let button = document.createElement('input');
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
  read.checked = true;
  read.value = 'yes';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.visibility = 'hidden';
  addBookToLibrary();
});

formCheckbox.addEventListener('change', e => {
  if(e.target.checked)  {
    e.target.value = 'yes';
  } else{
    e.target.value = 'no';
  }
})

function addDummyBooks()  {
  const book1 = new book('Atlas Shrugged', 'Ayan Rand', 1853, 'yes');
  const book2 = new book('The Unbound Soul', 'Richard L. Haight', 251, 'yes');
  const book3 = new book('Psycho-Cybernetics', 'Maxwell Maltz', 336, 'yes');
  const book4 = new book('Fountainhead', 'Ayan Rand', 961, 'yes');
  const book5 = new book('Book 5', 'Ayan Rand', 1853, 'no');
  const book6 = new book('Book 6', 'Richard L. Haight', 251, 'yes');
  const book7 = new book('Book 7', 'Maxwell Maltz', 336, 'no');
  const book8 = new book('Book 8', 'Ayan Rand', 961, 'no');
  
  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
  myLibrary.push(book4);
  myLibrary.push(book5);
  myLibrary.push(book6);
  myLibrary.push(book7);
  myLibrary.push(book8);
}