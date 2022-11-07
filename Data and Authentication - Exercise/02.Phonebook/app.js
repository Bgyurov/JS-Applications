function attachEvents() {
    let list = document.getElementById('phonebook')
    let createBtn = document.getElementById('btnCreate')
    createBtn.addEventListener('click', setPhone)
    let loadBtn = document.getElementById('btnLoad')
    loadBtn.addEventListener('click', getPhones)
    let personInput = document.getElementById('person')
    let phoneInput = document.getElementById('phone')



    async function getPhones() {
        const url = 'http://localhost:3030/jsonstore/phonebook';
    const phonebook = document.querySelector('#phonebook');
    phonebook.replaceChildren();

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(x => {
        let li = document.createElement('li')
        li.textContent = `${x.person}:${x.phone}`
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.setAttribute('id', x._id);
        deleteBtn.addEventListener('click', (e) => deletePhone(e));
        li.appendChild(deleteBtn)
        list.appendChild(li)
    })

    
}
async function deletePhone(e) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    let id = e.target.getAttribute('id');
    
    e.target.parentNode.remove();

    await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
}
    
    async function setPhone(person, phone) {
        const body = {
            person: personInput.value,
            phone: phoneInput.value
        }

        let response = await fetch('http://localhost:3030/jsonstore/phonebook',{
            method : 'post',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data);
            personInput.value = ''
            phoneInput.value = ''
        }
    }
    

attachEvents();