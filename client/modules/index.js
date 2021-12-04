import { displayHomepage } from "./retrieve/homepage.js";
import { createRecipe } from "./create/create_recipe.js";
import { displaySingleRecipe } from "./retrieve/single_recipe.js";
import { displayEditRecipe, editRecipe } from "./update/edit_recipe.js";
import { deleteRecipe } from "./delete/delete_recipe.js";

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

    // listen for when forms are submitted (create/update recipe)
    // const forms = document.getElementsByClassName("form");
    // for (let i = 0; i < forms.length; i++) {
    //     forms[i].addEventListener("submit", function(e) {
    //         e.preventDefault();
    //         createRecipe();
    //     });
    // }

    // create recipe form submission
    const create_form = document.getElementById("form");
    if (create_form) {
        create_form.addEventListener("submit", (e) => {
            e.preventDefault();
            createRecipe();
        });
    }

    // edit recipe form submission
    const edit_form = document.getElementById("edit-form");
    if (edit_form) {
        edit_form.addEventListener("submit", (e) => {
            e.preventDefault();
            const recipe_name = document.getElementById("recipe-heading").textContent;
            editRecipe(recipe_name);
        });
    }

    // add event listeners for statically displayed buttons

   // create recipe btn (display UI)
   const create_btn = document.getElementById("create-btn");
   if ( create_btn ) {
       create_btn.addEventListener("click", () => {
        document.getElementById("homepage-container").style.display = "none";
        document.getElementById("create-recipe-container").style.display = "block";
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

    // cancel save btn (from create page)
    const cancel_btn = document.querySelector("#cancel-create-btn");
    if ( cancel_btn ) {
        cancel_btn.addEventListener("click", () => {
            displayHomepage();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    } 

    // back to homepage btn (from single page)
    const back_btn = document.querySelector("#back-btn");
    if ( back_btn ) {
        back_btn.addEventListener("click", () => {
            displayHomepage();
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    } 

    // edit recipe btn (from single page - updates UI)
    const edit_btn = document.querySelector("#edit-btn");
    if ( edit_btn ) {
        edit_btn.addEventListener("click", () => {
            const recipe_name = document.getElementById("recipe-heading").textContent;
            displayEditRecipe(recipe_name);
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }

    // save edit recipe btn (from edit page)
    // const save_edit_btn = document.getElementById("save-edit-btn");
    // if (save_edit_btn) {
    //     save_edit_btn.addEventListener("click", () => {
    //         editRecipe();
    //     });
    // }

    // cancel edit recipe btn (from edit page)
    const cancel_edit_btn = document.querySelector("#cancel-edit-btn");
    if ( cancel_edit_btn ) {
        cancel_edit_btn.addEventListener("click", () => {
            const recipe_name = document.getElementById("recipe-heading").textContent;
            displaySingleRecipe(recipe_name);
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }
    
    // delete recipe btn (from edit page)
    const delete_btn = document.querySelector("#delete-recipe-btn");
    if ( delete_btn ) {
        delete_btn.addEventListener("click", () => {
            const recipe_name = document.getElementById("recipe-heading").textContent;
            deleteRecipe(recipe_name);
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }
 
});