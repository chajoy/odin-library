const container = document.querySelector(`#container`);
const myLibrary = [];

class Book {
    constructor(title, author, pages, hasRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        // this.container = null;
    }
}

function addBookToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    updateDOM();
}

function clearDOM() {
    document.querySelectorAll(`#container #book`).forEach(e => {
        e.remove();
    })
}

function updateDOM() {
    clearDOM();
    myLibrary.forEach(e => {
        console.log(`test`);
        let book_DOM = {
            container: document.createElement(`div`),
            title: document.createElement(`h1`),
            author: document.createElement(`h2`),
            pages: document.createElement(`p`),
            hasRead: document.createElement(`p`),
        }

        book_DOM.container.classList.add(`book`);
        book_DOM.container.setAttribute(`id`, `book`);

        book_DOM.title.textContent = e.title;
        book_DOM.author.textContent = e.author;
        book_DOM.pages.textContent = `Pages: ${e.pages}`;
        book_DOM.hasRead.textContent = e.hasRead ? `Has read` : `Has not read`;

        book_DOM.container.appendChild(book_DOM.title);
        book_DOM.container.appendChild(book_DOM.author);
        book_DOM.container.appendChild(book_DOM.pages);
        book_DOM.container.appendChild(book_DOM.hasRead);

        container.appendChild(book_DOM.container);
    })
}

addBookToLibrary(`Dune`, `Frank Herbert`, 577, true);
addBookToLibrary(`1984`, `George Orwell`, 328, true);
addBookToLibrary(`The Hobbit`, `J.R.R. Tolkien`, 310, true);
addBookToLibrary(`The Great Gatsby`, `F. Scott Fitzgerald`, 180, false);
addBookToLibrary(`Moby-Dick`, `Herman Melville`, 635, false);
addBookToLibrary(`Pride and Prejudice`, `Jane Austen`, 432, true);
addBookToLibrary(`The Lord of the Rings: The Fellowship of the Ring`, `J.R.R. Tolkien`, 423, false);
addBookToLibrary(`Fahrenheit 451`, `Ray Bradbury`, 258, true);



