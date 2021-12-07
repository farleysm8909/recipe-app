import express from "express";
import { isProduction } from "../utils/common.js";
import { Recipe } from "../model/Recipe.js";


const router = express.Router();

/* ************************* CREATE ************************* */


// create new recipe
router.post("/", async (req, res) => { 

    //validate request
    if (!req.body.name || !req.body.recipeYield || !req.body.tags || !req.body.ingredients || !req.body.directions) {
        return res.status(400).send({error: "Name, recipe yield, tags, ingredients and directions fields cannot be empty"});
    }

    if (!req.body.prepTime || !req.body.cookTime) {
        return res.status(400).send({error: "Prep and Cook Time fields cannot be empty"});
    }

    if (!req.body.course || !req.body.cuisine || !req.body.category || !req.body.rating) {
        return res.status(400).send({error: "Course, cuisine, category and rating dropdowns cannot be empty"});
    }

    if (!req.body.season) {
        return res.status(400).send({error: "One or more seasons must be checked"});
    }

    const recipes = await Recipe.find();
    // traverse through recipes to check if there is a naming conflict (names must be unique)
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name.toString().toLowerCase() == req.body.name.toString().toLowerCase()) {
            return res.status(400).send({error: "Recipe name already exists!"});
        }
    }

    // format totalTime
    const totalTime = req.body.prepTime + req.body.cookTime;

    const data = {
        name:           req.body.name,
        //img:            req.body.img, // ??
        course:         req.body.course,
        cuisine:        req.body.cuisine,
        category:       req.body.category,
        prepTime:       req.body.prepTime,
        cookTime:       req.body.cookTime,
        totalTime:      totalTime,
        recipeYield:    req.body.recipeYield,
        rating:         req.body.rating,
        season:         req.body.season,
        tags:           req.body.tags,
        ingredients:    req.body.ingredients,
        directions:     req.body.directions
    };
    
    const recipe = new Recipe(data);

    const filename = req.body.img;
    const img_path = `../../client/images/${filename}`;

    recipe.img.filename = filename;
    //recipe.img.data = readFileSync(img_path); // error here because the image isn't uploading to the folder ie path does not exist. How to upload to folder??
    //recipe.img.contentType = 'image/jpg';

    try {
        const savedRecipe = await recipe.save();
        res.status(200).send(savedRecipe);
    } catch(err) {
        if (isProduction()) {
            console.error(err);
        }
        res.status(500).send({error: "Recipe not saved."}); 
    }
});



/* ************************* RETRIEVE ************************* */

// get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ rating: 'desc' });
        res.status(200).send(recipes);
    } catch(err) {
        res.status(404).send({error: "Recipes not found!"});
    }
});

// get one recipe by name
router.get("/:name", async (req, res) => {
    try {
        const recipe = await Recipe.findOne({name: req.params.name.toLowerCase()});
        res.status(200).send(recipe);
    } catch(err) {
        res.status(404).send({error: "Recipe not found!"});
    }
});


/* ************************* UPDATE ************************* */


// update existing recipe
router.put("/:name", async (req, res) => { 

    //validate request
    if (!req.body.name || !req.body.recipeYield || !req.body.tags || !req.body.ingredients || !req.body.directions) {
        return res.status(400).send({error: "Name, recipe yield, tags, ingredients and directions fields cannot be empty"});
    }

    if (!req.body.prepTime || !req.body.cookTime) {
        return res.status(400).send({error: "Prep and Cook Time fields cannot be empty"});
    }

    if (!req.body.course || !req.body.cuisine || !req.body.category || !req.body.rating) {
        return res.status(400).send({error: "Course, cuisine, category and rating dropdowns cannot be empty"});
    }

    if (!req.body.season) {
        return res.status(400).send({error: "One or more seasons must be checked"});
    }

    // if name is being updated, check if there is a naming conflict (names must be unique)
    if (req.body.name != req.params.name) {
        const recipes = await Recipe.find();
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name == req.body.name) {
                return res.status(400).send({error: "Recipe name already exists!"});
            }
        }
    }

    // locate recipe to edit
    try {
        let recipe = await Recipe.findOne({name: req.params.name});
        
        recipe.name =           req.body.name,
        //recipe.img =          req.body.img
        recipe.course =         req.body.course,
        recipe.cuisine =        req.body.cuisine,
        recipe.category =       req.body.category,
        recipe.prepTime =       req.body.prepTime,
        recipe.cookTime =       req.body.cookTime,
        recipe.totalTime =      req.body.prepTime + req.body.cookTime;
        recipe.recipeYield =    req.body.recipeYield,
        recipe.rating =         req.body.rating,
        recipe.season =         req.body.season,
        recipe.tags =           req.body.tags,
        recipe.ingredients =    req.body.ingredients,
        recipe.directions =     req.body.directions

        const filename = req.body.img;
        const img_path = `../../client/images/${filename}`;

        recipe.img.filename = filename;
        //recipe.img.data = readFileSync(img_path); // error here because the image isn't uploading to the folder ie path does not exist. How to upload to folder??
        //recipe.img.contentType = 'image/jpg';

        const savedRecipe = await recipe.save();
        res.status(200).send(savedRecipe);


    } catch(err) {
        if (isProduction()) {
            console.error(err);
        }
        res.status(500).send({error: "Recipe not saved."}); 
    }
});

/* ************************* DELETE ************************* */

// delete recipe by name (unique)
router.delete("/:name", async (req, res) => { 
    try {
        const deletedRecipe = await Recipe.deleteOne({name: req.params.name}); // https://rahmanfadhil.com/express-rest-api/
        res.status(204).send({message: "Recipe deleted!"});
    } catch(err) {
        res.status(404).send({error: "Recipe doesn't exist!"});
    }
});



export {router as recipeRoutes};