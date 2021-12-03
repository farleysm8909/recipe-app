async function displaySingleRecipe(recipe_name) {
    const lowercase_name = recipe_name.toLowerCase();

    const url = `http://127.0.0.1:3000/recipe/${lowercase_name}`;

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    document.getElementById("create-recipe-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "none";
    document.getElementById("edit-recipe-container").style.display = "none";
    document.getElementById("single-recipe-container").style.display = "block";

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
    const img = `<img src="images/placeholder.jpg" alt="chicken parmesan">`; //`<img src="images/{jsonResponse.img.filename} alt="chicken parmesan">`;

    const prep_time = `<span>Prep Time:</span> ${jsonResponse.prepTime} minutes`;
    const cook_time = `<span>Cook Time:</span> ${jsonResponse.cookTime} minutes`;
    const total_time = `<span>Total Time:</span> ${jsonResponse.totalTime} minutes`;
    const r_yield = `<span>Yield:</span> ${jsonResponse.recipeYield}`;
    rating = `<span>Rating:</span> ${stars}`;

    const category = `<span>Category:</span> ${jsonResponse.category}`;
    const course = `<span>Course:</span> ${jsonResponse.course}`;
    const cuisine = `<span>Cuisine:</span> ${jsonResponse.cuisine}`;
    const date = `<span>Date Published:</span> ${str_date.toDateString().substring(4, str_date.length)}`; // Nov 21 2021 instead of Sun Nov 21 2021

    const seasons_array = jsonResponse.season;
    const tags_array = jsonResponse.tags;
    const ingredients_array = jsonResponse.ingredients;
    const directions_array = jsonResponse.directions;

    let seasons = `<span>Season(s) Best Enjoyed:</span> `;
    seasons_array.forEach(season => {
        seasons += `${season} `;
    });

    let tags = `<span>Tags:</span> `;
    tags_array.forEach(tag => {
        tags += `${tag} `;
    });

    let ingredients = `<span>Ingredients</span><ul>`;
    ingredients_array.forEach(ing => {
        ingredients += `<li>${ing}</li>`;
    });
    ingredients += `</ul>`;

    // let directions_array = directions_string.split("."); // divides string up by sentences and stores in array
    // let directions = `<span>Directions</span><ol>`;
    // directions_array.forEach(direction => {
    //     directions += `<li>${direction}</li>`;
    // });
    // directions += `</ol>`;

    let directions = `<span>Directions</span><ol>`;
    directions_array.forEach(dir => {
        directions += `<li>${dir}</li>`;
    });
    directions += `</ol>`;

    document.getElementById("back-btn").style.display = "inline-block";
    document.getElementById("edit-btn").style.display = "inline-block";

    document.getElementById("recipe-heading").innerHTML = `${name}`;
    document.getElementById("recipe-img").innerHTML = `${img}`;
    document.getElementById("prep").innerHTML = prep_time;
    document.getElementById("cook").innerHTML = cook_time;
    document.getElementById("tota").innerHTML = total_time;
    document.getElementById("yiel").innerHTML = r_yield;
    document.getElementById("rati").innerHTML = rating;
    document.getElementById("date").innerHTML = date;
    document.getElementById("cate").innerHTML = category;
    document.getElementById("cour").innerHTML = course;
    document.getElementById("cuis").innerHTML = cuisine;
    document.getElementById("seas").innerHTML = seasons;
    document.getElementById("tag").innerHTML = tags;
    document.getElementById("ingr").innerHTML = ingredients;
    document.getElementById("dire").innerHTML = directions;

}

export { displaySingleRecipe };