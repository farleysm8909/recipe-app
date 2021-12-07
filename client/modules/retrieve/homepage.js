import { displaySingleRecipe } from "./single_recipe.js";

async function displayHomepage() {

    document.getElementById("create-recipe-container").style.display = "none";
    document.getElementById("single-recipe-container").style.display = "none";
    document.getElementById("edit-recipe-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "block";
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    let recipes_container = document.getElementById("recipes-container");
    
    recipes_container.innerHTML = "";  // clear recipe container div before adding onto it

    // display all recipes
    jsonResponse.forEach(recipe => {
        let name = recipe.name;
        let cased_name = "";
        for (let i = 0; i<name.length; i++) {
            if (i==0) {
                cased_name += name[i].toUpperCase();
            } else if (name[i] == " " || name[i] == "-") {
                cased_name += name[i];
                cased_name += name[i+1].toUpperCase();
            } else if (name[i-1] != " " && name[i-1] != "-") {
                cased_name += name[i];
            }
        }
        let img = `
        <div class="recipe-img-container">
            <img src="images/placeholder.jpg" alt="chicken parmesan">
            <div class="overlay"></div>
        </div>`; //`<img src="../../images/{jsonResponse.img.filename} alt="chicken parmesan">`;
        // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
        
        recipes_container.innerHTML += 
        `<div class="recipe-card">
            ${img}
            <h3>${cased_name}</h3>
        </div>`;
    });

    // event listener for recipe-card divs
    const recipe_divs = document.getElementsByClassName("recipe-card");
    const recipe_names = document.getElementsByTagName("h3");
    if ( recipe_divs && recipe_names ) {
        for (let i = 0; i < recipe_divs.length; i++) {
            recipe_divs[i].addEventListener("click", () => {
                displaySingleRecipe(recipe_names[i].textContent);
            });
        }
    }
}



async function displayFilteredRecipes(search_string) {
    document.getElementById("create-recipe-container").style.display = "none";
    document.getElementById("single-recipe-container").style.display = "none";
    document.getElementById("edit-recipe-container").style.display = "none";
    document.getElementById("homepage-container").style.display = "block";
    const url = "http://127.0.0.1:3000/recipe";

    const fetchResponse = await fetch(url);
    const jsonResponse = await fetchResponse.json(); 

    let recipes_container = document.getElementById("recipes-container");
    recipes_container.innerHTML = "";  // clear recipe container div before adding onto it
    let recipe_results = [];

    jsonResponse.forEach(recipe => {
        recipe_results.push(recipe);
    });

    const filtered_recipes = recipe_results.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(search_string) ||
            recipe.course.toLowerCase().includes(search_string) ||
            recipe.category.toLowerCase().includes(search_string) ||
            recipe.cuisine.toLowerCase().includes(search_string) ||
            recipe.totalTime.toString().includes(search_string) ||
            recipe.recipeYield.toLowerCase().includes(search_string) ||
            recipe.rating.toString().toLowerCase().includes(search_string) ||
            recipe.tags.toString().toLowerCase().includes(search_string) ||
            recipe.season.toString().toLowerCase().includes(search_string) ||
            recipe.ingredients.toString().toLowerCase().includes(search_string)
        );           
    });


    // display all filtered recipes
    filtered_recipes.forEach(recipe => {
        let name = recipe.name;
        let cased_name = "";
        for (let i = 0; i<name.length; i++) {
            if (i==0) {
                cased_name += name[i].toUpperCase();
            } else if (name[i] == " " || name[i] == "-") {
                cased_name += name[i];
                cased_name += name[i+1].toUpperCase();
            } else if (name[i-1] != " " && name[i-1] != "-") {
                cased_name += name[i];
            }
        }
        let img = `
        <div class="recipe-img-container">
            <img src="images/placeholder.jpg" alt="chicken parmesan">
            <div class="overlay"></div>
        </div>`;
        
        recipes_container.innerHTML += 
        `<div class="recipe-card">
            ${img}
            <h3>${cased_name}</h3>
        </div>`;
    });

    // event listener for recipe-card divs
    const recipe_divs = document.getElementsByClassName("recipe-card");
    const recipe_names = document.getElementsByTagName("h3");
    if ( recipe_divs && recipe_names ) {
        for (let i = 0; i < recipe_divs.length; i++) {
            recipe_divs[i].addEventListener("click", () => {
                displaySingleRecipe(recipe_names[i].textContent);
            });
        }
    }
}

export { displayHomepage, displayFilteredRecipes };