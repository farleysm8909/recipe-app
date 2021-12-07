import { displayHomepage, displayFilteredRecipes } from "./retrieve/homepage.js";
import { createRecipe } from "./create/create_recipe.js";
import { displaySingleRecipe } from "./retrieve/single_recipe.js";
import { displayEditRecipe, editRecipe } from "./update/edit_recipe.js";
import { deleteRecipe } from "./delete/delete_recipe.js";
import { Message } from "./classes/message.js";

window.addEventListener('DOMContentLoaded', () => {
    
    displayHomepage();

    // add year to footer
    document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
    const search_bar = document.getElementById("search-bar");
    const edit_name = document.getElementById("edit-name");
    const edit_ryield = document.getElementById("edit-recipe-yield");
    const edit_tags = document.getElementById("edit-tags");
    const edit_prep = document.getElementById("edit-prep-time");
    const edit_cook = document.getElementById("edit-cook-time");
    const edit_ing = document.getElementById("edit-ingredients");
    const edit_dir = document.getElementById("edit-directions");

    // let filename = "placeholder.jpg";
    // // watch for change to image upload input element, need to grab value for path
    // //https://stackoverflow.com/questions/1804745/get-the-filename-of-a-fileupload-in-a-document-through-javascript/19807149
    // document.getElementById("image").addEventListener("onchange", () => {
    //     const file = document.getElementById("image").files[0];
    //     filename = file.name;
    // });

    

    // listen for mouseover on search bar
    search_bar.addEventListener("mouseover", (e) => {
        search_bar.focus();
    });

    // listen for mouseout on search bar
    search_bar.addEventListener("mouseout", (e) => {
        search_bar.blur();
    });

    // listen for mouseover on edit name
    edit_name.addEventListener("mouseover", (e) => {
        edit_name.focus();
    });

    // listen for mouseout on edit name
    edit_name.addEventListener("mouseout", (e) => {
        edit_name.blur();
    });

    // listen for mouseover on edit ryield
    edit_ryield.addEventListener("mouseover", (e) => {
        edit_ryield.focus();
    });

    // listen for mouseout on edit ryield
    edit_ryield.addEventListener("mouseout", (e) => {
        edit_ryield.blur();
    });

    // listen for mouseover on edit prep
    edit_prep.addEventListener("mouseover", (e) => {
        edit_prep.focus();
    });

    // listen for mouseout on edit prep
    edit_prep.addEventListener("mouseout", (e) => {
        edit_prep.blur();
    });

    // listen for mouseover on edit cook
    edit_cook.addEventListener("mouseover", (e) => {
        edit_cook.focus();
    });

    // listen for mouseout on edit cook
    edit_cook.addEventListener("mouseout", (e) => {
        edit_cook.blur();
    });

    // listen for mouseover on edit tags
    edit_tags.addEventListener("mouseover", (e) => {
        edit_tags.focus();
    });

    // listen for mouseout on edit tags
    edit_tags.addEventListener("mouseout", (e) => {
        edit_tags.blur();
    });

    // listen for mouseover on edit ing
    edit_ing.addEventListener("mouseover", (e) => {
        edit_ing.focus();
    });

    // listen for mouseout on edit ing
    edit_ing.addEventListener("mouseout", (e) => {
        edit_ing.blur();
    });

    // listen for mouseover on edit directions
    edit_dir.addEventListener("mouseover", (e) => {
        edit_dir.focus();
    });

    // listen for mouseout on edit tags
    edit_dir.addEventListener("mouseout", (e) => {
        edit_dir.blur();
    });

    // listen for search bar input
    search_bar.addEventListener("keyup", (e) => {
        const search_string = e.target.value.toLowerCase();
        displayFilteredRecipes(search_string);
    });

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


    /* add event listeners for statically displayed buttons */


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

    // cancel create btn (from create page)
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
            const msg = new Message("Are you sure you want to delete this recipe?", "confirm");
            const response_string = msg.sendMessage(); 
            const response = eval(response_string);
            if (response) {
                const recipe_name = document.getElementById("recipe-heading").textContent;
                deleteRecipe(recipe_name);
            }
        });
    } else {
        console.error(`Unable to bind to target! Debug Required.`);
    }
 
});