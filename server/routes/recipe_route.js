import express from "express";
import { isProduction } from "../utils/common.js";
import { Recipe } from "../model/Recipe.js";

const router = express.Router();

/* ************************* CREATE ************************* */

// create new recipe
router.post("/", async (req, res) => { 
    // validate request
    if (!req.body.name || !req.body.course || !req.body.cuisine || !req.body.category || 
        !req.body.recipeYield || !req.body.rating || !req.body.ingredients || !req.body.directions) {
        return res.status(400).send({error: "Name, category, ingredients and directions fields cannot be empty"});
    }

    const recipes = await Recipe.find();
    // traverse through recipes to check if there is a naming conflict (names must be unique)
    recipes.forEach(recipe => {
        if (recipe.name == req.body.name) {
            res.status(400).send({error: "Recipe name already exists!"});
        }
    });

    const data = {
        name:           req.body.name,
        course:         req.body.course,
        cuisine:        req.body.cuisine,
        category:       req.body.category,
        recipeYield:    req.body.recipeYield,
        rating:         req.body.rating,
        season:         req.body.season,
        tags:           req.body.tags,
        ingredients:    req.body.ingredients,
        directions:     req.body.directions
    };
    
    const recipe = new Recipe(data);

    try {
        const savedRecipe = await recipe.save();
        res.status(200).json(JSON.stringify(savedRecipe)); 
    } catch(err) {
        if (isProduction()) {
            console.error(err);
        }
        res.status(500).json({error: "Recipe not saved."}); 
    }
});




/* ************************* RETRIEVE ************************* */

// get all recipes
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch(err) {
        res.status(404).send({error: "Recipes not found!"});
    }
});

// get one recipe by name
router.get("/:name", async (req, res) => {
    try {
        const recipe = await Recipe.findOne({name: req.params.name});
        res.send(recipe);
    } catch(err) {
        res.status(404).send({error: "Recipe not found!"});
    }
});


/* ************************* UPDATE ************************* */



/* ************************* DELETE ************************* */





export {router as recipeRoutes};