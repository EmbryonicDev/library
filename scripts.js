const mainContainer = document.getElementById('mainContainer');
const btnContainer = document.getElementById('btnContainer');
const addBtn = document.getElementById('addBtn');
const suggestionBtn = document.getElementById('suggestionBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');
const cancelBtn = document.getElementById('cancelBtn');
const formCheckbox = document.getElementById('formCheckbox');
const tableCheckbox = document.querySelector('.tableCheckbox');

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let randomBookArray = JSON.parse(localStorage.getItem("randomBookArray")) || [];
let newBook = '';
let totalRead = '';
let totalUnread = '';
let buildSummaryCount = '';

// localStorage.clear();

// Object constructor
function book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// Set up myLibrary & hide table if empty
function firstTableBuild() {
  if (myLibrary.length > table.rows.length - 1) {
    populateTable();
    buildSummary();
    table.style.visibility = 'visible';
    clearAllBtn.style.visibility = 'visible';
  } else if (myLibrary.length == 0) {
    table.style.visibility = 'hidden';
    clearAllBtn.style.visibility = 'hidden';
    clearAllBtn.style.position = 'absolute';
  }
}
firstTableBuild();

function addBookToLibrary() {
  newBook = new book(title.value, author.value, pages.value, formCheckbox.value);
  myLibrary.push(newBook);
  buildSummary();
  populateTable();
}

function deleteBook() {
  table.deleteRow(bookTag + 1);
  myLibrary.splice(bookTag, 1);
  randomBookArray.splice(bookTag, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("randomBookArray", JSON.stringify(randomBookArray));
  resetBookTag();
  buildSummary();
}

// Resets each table row's "index" (data-book-tagk)
function resetBookTag() {
  for (i = 0; i < myLibrary.length; i++) {
    let tableRow = table.rows[i + 1];
    tableRow.dataset.bookTag = [i];
  }
}

function populateTable() {
  for (i = table.rows.length - 1; i < myLibrary.length; i++) {
    let tableRow = table.insertRow(-1);
    tableRow.dataset.bookTag = [i];
    let cell1 = tableRow.insertCell(0);
    let cell2 = tableRow.insertCell(1);
    let cell3 = tableRow.insertCell(2);
    let cell4 = tableRow.insertCell(3);
    let cell5 = tableRow.insertCell(4);
    let cell6 = tableRow.insertCell(5);
    cell1.innerText = parseInt([i]) + 1;
    cell2.innerText = myLibrary[i].title;
    cell3.innerText = myLibrary[i].author;
    cell4.innerText = myLibrary[i].pages;

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "tableCheckbox";
    // ↓ Make sure read status is updated after refresh ↓
    if (myLibrary[i].read === 'yes') {
      checkbox.checked = true;
    }
    checkbox.onchange = function () {
      bookTag = parseInt(tableRow.dataset.bookTag);
      updateReadStatus();
    }
    cell5.appendChild(checkbox);

    let button = document.createElement('input');
    button.type = "button";
    button.className = "deleteBtn";
    button.value = "Delete"
    button.onclick = function () {
      bookTag = parseInt(tableRow.dataset.bookTag);
      deleteBook();
    }
    cell6.appendChild(button);

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    localStorage.setItem("randomBookArray", JSON.stringify(randomBookArray));
  }
}

function clearForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  formCheckbox.checked = true;
  formCheckbox.value = 'yes';
}

