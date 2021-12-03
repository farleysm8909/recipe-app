import { displaySingleRecipe } from "../retrieve/single_recipe.js";

async function displayEditRecipe(rname) {
    document.getElementById("single-recipe-container").style.display = "none";
    document.getElementById("edit-recipe-container").style.display = "block";

    const lowercase_name = rname.toLowerCase();
    const url = `http://127.0.0.1:3000/recipe/${lowercase_name}`;
    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 



    
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
    console.log("jsonResponse.name: " + jsonResponse.name);

    if (jsonResponse.error) {
        edit_general_error_msg.style.display = "block";
        edit_general_error_msg.innerHTML = jsonResponse.error;
    } else {
        displaySingleRecipe(jsonResponse.name);
    }
}

export { displayEditRecipe, editRecipe };