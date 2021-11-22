async function displaySingleRecipe(recipe_name) {
    const lowercase_name = recipe_name.toLowerCase();

    const url = `http://127.0.0.1:3000/recipe/${lowercase_name}`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    document.getElementById("single-recipe-container").innerHTML = "";
    //single_recipe = "";  // clear page before adding onto it

    // format rating
    let stars = "";
    let rating = Number(jsonResponse.rating);
    for (let i = 0; i < rating; i++) {
        stars += "&#11088;";
    }

    // format date
    let str_date = new Date(jsonResponse.datePublished);

    const name = `<h1>${recipe_name}</h1>`;
    // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
    // start ul
    const img = `<img src="images/placeholder.jpg" alt="chicken parmesan">`; //`<img src="images/{jsonResponse.img.filename} alt="chicken parmesan">`;

    const prep_time = `<p><span>Prep Time:</span> ${jsonResponse.prepTime} minutes</p>`;
    const cook_time = `<p><span>Cook Time:</span> ${jsonResponse.cookTime} minutes</p>`;
    const total_time = `<p><span>Total Time:</span> ${jsonResponse.totalTime} minutes</p>`;
    const r_yield = `<p><span>Yield:</span> ${jsonResponse.recipeYield}</p>`;
    rating = `<p><span>Rating:</span> ${stars} </p>`;

    const category = `<p><span>Category:</span> ${jsonResponse.category}</p>`;
    const course = `<p><span>Course:</span> ${jsonResponse.course}</p>`;
    const cuisine = `<p><span>Cuisine:</span> ${jsonResponse.cuisine}</p>`;
    const date = `<p><span>Date Published:</span> ${str_date.toDateString().substring(4, str_date.length)}</p>`; // Nov 21 2021 instead of Sun Nov 21 2021

    const seasons_array = jsonResponse.season;
    const tags_array = jsonResponse.tags;
    const ingredients_array = jsonResponse.ingredients;
    const directions_string = `<p>${jsonResponse.directions}</p>`;

    // let season_array = recipe_string[0].split("   ");
    let seasons = `<p><span>Season(s) Best Enjoyed:</span> `;
    seasons_array.forEach(season => {
        seasons += `${season} `;
    });
    seasons += `</p>`;

    let tags = `<p><span>Tags:</span> `;
    tags_array.forEach(tag => {
        tags += `${tag} `;
    });
    tags += `</p>`;

    let ingredients = `<span>Ingredients</span><ul>`;
    ingredients_array.forEach(ing => {
        ingredients += `<li>${ing}</li>`;
    });
    ingredients += `</ul>`;

    let directions_array = directions_string.split("."); // divides string up by sentences and stores in array
    let directions = `<span>Directions</span><ol>`;
    directions_array.forEach(direction => {
        directions += `<li>${direction}</li>`;
    });
    directions += `</ol>`;

    document.getElementById("single-recipe-container").innerHTML += 
    `
    ${name}
    ${img}
    <section class="recipe_details">
    <div>
        ${prep_time} ${cook_time} ${total_time} 
    </div>
    <div>
        ${r_yield} ${rating}
        ${category} ${course} ${cuisine} ${date} ${seasons} ${tags} 
        ${ingredients}
        ${directions}
    </div>
    </section>`;
    
}

export { displaySingleRecipe };