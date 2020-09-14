require("dotenv").config();
const fs = require("fs");
const path = require("path");
const TJO = require("translate-json-object");
const jsonStream = require("JSONStream");
const translator = TJO();

translator.init({
    googleApiKey: process.env.GOOGLE_CLOUD_API,
});

const readJsonStream = fs.createReadStream(
    path.resolve(__dirname, "json", "models", `${process.env.JSON_INPUT_FILE}.json`),
    { highWaterMark: 50 }
);
const writeJsonStream = fs.createWriteStream(
    path.resolve(__dirname, "json", "exports", `${process.env.JSON_OUTPUT_FILE}.json`)
);

readJsonStream.pipe(jsonStream.parse())
.on("data", async (data) => {
    try {
        let translatedObject = await translator.translate(data, "en")
        
        writeJsonStream.write(JSON.stringify(translatedObject), (error) => {
            if (error) {
                console.log("Ops, an error: ", error);
            }
            console.log(translatedObject)
        });
    } catch (error) {
        console.log("Error: ", error);
    }
});
