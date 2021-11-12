import { readFile } from 'fs/promises';
import mongoose from "mongoose";

const dbConfig = JSON.parse(await readFile(new URL('../config/mongo_config.json', 
                                                   import.meta.url)));

const connection = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
mongoose.connect(connection);

// make sure MongoDB server is running --> windows search bar --> type "services" --> enable/start MongoDB
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name:           {type: String, required: true},
    //img:            {type: String, default: "placeholder.jpg"},
    course:         {type: String, required: true},
    cuisine:        {type: String, required: true},
    category:       {type: String, required: true},
    cookTime:       {type: Number, required: true},
    prepTime:       {type: Number, required: true},
    totalTime:      {type: Number, default: (prepTime, cookTime) => prepTime + cookTime},
    datePublished:  {type: Date, default: () => Date.now()},
    recipeYield:    {type: String, required: true},
    rating:         {type: String, required: true},
    season:         {type: [String], required: true},
    tags:           {type: [String], required: true},
    ingredients:    {type: [String], required: true},
    directions:     {type: [String], required: true}
});

const RecipeModel = mongoose.model("RecipeModel", Recipe);


export { RecipeModel as Recipe };