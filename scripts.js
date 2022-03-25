let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let suggestedBooksCounter = JSON.parse(localStorage.getItem("suggestedBooksCounter")) || 0;
let newBook = '';
let totalRead = 0;
let totalUnread = 0;
let buildSummaryCount = '';

// localStorage.clear();

// Object constructor
// function book(title, author, pages, read) {
//   this.title = title
//   this.author = author
//   this.pages = pages
//   this.read = read
// }

class book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

// Set up myLibrary & hide table if empty
function firstTableBuild() {
  if (myLibrary.length > 0) {
    populateTable();
    buildSummary();
    btnContainer.style.width = "max-content";
    table.style.visibility = 'visible';
    table.style.minWidth = '70%';
    clearAllBtn.style.visibility = 'visible';
    clearAllBtn.style.position = 'relative';
  } else if (myLibrary.length == 0) {
    table.style.visibility = 'hidden';
    clearAllBtn.style.visibility = 'hidden';
    clearAllBtn.style.position = 'absolute';
    btnContainer.style.width = "180px";
  }
  hideSortOptions();
}
firstTableBuild();

function hideSortOptions() {
  if (myLibrary.length < 2) {
    sortOptions.style.visibility = "hidden";
    sortOptions.style.position = "absolute";
  } else {
    sortOptions.style.visibility = "visible"
    sortOptions.style.position = "relative";
  }
}

function addBookToLibrary() {
  newBook = new book(title.value, author.value, pages.value, formCheckbox.value);
  myLibrary.push(newBook);
  firstTableBuild();
  summaryDiv.style.visibility = 'visible';
  summaryDiv.style.position = 'relative';
}

function deleteBook() {
  table.deleteRow(bookTag + 1);
  myLibrary.splice(bookTag, 1);
  suggestedBooksCounter--;
  toLocalStorage();
  // Hide summaryDiv & adjust size for btnMessage to work without disturbing neighbors
  if (myLibrary.length < 1) {
    firstTableBuild();
    summaryDiv.style.visibility = 'hidden';
    summaryDiv.style.position = 'absolute';
    btnContainer.style.width = "180px";
  }
  resetBookTag();
  resetBookNum();
  hideSortOptions()
  buildSummary();
}

// Resets each table row's "index" (data-book-tag)
function resetBookTag() {
  for (i = 0; i < myLibrary.length; i++) {
    let tableRow = table.rows[i + 1];
    tableRow.dataset.bookTag = [i];
  }
}

function resetBookNum() {
  for (i = 0; i < myLibrary.length; i++) {
    let cell1 = table.rows[i + 1].cells[0];
    cell1.innerText = parseInt([i]) + 1;
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

    toLocalStorage();
    hideSortOptions();
  }
}

// Sort table contents

sortOptions.addEventListener('change', function () {
  let sortedArray = '';
  let tempLibrary = myLibrary;
  myLibrary = [];
  switch (this.value) {
    case 'sortTitleAz':
      sortedArray = tempLibrary.sort((a, b) => a.title > b.title ? 1 : -1);
      break;
    case 'sortTitleZa':
      sortedArray = tempLibrary.sort((a, b) => a.title > b.title ? -1 : 1);
      break;
    case 'sortAuthorAz':
      sortedArray = tempLibrary.sort((a, b) => a.author > b.author ? 1 : -1);
      break;
    case 'sortAuthorZa':
      sortedArray = tempLibrary.sort((a, b) => a.author > b.author ? -1 : 1);
      break;
    case 'sortPagesLow':
      sortedArray = tempLibrary.sort((a, b) => a.pages - b.pages);
      break;
    case 'sortPagesHigh':
      sortedArray = tempLibrary.sort((a, b) => b.pages - a.pages);
      break;
    case 'sortReadFirst':
      sortedArray = tempLibrary.sort((a, b) => a.read > b.read ? -1 : 1);
      break;
    case 'sortUnreadFirst':
      sortedArray = tempLibrary.sort((a, b) => a.read > b.read ? 1 : -1);
      break;
  }
  myLibrary = sortedArray;
  toLocalStorage();
  afterSort();
});

function afterSort() {
  sortOptions.options[0].selected = 'selected';
  for (i = 0; i < myLibrary.length; i++) {
    let cell1 = table.rows[i + 1].cells[1];
    let cell2 = table.rows[i + 1].cells[2];
    let cell3 = table.rows[i + 1].cells[3];
    let cell4 = table.rows[i + 1].cells[4].children[0];
    cell1.innerText = myLibrary[i].title;
    cell2.innerText = myLibrary[i].author;
    cell3.innerText = myLibrary[i].pages;
    if (myLibrary[i].read === 'yes') {
      cell4.checked = true;
    } else if (myLibrary[i].read === 'no') {
      cell4.checked = false;
    }
  }
}

function clearForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  formCheckbox.checked = true;
  formCheckbox.value = 'yes';
}

function addBookSuggestions() {
  let dummyArray = [];
  let arrayLength = suggestedBooksCounter;
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

  function randomBookToArrays() {

    // Get random book from dummyArray & push to myLibrary
    let randomBook = dummyArray[Math.floor(Math.random() * dummyArray.length)];
    suggestedBooksCounter++;
    myLibrary.push(randomBook);

    // Get all titles from array & save the newest addition
    let bookTitles = myLibrary.map(myLibrary => myLibrary.title)
    let newestBookTitle = bookTitles[bookTitles.length - 1].toString();

    // compare newest addition title to books in array
    let index = myLibrary.map(object => object.title).indexOf(newestBookTitle);
    // Alternative method to above ↓ ↓ ↓
    // let index = myLibrary.findIndex(object => {
    //   return object.title === newestBookTitle;
    // })

    // Delete newest addition if duplicate is found
    if (index < bookTitles.length - 1) {
      suggestedBooksCounter--;
      bookTitles.pop();
      myLibrary.pop();
    }
  }

  // Add 5 suggested books while < 15 suggested books are in myLibrary
  while (arrayLength <= 15 && suggestedBooksCounter < arrayLength + 5) {
    randomBookToArrays()
  }

  // When 15+ suggested books are in myLibrary
  // Add up to 4 books to make suggested books in myLibrary = 20 
  if (arrayLength > 14) {
    while (suggestedBooksCounter < 20) {
      randomBookToArrays();
    }
  }
  toLocalStorage();
  firstTableBuild();
  summaryDiv.style.visibility = 'visible';
  summaryDiv.style.position = 'relative';
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
  toLocalStorage();
  buildSummary();
}

function buildSummary() {
  totalRead = (table.querySelectorAll('input[type="checkbox"]:checked').length);
  totalUnread = myLibrary.length - totalRead;
  if (buildSummaryCount < 1) {
    buildSummaryCount += 1;
    const summaryDiv = document.createElement('div');
    summaryDiv.setAttribute('id', 'summaryDiv');
    controlsContainer.insertBefore(summaryDiv, controlsContainer.firstChild);

    const summaryTotal = document.createElement('p');
    summaryTotal.innerText = "Books in Library: " + myLibrary.length;
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
    summaryTotal.innerText = "Books in Library: " + myLibrary.length;
    summaryRead.innerText = "Books Read: " + totalRead;
    summaryUnread.innerText = "Books Unread: " + totalUnread;
  }
}

function toLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("suggestedBooksCounter", JSON.stringify(suggestedBooksCounter));
}

// Display button function on hover
function buttonsHover(visibleOrHidden, innerText) {
  btnMessage.style.visibility = visibleOrHidden;
  btnMessage.innerText = innerText;
}

// Event listeners 
// Add new book
addBtn.onclick = () => {
  form.style.visibility = "visible";
  clearForm();
}
addBtn.onmouseover = () => {
  buttonsHover("visible", "Add a New Book");
}
addBtn.onmouseout = () => {
  buttonsHover("hidden", "");
}

// Add up to 20 book suggestions
suggestionBtn.onclick = () => {
  addBookSuggestions();
}

suggestionBtn.onmouseover = () => {
  let text = ''
  if (suggestedBooksCounter <= 15) text = "Add 5 Book Suggestions";
  if (suggestedBooksCounter == 16) text = "Add 4 Book Suggestions";
  if (suggestedBooksCounter == 17) text = "Add 3 Book Suggestions";
  if (suggestedBooksCounter == 18) text = "Add 2 Book Suggestions";
  if (suggestedBooksCounter == 19) text = "Add 1 Book Suggestions";
  if (suggestedBooksCounter == 20) text = "Only 20 Book Suggestions Available";
  buttonsHover("visible", text);
}

suggestionBtn.onmouseout = () => {
  buttonsHover("hidden", "");
}

clearAllBtn.addEventListener('click', (e) => {
  localStorage.clear();
  location.reload();
})

clearAllBtn.addEventListener('mouseover', (e) => {
  buttonsHover("visible", "Clear All Books");
})

clearAllBtn.addEventListener('mouseout', (e) => {
  buttonsHover("hidden", "");
})

// Form cancel button
cancelBtn.addEventListener('click', () => {
  form.style.visibility = "hidden";
  clearForm();
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // New book to title case
  let title = form.title.value;
  let author = form.author.value;
  let titleCaseAnswer = '';
  function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    titleCaseAnswer = str.join(' ');
    return str.join(' ');
  };
  titleCase(title);
  form.title.value = titleCaseAnswer;
  titleCase(author);
  form.author.value = titleCaseAnswer;
  form.style.visibility = 'hidden';
  addBookToLibrary();
});