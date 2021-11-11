async function displayHomepage() {
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    console.log(jsonResponse);

    let recipes_container = document.getElementById("recipes-container");
    
    recipes_container.innerHTML = "";  // clear recipe container div before adding onto it

    // display all recipes
    jsonResponse.forEach(recipe => {
        let name = `<h4 class="recipe-name">${recipe.name}</h4>`;
        // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
        
        recipes_container.innerHTML += 
        `<div class="recipe-card">
            ${name}
        </div>`;
    });

}

export { displayHomepage };