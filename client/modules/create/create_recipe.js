import { displayHomepage } from "../retrieve/homepage.js";
//import { retrieveRecipe } from "./retrieve.js";

async function createRecipe() {
    const url = "http://127.0.0.1:3000/recipe";

    const entered_ingredients = document.getElementById("ingredients").value;
    let ingredient_list = entered_ingredients.split("\n");
    console.log(ingredient_list);

    const entered_directions = document.getElementById("directions").value;
    let directions_list = entered_directions.split("\n");
    console.log(directions_list);
    // if (entered_ingredients) {
    //     for (let i = 0; i < entered_ingredients.length; i++) {
    //         ingredient_list.push(entered_ingredients[i].value);
    //     }
    // }

    const data = {
        name:           document.querySelector("#name").value,
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

    document.getElementById("create-recipe-container").style.display = "none";
    displayHomepage();
    document.getElementById("homepage-container").style.display = "block";

}


// async function saveStep() {
//     const url = `http://127.0.0.1:3000/recipe`;
//     const fetchResponse = await fetch(url);
//     const jsonResponse = await fetchResponse.json();

//     // figure out which recipe is being added to
//     const recipe_name = document.getElementById("retrieved-recipe").textContent;
//     let recIndex;

//     for (let i=0; i<jsonResponse.length; i++) {
//         if (jsonResponse[i].name === recipe_name) {
//             recIndex = i;
//         }
//     } 

//     const recipeId = jsonResponse[recIndex]._id;
//     let steps = jsonResponse[recIndex].steps[0];

//     const url2 = `http://127.0.0.1:3000/recipe/${recipeId}/step`;

//     // define step - the value to replace old step
//     steps += "   " + document.getElementById("newsteps").value;

//     const data = {
//         steps:          steps
//     };
    
//     const config = {
//         method: "post", 
//         mode: "cors", 
//         cache: "no-cache", 
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(data)
//     };

//     const fetchResponse2 = await fetch(url2, config);       
//     const jsonResponse2 = await fetchResponse2.json(); 

//     document.getElementById("step-entry-fields").style.display = "none";
//     document.getElementById("saveStepBtn").style.display = "none";
//     retrieveRecipe(recIndex);

// }

export { createRecipe };