import express from "express";
import { isProduction } from "../utils/common.js";
import { Recipe } from "../model/Recipe.js";

const router = express.Router();

/* ************************* GET ************************* */

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



export {router as recipeRoutes};