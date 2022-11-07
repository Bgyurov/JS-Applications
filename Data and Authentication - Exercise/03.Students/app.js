window.onload = attachEvents

const url = 'http://localhost:3030/jsonstore/collections/students';
const tBody = document.querySelector("#results tbody");
const form = document.querySelector('#form');

async function attachEvents() {
    form.addEventListener('submit', createStudent);
  

    getStudents()

}

async function getStudents(){

    let response = await fetch(url)
    let data = await response.json()
    

    tBody.replaceChildren();
    Object.values(data).forEach(x => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${x.firstName}</td>
        <td>${x.lastName}</td>
        <td>${x.facultyNumber}</td>
        <td>${x.grade}</td>`
        tBody.appendChild(tr)
})
}

async function createStudent(e){
    e.preventDefault()
    let info = new FormData(e.target);
    let firstName = info.get('firstName');
    let lastName = info.get('lastName');
    let facultyNumber = info.get('facultyNumber');
    let grade = info.get('grade');
    
    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All fields are required!');
    } else {
        let body = {
            firstName,
            lastName,
            facultyNumber,
            grade
        }

        let response = await fetch(url,{
            method:'post',
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(body)
        })
        const data = await response.json()
        
      

        getStudents()
        form.reset()

    }
}