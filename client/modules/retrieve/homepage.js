async function displayHomepage() {
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
        let img = `<img src="images/placeholder.jpg" alt="chicken parmesan">`; //`<img src="../../images/{jsonResponse.img.filename} alt="chicken parmesan">`;
        // image comes next - how to store in db? https://www.youtube.com/watch?v=3TfpgLfJYoo
        
        recipes_container.innerHTML += 
        `<div class="recipe-card">
            ${img}
            <h3>${cased_name}</h3>
        </div>`;
    });

}

export { displayHomepage };