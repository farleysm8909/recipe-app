import { displayHomepage } from "../retrieve/homepage.js";

async function deleteRecipe(rname) {
    
    const lowercase_name = rname.toLowerCase();
    const url = `http://127.0.0.1:3000/recipe/${lowercase_name}`;
    
    const config = {
        method: "delete", 
        body: null
    };

    const fetchResponse = await fetch(url, config);
    displayHomepage();
}

export { deleteRecipe };