const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("check");
const form = document.getElementById("form");

window.addEventListener("load", function () {
  populateStorage();
  render();

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submit();
    });
  }
});

function populateStorage() {
  if (myLibrary.length === 0) {
    // Initialize sample data with two books
    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", 252, true));

    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
}

function submit() {
  // Get cleaned input values
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = pagesInput.value.trim();

  // Check for empty input fields
  if (!titleValue || !authorValue || !pagesValue) {
    alert("Please fill all fields!");
    return;
  }

  // Make sure pages contains digits only
  if (!/^\d+$/.test(pagesValue)) {
    alert("Number of pages needs to be a valid integer greater than 0!");
    return;
  }

  // Convert pages to a number
  const pageNumber = Number(pagesValue);

  // Check that pages is greater than zero
  if (pageNumber <= 0) {
    alert("Number of pages needs to be a valid integer greater than 0!");
    return;
  }

  // Create a new book using cleaned and validated values
  const newBook = new Book(
    titleValue,
    authorValue,
    pageNumber,
    readInput.checked
  );

  // Add the new book
  myLibrary.push(newBook);

  // Update the display
  render();

  // Reset the entire form
  if (form) {
    form.reset();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const rowsNumber = table.rows.length;

  // Remove existing rows except header
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const row = table.insertRow();

    // Insert book information
    row.insertCell().innerText = myLibrary[i].title;
    row.insertCell().innerText = myLibrary[i].author;
    row.insertCell().innerText = myLibrary[i].pages;

    // Read/Unread button
    const readCell = row.insertCell();

    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    readCell.appendChild(changeBut);

    // Delete button
    const deleteCell = row.insertCell();

    const delBut = document.createElement("button");
    delBut.className = "btn btn-warning";
    delBut.innerText = "Delete";

    delBut.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;

      // Delete the book first
      myLibrary.splice(i, 1);

      // Update the display
      render();

      // Show confirmation after deletion
      alert(`You've deleted title: ${deletedTitle}`);
    });

    deleteCell.appendChild(delBut);
  }
}
