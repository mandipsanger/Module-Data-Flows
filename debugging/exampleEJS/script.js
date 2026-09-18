const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("check");

const form = document.getElementById("form");
const bookList = document.getElementById("book-list");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function displayBooks() {
  bookList.innerHTML = "";

  for (const book of myLibrary) {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;

    const readCell = document.createElement("td");
    readCell.textContent = book.read ? "Read" : "Not read";

    const deleteCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger";

    deleteButton.addEventListener("click", function () {
      // Save the title before deleting the book
      const deletedTitle = book.title;

      // Delete the book first
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);

      // Update the table
      displayBooks();
      // Show confirmation after deletion alert
      // (`You've deleted title: ${deletedTitle}`); });
    });

    deleteCell.append(deleteButton);

    row.append(titleCell, authorCell, pagesCell, readCell, deleteCell);

    bookList.append(row);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pageNumber = Number(pagesInput.value);
  const read = readInput.checked;

  if (
    title === "" ||
    author === "" ||
    !Number.isInteger(pageNumber) ||
    pageNumber <= 0
  ) {
    return;
  }

  const newBook = new Book(title, author, pageNumber, read);

  myLibrary.push(newBook);

  displayBooks();

  form.reset();
});
