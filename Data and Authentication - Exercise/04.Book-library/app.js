window.onload = attachEvents

const url = 'http://localhost:3030/jsonstore/collections/books';

const loadBtn = document.querySelector('#loadBooks');
const tBody = document.querySelector('tbody');

const form = document.querySelector('form');
const h3 = form.querySelector('h3');
const formBtn = form.querySelector('button');

let bookId = '';

async function attachEvents() {
    loadBtn.addEventListener('click', getBooks);
    form.addEventListener('submit', createOrUpdateBook)
  

    getBooks()

}

async function getBooks(){

    let response = await fetch(url)
    let data = await response.json()

    tBody.replaceChildren();
    Object.entries(data).forEach(([key, info]) => {
     
        let tr = document.createElement('tr')
        tr.id = key;
        tr.innerHTML = `<td>${info.title}</td>
        <td>${info.author}</td>
        <td>
        <button>Edit</button>
        <button>Delete</button>
        </td>`

        tBody.appendChild(tr)
       
        let editBtn = tr.querySelectorAll('button')[0]
        editBtn.addEventListener('click',onEdit);

        let deleteBtn = tr.querySelectorAll('button')[1]
        deleteBtn.addEventListener('click',onDelete);

    })

}

async function createOrUpdateBook(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    let title = data.get('title');
    let author = data.get('author');

    

    let bookData = {
        author,
        title
    }

    if (formBtn.textContent == 'Save') {
        if (!title || !author) {
            alert('All fields are reqquired!');
            return;
        } else {
            await fetch(`${url}/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            })
        }

        h3.textContent = 'FORM';
        formBtn.textContent = 'Submit';
        
    } else {
        if (!title || !author) {
            alert('All fields are reqquired!');
            return;
        } else {
            await fetch(`${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            })
        }
    }
    getBooks();
    form.reset();
}

async function onEdit(e) {
    e.preventDefault();
    bookId = e.target.parentNode.parentNode.id;

    h3.textContent = 'Edit FORM';
    formBtn.textContent = 'Save';

    form.querySelector('input[name=title]').value = e.target.parentNode.parentNode.children[0].textContent;
    form.querySelector('input[name=author]').value = e.target.parentNode.parentNode.children[1].textContent;
}

async function onDelete(e) {
    let bookId = e.target.parentNode.parentNode.getAttribute('id');

    await fetch(`${url}/${bookId}`, {
        method: 'DELETE',
    });

    getBooks();
}