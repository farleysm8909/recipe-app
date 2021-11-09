async function displayHomepage() {
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    let homepage = document.getElementById("homepage").innerHTML;
    homepage = "";  // clear homepage before adding onto it
    homepage += `<h1>My Recipes</h1>`;


    // display all recipes
    jsonResponse.forEach(recipe => {
        let name = `<h4 class="recipe-name">${recipe.name}</h4>`;
        // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
        
        document.getElementById("homepage").innerHTML += 
        `<div class="recipe-cards">
            ${name}
        </div>`;
    });
}

export { displayHomepage };