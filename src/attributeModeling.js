require("dotenv").config();
const tacoTranslated = require("../json/exports/tacoTranslated.json");
const taco = require("../json/models/taco.json");
const fs = require("fs");
const path = require("path");

const descriptionList = []

taco.map(food => {
    descriptionList.push(food.description)
})

tacoTranslated.map(food =>{
    food.searchDescription = descriptionList[0]
    descriptionList.shift()
})

const writeJsonStream = fs.createWriteStream(
    path.resolve(__dirname, "..", "json", "exports", `${process.env.JSON_OUTPUT_FILE}.json`)
);

writeJsonStream.write(JSON.stringify(tacoTranslated), (error) => {
    if (error) {
        console.log("Ops, an error: ", error);
    }
})