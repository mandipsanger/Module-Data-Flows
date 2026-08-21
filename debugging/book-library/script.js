let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    // Initialize sample data with two books
    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", "252", true));

    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true)
    );
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function submit() {
  // remove empty spaces before and after author and title input
  title.value = title.value.trim();
  author.value = author.value.trim();

  // Check for empty input fields
  if (!title.value || !author.value || !pages.value) {
    alert("Please fill all fields!");
    return;
  }

  // check if page number is a valid integer > 0
  const pageNumber = Number(pages.value);

  if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
    alert("Number of pages needs to be a valid integer greater than 0!");
    return;
  }

  // Create a new book object with input data
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    check.checked
  );

  // Add the new book to the library
  myLibrary.push(newBook);

  // Update the display
  render();

  // Clear the form
  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;

  // Remove existing rows except header
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow();

    // Insert cells
    row.insertCell().innerText = myLibrary[i].title;
    row.insertCell().innerText = myLibrary[i].author;
    row.insertCell().innerText = myLibrary[i].pages;

    // Read/Unread button
    let readCell = row.insertCell();

    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    readCell.appendChild(changeBut);

    // Delete button
    let deleteCell = row.insertCell();

    let delBut = document.createElement("button");
    delBut.className = "btn btn-warning";
    delBut.innerText = "Delete";

    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);

      myLibrary.splice(i, 1);
      render();
    });

    deleteCell.appendChild(delBut);
  }
}
