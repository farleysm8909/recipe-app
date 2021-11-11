import { displayHomepage } from "./retrieve/homepage.js";
import { createRecipe } from "./create/create_recipe.js";

window.addEventListener('DOMContentLoaded', () => {

    displayHomepage();

    // add event listeners for statically displayed buttons

   // create recipe btn
   const create_recipe_container = document.getElementById("create-recipe-container");
   const homepage_container = document.getElementById("homepage-container");
   const create_btn = document.getElementById("create-btn");
   if ( create_btn ) {
       create_btn.addEventListener("click", () => {
           homepage_container.style.display = "none";
           create_recipe_container.style.display = "block";
       });
   } else {
       console.error(`Unable to bind to target! Debug Required.`);
   } 

    // save recipe btn
    const save_btn = document.querySelector("#save-recipe-btn");
    if ( save_btn ) {
        save_btn.addEventListener("click", () => {
            createRecipe();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // cancel save btn
    const cancel_btn = document.querySelector("#cancel-create-btn");
    if ( cancel_btn ) {
        cancel_btn.addEventListener("click", () => {
            document.getElementById("create-recipe-container").style.display = "none";
            displayHomepage();
            document.getElementById("homepage-container").style.display = "block";
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    } 
 

});