async function displaySingleRecipe(recipe_name) {
    const url = `http://127.0.0.1:3000/recipe/${recipe_name}`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    let single_recipe = document.getElementById("single-recipe").innerHTML;
    single_recipe = "";  // clear homepage before adding onto it

    const name = `<h1>${jsonResponse.name}</h1>`;
    // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
    // start ul
    const prep_time = `<ul><li>${jsonResponse.prepTime}</li>`;
    const cook_time = `<li>${jsonResponse.cookTime}</li>`;
    const total_time = `<li>${jsonResponse.totalTime}</li>`;
    const r_yield = `<li>${jsonResponse.recipeYield}</li>`;
    const rating = `<li>${jsonResponse.rating}</li>`;

    const category = `<li>${jsonResponse.category}</li>`;
    const course = `<li>${jsonResponse.course}</li>`;
    const cuisine = `<li>${jsonResponse.cuisine}</li>`;
    const date = `<li>${jsonResponse.datePublished}</li>`;

    const seasons_array = jsonResponse.season;
    const tags_array = jsonResponse.tags;
    const ingredients_array = jsonResponse.ingredients;
    const directions_string = `<p>${jsonResponse.directions}</p>`;

    // let season_array = recipe_string[0].split("   ");
    let seasons = `<li>`;
    seasons_array.forEach(season => {
        seasons += `${season} `;
    });
    seasons += `</li>`;

    let tags = `<li>`;
    tags_array.forEach(tag => {
        tags += `${tag} `;
    });
    tags += `</li></ul>`;

    let ingredients = `<ul>`;
    ingredients_array.forEach(ing => {
        ingredients += `<li>${ing}</li>`;
    });
    ingredients += `</ul>`;

    let directions_array = directions_string.split("."); // divides string up by sentences and stores in array
    let directions = `<ol>`;
    directions_array.forEach(direction => {
        directions += `<li>${direction}</li>`;
    });
    directions += `</ol>`;

    document.getElementById("single-recipe").innerHTML += 
    `<div class="single-recipe-container">
        ${name}
        ${prep_time} ${cook_time} ${total_time} ${r_yield} ${rating}
        ${category} ${course} ${cuisine} ${date} ${seasons} ${tags} 
        ${ingredients}
        ${directions}
    </div>`;
}

export { displaySingleRecipe };