function addDummyBooks() {
  let dummyArray = [];
  let arrayLength = randomBookArray.length;
  dummyArray.push(new book('To Kill a Mockingbird', 'Harper Lee', '281', 'no'));
  dummyArray.push(new book('The Great Gatsby', ' F. Scott Fitzgerald', '208', 'no'));
  dummyArray.push(new book('Ulysses', 'James Joyce', '730', 'no'));
  dummyArray.push(new book('The Catcher in the Rye', 'J.D Salinger', '277', 'no'));
  dummyArray.push(new book('Pride and Prejudice', 'Jane Austen', '432', 'no'));
  dummyArray.push(new book('Adventures of Huckleberry Finn', 'Mark Twain', '366', 'no'));
  dummyArray.push(new book('Alice’s Adventure in Wonderland', 'Lews Carroll', '1184', 'no'));
  dummyArray.push(new book('To the Lighthouse', 'Virginia Woolf', '320', 'no'));
  dummyArray.push(new book('The Sound and the Fury', 'William Faulkner', '326', 'no'));
  dummyArray.push(new book('Nineteen Eighty-four', 'George Orwell', '328', 'no'));
  dummyArray.push(new book('Great Expectations', 'Charles Dickens', '544', 'no'));
  dummyArray.push(new book('Absalom, Absalom!', 'William Faulkner', '384', 'no'));
  dummyArray.push(new book('Middlemarch', 'George Eliot', '880', 'no'));
  dummyArray.push(new book('Beloved', 'Toni Morrison', '324', 'no'));
  dummyArray.push(new book('The Invisible Man', 'Ralph Ellison', '581', 'no'));
  dummyArray.push(new book('Mrs. Dalloway', 'Virginia Woolf', '91', 'no'));
  dummyArray.push(new book('David Copperfield', 'Charles Dickens', '624', 'no'));
  dummyArray.push(new book('The Lord of the Rings', 'J.R.R Tolkien', '416', 'no'));
  dummyArray.push(new book('Frankenstein', 'Mary Shelley', '280', 'no'));
  dummyArray.push(new book('Things Fall Apart', 'Chinua Achebe', '224', 'no'));

  function noDuplicates(checkArray, key) {
    return [...new Map(checkArray.map(item => [item[key], item])).values()];
  }

  function randomBookToArrays() {
    let randomBook = dummyArray[Math.floor(Math.random() * dummyArray.length)];
    randomBookArray.push(randomBook);
    randomBookArray = noDuplicates(randomBookArray, "title");
    myLibrary.push(...randomBookArray);
    myLibrary = noDuplicates(myLibrary, "title");
  }

  // Add 5 suggested books while < 15 suggested books are in myLibrary
  if (randomBookArray.length <= 15) {
    while (randomBookArray.length < arrayLength + 5) {
      randomBookToArrays();
    }
  }
  // 15+ suggested books in myLibrary
  // Add up to 4 books to make suggested books in myLibrary = 20 
  if (randomBookArray.length > 15 && randomBookArray.length == arrayLength) {
    while (randomBookArray.length < 20) {
      randomBookToArrays();
    }
  }

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("randomBookArray", JSON.stringify(randomBookArray));
  console.log("Library length: " + myLibrary.length);
  firstTableBuild();
}

// Keeps the read-checkbox input after live update
function updateReadStatus() {
  const newArr = myLibrary.map(obj => {
    if (obj.title === myLibrary[bookTag].title) {
      if (myLibrary[bookTag].read == 'yes') {
        return { ...obj, read: "no" };
      } else if (myLibrary[bookTag].read == 'no') {
        return { ...obj, read: "yes" }
      }
    }
    return obj;
  })
  myLibrary = newArr;
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("randomBookArray", JSON.stringify(randomBookArray));
  buildSummary();
}

function buildSummary() {
  totalRead = (document.querySelectorAll('input[type="checkbox"]:checked').length);
  totalUnread = myLibrary.length - totalRead;
  if (buildSummaryCount < 1) {
    buildSummaryCount += 1;
    const summaryDiv = document.createElement('div');
    summaryDiv.setAttribute('id', 'summaryDiv');
    mainContainer.insertBefore(summaryDiv, mainContainer.firstChild);

    const summaryTotal = document.createElement('p');
    summaryTotal.innerText = "Total Books in Library: " + (totalUnread + totalRead);
    summaryTotal.setAttribute('id', 'summaryTotal');
    summaryDiv.append(summaryTotal);

    const summaryRead = document.createElement('p');
    summaryRead.setAttribute('id', 'summaryRead');
    summaryRead.innerText = "Books Read: " + totalRead;
    summaryDiv.append(summaryRead);

    const summaryUnread = document.createElement('p');
    summaryUnread.setAttribute('id', 'summaryUnread');
    summaryUnread.innerText = "Books Unread: " + totalUnread;
    summaryDiv.append(summaryUnread);
  } else if (buildSummaryCount > 0) {
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryRead = document.getElementById('summaryRead');
    const summaryUnread = document.getElementById('summaryUnread');
    summaryTotal.innerText = "Total Books in Library: " + (totalUnread + totalRead);
    summaryRead.innerText = "Books Read: " + totalRead;
    summaryUnread.innerText = "Books Unread: " + totalUnread;
  }
}

// Event listeners 
// Add new book
addBtn.addEventListener('click', () => {
  form.style.visibility = "visible";
  clearForm();
})

// Add up to 20 book suggestions
suggestionBtn.addEventListener('click', (e) => {
  addDummyBooks();
})

clearAllBtn.addEventListener('click', (e) => {
  localStorage.clear();
  buildSummaryCount = 0;
  location.reload();
})

// Form cancel button
cancelBtn.addEventListener('click', () => {
  form.style.visibility = "hidden";
  clearForm();
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.visibility = 'hidden';
  addBookToLibrary();
});

formCheckbox.addEventListener('change', e => {
  if (e.target.checked) {
    e.target.value = 'yes';
  } else {
    e.target.value = 'no';
  }
})