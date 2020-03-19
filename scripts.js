let myLibrary = [];

const libraryLayout = document.querySelector('.library');
const addBookButton = document.querySelector('#addBookButton');
const addBookModal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const closeModalButton = document.querySelector('#closeButton');
const closeModalX = document.querySelector('#closeX');

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }
}

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    render();
    console.log(myLibrary);
}

function render() {
    const numBooks = myLibrary.length;
    const booksPerRow = 3;
    let rowCounter = 0;
    let rowDiv;
    
    libraryLayout.innerHTML = '';
    for(let i = 0; i < numBooks; i++) {
        if(rowCounter === 0) {
            rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
        }

        let hasReadStr = '';
        if(myLibrary[i].hasRead) {
            hasReadStr = 'already read it.';
        }
        else {
            hasReadStr = 'not read it yet.';
        }

        const markup = `
            <div class="card">
                <div class="card-content">    
                    <h5 class="card-title">${myLibrary[i].title}</h5>
                    <h6 class="card-subtitle">${myLibrary[i].author}</h6>
                    <p class="card-text">This book has ${myLibrary[i].pages} pages, and I have ${hasReadStr}</p>
                    <a href="#" class="card-link">Remove book</a>
                    <a href="#" class="card-link">Mark as read</a>
                </div>
            </div>
        `;

        let newDiv = document.createElement('div');
        newDiv.classList.add('col-sm');
        newDiv.innerHTML = markup;
        rowDiv.appendChild(newDiv);
        libraryLayout.appendChild(rowDiv);

        rowCounter = rowCounter + 1;
        if(rowCounter > booksPerRow - 1) {
            rowCounter = 0;
        }
        
    }
}

function showAddBookModal(e) {
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

function closeAddBookModal(e) {
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

document.newBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary(this.title.value, this.author.value, this.pages.value, this.hasRead.checked);
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });

addBookButton.addEventListener('click', showAddBookModal);
closeModalButton.addEventListener('click', closeAddBookModal);
closeModalX.addEventListener('click', closeAddBookModal);
modalOverlay.addEventListener('click', closeAddBookModal);
