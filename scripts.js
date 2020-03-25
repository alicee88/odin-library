let myLibrary = [];

const libraryLayout = document.querySelector('.library');
const addBookButton = document.querySelector('#addBookButton');
const addBookModal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const closeModalButton = document.querySelector('#closeButton');
const closeModalX = document.querySelector('#closeModalX');
const hasReadButton = document.querySelector('#has-read');

class Book {
    constructor(title, author, rating, hasRead) {
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.hasRead = hasRead;
        this.stars = [];
        this.removeBookButton;
    }
}

function addBookToLibrary(title, author, rating, hasRead) {
    const book = new Book(title, author, rating, hasRead);
    myLibrary.push(book);
    render();
}

function render() {
    const numBooks = myLibrary.length;
    
    libraryLayout.innerHTML = '';
    
    for(let i = 0; i < numBooks; i++) {
        
        let book = myLibrary[i];
        let ratingText = getStars(book);

        const markup = `
                
                <div class="card-header">
                    <h2 class="card-title">${book.title}</h2>
                    <p class="card-subtitle">${book.author}</p>
                    <p class="card-rating">${ratingText}</p>
                    <div class="remove-book"><button class="remove-book-button" data-remove="${book.title}"><i class="far fa-window-close"></i></button></div>
                    <div class="read-book"><i class="fas fa-book-open ${book.hasRead ? '' : 'hidden'}"></i></div>
                </div>
        `;

        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.innerHTML = markup;

        if(!book.hasRead) {
            newDiv.classList.add('not-read');
        } 

        libraryLayout.appendChild(newDiv);

        book.stars = Array.from(document.querySelectorAll(`[data-title="${book.title}"]`));
        book.stars.forEach(btn => btn.addEventListener('click', changeRating));
        
        book.removeBookButton = document.querySelector(`[data-remove="${book.title}"]`);
        book.removeBookButton.addEventListener('click', deleteFromLibrary);

        
    }
}

function deleteFromLibrary(e) {
    myLibrary = myLibrary.filter(book => book.title != this.dataset.remove);
    render();
}

function changeRating(e) {
    // Find the book we're interested in
    myLibrary.forEach(book => {
        if(book.title === this.dataset.title) {
            // Update the rating and mark as read
            book.rating = parseInt(this.dataset.index) + 1;
            book.hasRead = true;
        }
    });

    render();
}

function getStars(book) {

    let ratingText = '<div class="stars">';
    const maxStars = 5;

    for(let i = 0; i < maxStars; i++) {
        if(i < book.rating) {
            ratingText = ratingText + `<button id="star" data-index="${i}" data-title="${book.title}"><i class="fas fa-star"></i></button>`;
        }
        else {
            ratingText = ratingText + `<button id= "star" data-index="${i}" data-title="${book.title}"><i class="far fa-star"></i></button>`;
        }
    }

    ratingText = ratingText + '</div>'

    return ratingText;
}

function showAddBookModal(e) {
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

function closeAddBookModal(e) {
    document.newBookForm.reset();
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

function showRatingChooser(e) {
    //Only show the rating chooser if book is marked as read
    ratingInput = document.querySelector('.book-rating');
    ratingInput.classList.toggle('input-hidden');
}

document.newBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary(this.title.value, this.author.value, this.rating.value, this.hasRead.checked);
    document.newBookForm.reset();
    addBookModal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });

addBookButton.addEventListener('click', showAddBookModal);
closeModalButton.addEventListener('click', closeAddBookModal);
closeModalX.addEventListener('click', closeAddBookModal);
modalOverlay.addEventListener('click', closeAddBookModal);
hasReadButton.addEventListener('click', showRatingChooser);

addBookToLibrary("The Hobbit", "JRR Tolkein", 2, true);
addBookToLibrary("Lord of the Rings", "Some guy", 0, false);