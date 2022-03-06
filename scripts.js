const mainContainer = document.getElementById('mainContainer');
const addBtn = document.getElementById('addBtn');
const form = document.getElementById('form');
const table = document.getElementById('table');
const cancelBtn = document.getElementById('cancelBtn');
const formCheckbox = document.getElementById('formCheckbox');
const tableCheckbox = document.querySelector('.tableCheckbox');

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
let newBook = '';
let totalRead = '';
let totalUnread = '';
let buildSummaryCount = '';

// addDummyBooks();

// Object constructor
function book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// Add books from localStorage && hide table if myLibrary = 0
if(myLibrary.length > table.rows.length -1) {
  populateTable();
} else if(myLibrary.length == 0) {
  table.style.visibility = 'hidden';
}

function addBookToLibrary() {
  newBook = new book(title.value, author.value, pages.value, formCheckbox.value);
  myLibrary.push(newBook);
  populateTable();
  location.reload();
}

function deleteBook() {
  table.deleteRow(bookTag + 1);
  myLibrary.splice(bookTag, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  resetBookTag();
  location.reload();
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
    let cell6 = tableRow.insertCell(5);
    cell1.textContent = parseInt([i]) + 1;
    cell2.textContent = myLibrary[i].title;
    cell3.textContent = myLibrary[i].author;
    cell4.textContent = myLibrary[i].pages;
    
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "tableCheckbox";
    // ↓ Make sure read status is updated after refresh ↓
    if(myLibrary[i].read === 'yes') {
      checkbox.checked = true;
    } 
    checkbox.onchange = function() {
      bookTag = parseInt(tableRow.dataset.bookTag);
      updateReadStatus();
    }
    cell5.appendChild(checkbox);

    let button = document.createElement('input');
    button.type = "button";
    button.className = "deleteBtn";
    button.value = "Delete"
    button.onclick = function() {
      bookTag = parseInt(tableRow.dataset.bookTag);
      deleteBook();
    }
    cell6.appendChild(button);

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
  formCheckbox.checked = true;
  formCheckbox.value = 'yes';
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
  const book1 = new book('To Kill a Mockingbird', 'Harper Lee', '281', 'no')
  const book2 = new book('The Great Gatsby', ' F. Scott Fitzgerald', '208', 'no')
  const book3= new book('Ulysses', 'James Joyce', '730', 'no')
  const book4= new book('The Catcher in the Rye', 'J.D Salinger', '277', 'no')
  const book5= new book('Pride and Prejudice', 'Jane Austen', '432', 'no')
  const book6= new book('Adventures of Huckleberry Finn', 'Mark Twain', '366', 'no')
  const book7= new book('Alice’s Adventure in Wonderland', 'Lews Carroll', '1184', 'no')
  const book8= new book('To the Lighthouse', 'Virginia Woolf', '320', 'no')
  const book9= new book('The Sound and the Fury', 'William Faulkner', '326', 'no')
  const book10= new book('Nineteen Eighty-four', 'George Orwell', '328', 'no')
  const book11= new book('Great Expectations', 'Charles Dickens', '544', 'no')
  const book12= new book('Absalom, Absalom!', 'William Faulkner', '384', 'no')
  const book13= new book('Middlemarch', 'George Eliot', '880', 'no')
  const book14= new book('Beloved', 'Toni Morrison', '324', 'no')
  const book15= new book('The Invisible Man', 'Ralph Ellison', '581', 'no')
  const book16= new book('Mrs. Dalloway', 'Virginia Woolf', '91', 'no')
  const book17= new book('David Copperfield', 'Charles Dickens', '624', 'no')
  const book18= new book('The Lord of the Rings', 'J.R.R Tolkien', '416', 'no')
  const book19= new book('Frankenstein', 'Mary Shelley', '280', 'no')
  const book20= new book('Things Fall Apart', 'Chinua Achebe', '224', 'no')

  
  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
  myLibrary.push(book4);
  myLibrary.push(book5);
  myLibrary.push(book6);
  myLibrary.push(book7);
  myLibrary.push(book8);
  myLibrary.push(book9);
  myLibrary.push(book10);
  myLibrary.push(book11);
  myLibrary.push(book12);
  myLibrary.push(book13);
  myLibrary.push(book14);
  myLibrary.push(book15);
  myLibrary.push(book16);
  myLibrary.push(book17);
  myLibrary.push(book18);
  myLibrary.push(book19);
  myLibrary.push(book20);
}

function updateReadStatus() {
  const newArr = myLibrary.map(obj => {
    if(obj.title === myLibrary[bookTag].title)  {
      if(myLibrary[bookTag].read == 'yes') {
        return {...obj, read: "no"};
      } else if(myLibrary[bookTag].read =='no')  {
        return {...obj, read: "yes"}
      }
    }
    return obj;
  })
  myLibrary = newArr;
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  totalBooksRead();
  location.reload();
}

function totalBooksRead() {
  totalRead = (document.querySelectorAll('input[type="checkbox"]:checked').length);
  console.log("total books read: " + totalRead);
  totalUnread = myLibrary.length - totalRead;
  console.log('total books unread ' + totalUnread);
}

function buildSummary() {
  totalBooksRead();
  if(buildSummaryCount < 1) {
    const summaryDiv = document.createElement('div');
    summaryDiv.classList.add('summaryDiv');
    mainContainer.insertBefore(summaryDiv, mainContainer.firstChild);
    
    const summaryTotal = document.createElement('p');
    summaryTotal.textContent = "Total Books in Library: " + (totalUnread + totalRead);
    summaryTotal.classList.add('summaryTotal');
    summaryDiv.append(summaryTotal);
    
    const summaryRead = document.createElement('p');
    summaryRead.classList.add('summaryRead');
    summaryRead.textContent = "Books Read: " + totalRead;
    summaryDiv.append(summaryRead);
    
    const summaryUnread = document.createElement('p');
    summaryUnread.classList.add('summaryUnread');
    summaryUnread.textContent = "Books Unread: " + totalUnread;
    summaryDiv.append(summaryUnread);
  }
}

if(myLibrary.length > 0) {
  buildSummary();
  buildSummaryCount += 1;
};