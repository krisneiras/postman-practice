//Metodo get R del CRUD (Read)
let sectionTag = document.getElementById("user-list");
async function getUsers() {
    const result = await fetch("http://localhost:5000/users");
    const data = await result.json();
    return data
}

//esta seleccionando donde quiero que pinte mis datos
async function printUsers() {
    let users = await getUsers(); //el resultado es un array de usuaros
    sectionTag.innerHTML = "<div></div>";
    console.log(users)
    users.map(user => { //con map puedo recorrer mi array de usuario 
        sectionTag.innerHTML +=
            `<h3>${user.name}</h3>
         <p>${user.email}</p> 
         <button onclick="deleteUsers('${user.id}')">Delete</button>
         <button class="botonEditar" onclick="displayEditUser('${user.id}','${user.name}','${user.email}')">Modify</button>` //y que por cada usuario que tenga user, imprima un h3 con su name y un p con el email
    });
}
//Metodo delete D del CRUD

async function deleteUsers(id) { //esto es una funcion que yo voy a reutilizar
    const result = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    return result
}

//Metodo POST c de CRUD (Create)/async function postUsers(){
async function postUser() {
    const newUser = {
        "id": "4",
        "name": "Juan",
        "email": "juan@gmail.com"
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    }

    const result = await fetch(`http://localhost:5000/users/`, options); //EAqui podriamos esribir directament todo el objeto json que esta dentro de la variable
    return result
}

// Metodo Post Create del CRUD con Form
async function createUser() {
    const formUser = document.getElementById("users-form");

    const newUser = {
        "name": formUser.elements[0].value,
        "email": formUser.elements[1].value
    };

    const result = await fetch(`http://localhost:5000/users/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
}



// Metodo Put del CRUD(update)
/* async function modifyUser(id) {
    debugger;
    const modifyUserForm = document.querySelector("#edit-form");
    console.log(modifyUserForm)
    debugger;

    const result = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name": "${modifyUserForm.element[0].value}",
            "email": "${modifyUserForm.element[1].value}"
        }`
    });

    return result;
} */

//PUT 
async function displayEditUser(id, name, email) {

    sectionTag.innerHTML = `
    <form id="edit-form">
    <label for="modify-name">Nombre: </label><input id="modify-name" name="name"  value="${name}" type="text">
    <label for="modify-email">Email: </label><input id="modify-email" name="email" value="${email}" type="text">
    <button type="submit" onclick="editUser('${id}')">Enviar</button>
    </form>`;
};

async function editUser(id){
    console.log('Holaa');
    let editForm = document.getElementById('edit-form');
    console.log(editForm)
    console.log(id)
    const result = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name": "${editForm.elements[0].value}",
            "email": "${editForm.elements[1].value}"
        }`
    })

    return result
}
