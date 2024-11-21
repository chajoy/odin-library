const container = document.querySelector(`#container`);
const modal = {
    container: document.getElementById(`modal`),
    header: document.getElementById(`modal_title`),
    title: document.getElementById(`input_title`),
    author: document.getElementById(`input_author`),
    pageCount: document.getElementById(`input_pageCount`),
    hasRead: document.getElementById(`checkbox_hasRead`)
}
const myLibrary = [];
let index_currentBook = 0;

class Book {
    constructor(title, author, pageCount, hasRead = false) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.hasRead = hasRead;
        this.container = null;
    }
}

function updateModal(option, value) {
    switch (option) {
        case `display`:
            if (value === `grid`) {
                modal.container.style.display = `grid`;
            } else if (value === `none`) {
                modal.container.style.display = `none`;
            }
            break;

        case `content`:
            if (value === `reset`) {
                modal.title.value = ``;
                modal.author.value = ``;
                modal.pageCount.value = ``;
                modal.hasRead.checked = false;
            } else {
                modal.title.value = myLibrary[value].title;
                modal.author.value = myLibrary[value].author;
                modal.pageCount.value = myLibrary[value].pageCount;
                modal.hasRead.checked = myLibrary[value].hasRead;
            }
            break;

        default:
            break;
    }
}

function clearDOM() {
    document.querySelectorAll(`#container #book`).forEach(e => {
        e.remove();
    })
}

function updateDOM() {
    clearDOM();
    myLibrary.forEach((book, index) => {
        let book_DOM = {
            container: document.createElement(`div`),
            title: document.createElement(`h1`),
            author: document.createElement(`h2`),
            pageCount: document.createElement(`p`),
            hasRead: document.createElement(`p`),
            btn_delete: document.createElement(`img`)
        }

        book_DOM.container.classList.add(`book`);
        book_DOM.container.setAttribute(`id`, `book`);

        book_DOM.btn_delete.setAttribute(`src`, `img/trash3-fill.svg`);
        book_DOM.btn_delete.setAttribute(`id`, `btn_delete`);

        book_DOM.title.textContent = book.title;
        book_DOM.author.textContent = book.author;
        book_DOM.pageCount.textContent = `Page Count: ${book.pageCount}`;
        book_DOM.hasRead.textContent = book.hasRead ? `Has read` : `Has not read`;

        book_DOM.container.appendChild(book_DOM.btn_delete);
        book_DOM.container.appendChild(book_DOM.title);
        book_DOM.container.appendChild(book_DOM.author);
        book_DOM.container.appendChild(book_DOM.pageCount);
        book_DOM.container.appendChild(book_DOM.hasRead);

        book.container = book_DOM.container;

        book_DOM.container.addEventListener(`click`, (e) => {
            if (e.target.getAttribute(`id`) === `btn_delete`) {
                myLibrary.splice(index, 1);
                book_DOM.container.remove();
                updateDOM();
            } else {
                modal.header.textContent = `Edit Book`;
                index_currentBook = index;
                updateModal(`content`, index_currentBook);
                updateModal(`display`, `grid`);
            }
        });

        container.appendChild(book_DOM.container);
    })
}

function addBookToLibrary(title, author, pageCount, hasRead) {
    let book = new Book(title, author, pageCount, hasRead);
    myLibrary.push(book);
    updateDOM();
}

function editBookInLibrary(index, title, author, pageCount, hasRead) {
    myLibrary[index].title = title;
    myLibrary[index].author = author;
    myLibrary[index].pageCount = pageCount;
    myLibrary[index].hasRead = hasRead;
    updateDOM();
}

function submit_Book(e) {
    e.preventDefault();
    let title = modal.title.value;
    let author = modal.author.value;
    let pageCount = modal.pageCount.value;
    let hasRead = modal.hasRead.checked;
    if (index_currentBook >= 0) {
        let index = index_currentBook;
        editBookInLibrary(index, title, author, pageCount, hasRead);
    } else {
        addBookToLibrary(title, author, pageCount, hasRead);
    }
    updateModal(`display`, `none`);
}

document.getElementById(`btn_newBook`).addEventListener(`click`, () => {
    modal.header.textContent = `New Book`;
    updateModal(`content`, `reset`);
    updateModal(`display`, `grid`);
    index_currentBook = -1;
})

window.addEventListener(`click`, (e) => {
    if (e.target === modal.container) {
        updateModal(`display`, `none`);
    }
})

addBookToLibrary(`Dune`, `Frank Herbert`, 577, true);
addBookToLibrary(`1984`, `George Orwell`, 328, true);
addBookToLibrary(`The Hobbit`, `J.R.R. Tolkien`, 310, true);
addBookToLibrary(`The Great Gatsby`, `F. Scott Fitzgerald`, 180, false);
addBookToLibrary(`Moby-Dick`, `Herman Melville`, 635, false);
addBookToLibrary(`Pride and Prejudice`, `Jane Austen`, 432, true);
addBookToLibrary(`The Lord of the Rings: The Fellowship of the Ring`, `J.R.R. Tolkien`, 423, false);
addBookToLibrary(`Fahrenheit 451`, `Ray Bradbury`, 258, true);



