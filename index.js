require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { simpleTranslateMock } = require("./tests/__mocks__/mocks.js");
const { taco } = require("./json/models/jsonObjects");
const TJO = require("translate-json-object");
const translator = TJO();

const startTime = new Date();

translator.init({
    googleApiKey: process.env.GOOGLE_CLOUD_API,
});

translator
    .translate(simpleTranslateMock(), "en")
    .then((data) => {
        const writeStream = fs.createWriteStream(
            path.resolve(__dirname, "json", "exports", "translate.json")
        );
        writeStream.write(JSON.stringify(data), (error) => {
            if (error) {
                console.log("Error: ", error.message);
                throw new Error();
            } else {
                const endTime = new Date();
                const sec = Math.round((endTime - startTime) / 1000);
                console.log(`Translated and saved in ${sec} seconds!`);
            }
        });
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
