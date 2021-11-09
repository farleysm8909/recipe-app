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





export {router as recipeRoutes};