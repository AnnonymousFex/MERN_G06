function addMovie(){

    // Get values from input boxes
    let url = document.getElementById("movieUrl").value;
    let name = document.getElementById("movieName").value;
    let rating = document.getElementById("movieRating").value;

    // Validation
    if(url=="" || name=="" || rating==""){
        alert("Please fill all the fields!");
        return;
    }

    // Get container
    let container = document.getElementById("movieContainer");

    // Add new movie card
    container.innerHTML += `
        <div class="movie-card">
            <img src="${url}" alt="${name}">
            <h3>${name}</h3>
            <p>${rating} / 10 ⭐</p>
        </div>
    `;

    // Clear inputs
    document.getElementById("movieUrl").value="";
    document.getElementById("movieName").value="";
    document.getElementById("movieRating").value="";
}