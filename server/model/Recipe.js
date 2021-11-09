import { readFile } from 'fs/promises';
import mongoose from "mongoose";

const dbConfig = JSON.parse(await readFile(new URL('../config/mongo_config.json', 
                                                   import.meta.url)));

const connection = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
mongoose.connect(connection);

// make sure MongoDB server is running --> windows search bar --> type "services" --> enable/start MongoDB
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name:           {type: String},
    course:         {type: String},
    cuisine:        {type: String},
    category:       {type: String},
    cookTime:       {type: String},
    prepTime:       {type: String},
    totalTime:      {type: String},
    datePublished:  {type: String},
    recipeYield:    {type: String},
    rating:         {type: String},
    season:         {type: [String]},
    tags:           {type: [String]},
    ingredients:    {type: [String]},
    directions:     {type: String}
});

const RecipeModel = mongoose.model("RecipeModel", Recipe);


export { RecipeModel as Recipe };