import { displaySingleRecipe } from "../retrieve/single_recipe.js";

async function createRecipe() {

    let general_error_msg = document.getElementById("general-error-msg");
    general_error_msg.innerHTML = ""; // clear former error msgs

    const url = "http://127.0.0.1:3000/recipe";

    // format seasons
    const checkboxes = document.getElementsByClassName("form-check-input");
    let checked_seasons = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked_seasons.push(checkboxes[i].value);
        }
    }
    // check if none selected
    if (checked_seasons.length == 0) {
        general_error_msg.innerHTML = "Please check at least one season";
        general_error_msg.style.display = "block";
        return false;
     }

    // format tags
    const tags = document.getElementById("tags").value;
    let tags_list;
    if (tags.includes(",")) {
        tags_list = tags.split(",");
    } else {
        tags_list = tags.split(" ");
    }
    
    // format ingredients
    const entered_ingredients = document.getElementById("ingredients").value;
    const ingredient_list = entered_ingredients.split("\n");

    // format directions
    const entered_directions = document.getElementById("directions").value;
    const directions_list = entered_directions.split("\n");

    // format image filename
    const fakepath = document.getElementById("image").value;
    let filename = "placeholder.jpg";
    if (fakepath) {
        filename = fakepath.substring(12, fakepath.length); // grab only the filename from "C:\fakepath\${filename}"
    }
    
    const data = {
        name:           document.getElementById("name").value.toLowerCase(),
        img:            filename,
        course:         document.getElementById("course").value, // grabs selected val from dropdown
        cuisine:        document.getElementById("cuisine").value,
        category:       document.getElementById("category").value, 
        recipeYield:    document.getElementById("recipe-yield").value,
        rating:         Number(document.getElementById("rating").value),
        prepTime:       Number(document.getElementById("prep-time").value),
        cookTime:       Number(document.getElementById("cook-time").value),
        season:         checked_seasons,
        tags:           tags_list,
        ingredients:    ingredient_list,
        directions:     directions_list
    };
    
    const config = {
        method: "post", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };

    const fetchResponse = await fetch(url, config);
    const jsonResponse = await fetchResponse.json();

    if (jsonResponse.error) {
        general_error_msg.style.display = "block";
        general_error_msg.innerHTML = jsonResponse.error;
    } else {
        document.getElementById("create-recipe-container").style.display = "none";
        displaySingleRecipe(jsonResponse.name);
        document.getElementById("single-recipe-container").style.display = "block";
    }
    
}

export { createRecipe };