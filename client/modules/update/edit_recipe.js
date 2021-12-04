import { displaySingleRecipe } from "../retrieve/single_recipe.js";

async function displayEditRecipe(rname) {
    const lowercase_name = rname.toLowerCase();
    const url = `http://127.0.0.1:3000/recipe/${lowercase_name}`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    document.getElementById("single-recipe-container").style.display = "none";
    document.getElementById("edit-recipe-container").style.display = "block";

    // form elements
    const name = document.getElementById("edit-name");
    const course = document.getElementById("edit-course");
    const cuisine = document.getElementById("edit-cuisine");
    const category = document.getElementById("edit-category");
    const rating = document.getElementById("edit-rating");
    const prep_time = document.getElementById("edit-prep-time");
    const cook_time = document.getElementById("edit-cook-time");
    const recipe_yield = document.getElementById("edit-recipe-yield");
    const tags = document.getElementById("edit-tags");
    const directions = document.getElementById("edit-directions");
    const ingredients = document.getElementById("edit-ingredients");
    // seasons
    const spring = document.getElementById("edit-inlineCheckbox1");
    const summer = document.getElementById("edit-inlineCheckbox2");
    const fall = document.getElementById("edit-inlineCheckbox3");
    const winter = document.getElementById("edit-inlineCheckbox4");

    // populate form fields with existing data (to be edited by user)
    name.value = rname;
    course.value = jsonResponse.course;
    cuisine.value = jsonResponse.cuisine;
    category.value = jsonResponse.category;
    rating.value = jsonResponse.rating;
    prep_time.value = jsonResponse.prepTime;
    cook_time.value = jsonResponse.cookTime;
    recipe_yield.value = jsonResponse.recipeYield;
    tags.value = jsonResponse.tags;

    // format seasons, ingredients, directions and populate with info
    spring.checked = false;
    summer.checked = false;
    fall.checked = false;
    winter.checked = false;
    const seasons_arr = jsonResponse.season;
    for (let h = 0; h < seasons_arr.length; h++) {
        if (seasons_arr[h] === "Spring") { spring.checked = true; }
        if (seasons_arr[h] === "Summer") { summer.checked = true; } 
        if (seasons_arr[h] === "Fall")   { fall.checked = true; }  
        if (seasons_arr[h] === "Winter") { winter.checked = true; } 
    }

    ingredients.value = "";
    const ingredients_arr = jsonResponse.ingredients;
    for (let i = 0; i < ingredients_arr.length-1; i++) {
        ingredients.value += ingredients_arr[i] + "\n";
    }
    ingredients.value += ingredients_arr[ingredients_arr.length-1]; // avoid newline at end of last ingredient

    directions.value = "";
    const directions_arr = jsonResponse.directions;
    for (let j = 0; j < directions_arr.length-1; j++) {
        directions.value += directions_arr[j] + "\n";
    }
    directions.value += directions_arr[directions_arr.length-1]; // avoid newline at end of last direction
    
}

async function editRecipe(original_rname) {
    const url = `http://127.0.0.1:3000/recipe/${original_rname.toLowerCase()}`;

    let edit_general_error_msg = document.getElementById("edit-general-error-msg");
    edit_general_error_msg.innerHTML = ""; // clear former error msgs

    // format seasons
    const checkboxes = document.getElementsByClassName("box");
    let checked_seasons = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked_seasons.push(checkboxes[i].value);
        }
    }
    // check if none selected
    if (checked_seasons.length == 0) {
        edit_general_error_msg.innerHTML = "Please check at least one season";
        edit_general_error_msg.style.display = "block";
        return false;
     }

    // format tags
    const tags = document.getElementById("edit-tags").value;
    let tags_list;
    if (tags.includes(",")) {
        tags_list = tags.split(",");
    } else {
        tags_list = tags.split(" ");
    }
    
    // format ingredients
    const entered_ingredients = document.getElementById("edit-ingredients").value;
    const ingredient_list = entered_ingredients.split("\n");

    // format directions
    const entered_directions = document.getElementById("edit-directions").value;
    const directions_list = entered_directions.split("\n");

    // format image filename
    const fakepath = document.getElementById("edit-image").value;
    let filename = "placeholder.jpg";
    if (fakepath) {
        filename = fakepath.substring(12, fakepath.length); // grab only the filename from "C:\fakepath\${filename}"
    }
    
    const data = {
        name:           document.getElementById("edit-name").value.toLowerCase(),
        img:            filename,
        course:         document.getElementById("edit-course").value, // grabs selected val from dropdown
        cuisine:        document.getElementById("edit-cuisine").value,
        category:       document.getElementById("edit-category").value, 
        recipeYield:    document.getElementById("edit-recipe-yield").value,
        rating:         Number(document.getElementById("edit-rating").value),
        prepTime:       Number(document.getElementById("edit-prep-time").value),
        cookTime:       Number(document.getElementById("edit-cook-time").value),
        season:         checked_seasons,
        tags:           tags_list,
        ingredients:    ingredient_list,
        directions:     directions_list
    };
    
    const config = {
        method: "put", // is this right? still need to add route
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse = await fetch(url, config);
    const jsonResponse = await fetchResponse.json();

    if (jsonResponse.error) {
        edit_general_error_msg.style.display = "block";
        edit_general_error_msg.innerHTML = jsonResponse.error;
    } else {
        displaySingleRecipe(jsonResponse.name);
    }
}

export { displayEditRecipe, editRecipe };