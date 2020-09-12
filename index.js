require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { simpleTranslateMock } = require("./tests/__mocks__/mocks.js");
const TJO = require("translate-json-object");
const translator = TJO();

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
      }
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
