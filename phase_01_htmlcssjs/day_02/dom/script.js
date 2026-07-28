function addUser(){

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;

    if(name=="" || age=="" || email==""){
        alert("Please fill all the fields");
        return;
    }

    let tableBody = document.getElementById("tableBody");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${email}</td>
    `;

    tableBody.appendChild(row);

    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("email").value="";
}