import { displayHomepage } from "./retrieve/homepage.js";
import { createRecipe } from "./create/create_recipe.js";
import { displaySingleRecipe } from "./retrieve/single_recipe.js";
import { displayEditRecipe } from "./update/edit_recipe.js";

window.addEventListener('DOMContentLoaded', () => {
    displayHomepage();

    document.getElementById("copyright_year").innerHTML = new Date().getFullYear();

    // doesn't work
    // let filename = "placeholder.jpg";
    // watch for change to image upload input element, need to grab value for path
    // https://stackoverflow.com/questions/1804745/get-the-filename-of-a-fileupload-in-a-document-through-javascript/19807149
    // document.getElementById("image").addEventListener("onchange", () => {
    //     console.log("inside index.js onchange event listener");
    //     const file = document.getElementById("image").files[0];
    //     filename = file.name;
    //     console.log(filename);
    // });


    const forms = document.getElementsByClassName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", function(e) {
            e.preventDefault();
            createRecipe();
        });
    }

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
    // const save_btn = document.querySelector("#save-recipe-btn");
    // if ( save_btn ) {
    //     save_btn.addEventListener("click", () => {
    //         createRecipe();
    //     });
    // } else {
    //     console.error(`Unable to bind to target! Debug Required.`);
    // }

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

    // back to homepage btn (from single page)
    const back_btn = document.querySelector("#back-btn");
    if ( back_btn ) {
        back_btn.addEventListener("click", () => {
            document.getElementById("single-recipe-container").style.display = "none";
            displayHomepage();
            document.getElementById("back-btn").style.display = "none";
            document.getElementById("edit-btn").style.display = "none";
            document.getElementById("homepage-container").style.display = "block";
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    } 

    // edit recipe btn (from single page)
    const edit_btn = document.querySelector("#edit-btn");
    if ( edit_btn ) {
        edit_btn.addEventListener("click", () => {
            const recipe_name = document.getElementById("recipe-heading").textContent;
            document.getElementById("single-recipe-container").style.display = "none";
            document.getElementById("back-btn").style.display = "none";
            document.getElementById("edit-btn").style.display = "none";
            document.getElementById("save-edit-btn").style.display = "inline";
            document.getElementById("delete-recipe-btn").style.display = "inline";
            document.getElementById("cancel-edit-btn").style.display = "inline";
            document.getElementById("edit-recipe-container").style.display = "block";
            displayEditRecipe(recipe_name);
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // cancel edit recipe btn (from edit page)
    const cancel_edit_btn = document.querySelector("#cancel-edit-btn");
    if ( cancel_edit_btn ) {
        cancel_edit_btn.addEventListener("click", () => {
            const recipe_name = document.getElementById("recipe-heading").textContent;
            document.getElementById("edit-recipe-container").style.display = "none";
            document.getElementById("save-edit-btn").style.display = "none";
            document.getElementById("delete-recipe-btn").style.display = "none";
            displaySingleRecipe(recipe_name);
            document.getElementById("single-recipe-container").style.display = "block";
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }
    
 
});