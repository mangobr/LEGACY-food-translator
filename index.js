const TJO = require("translate-json-object");
const dotenv = require('dotenv').config();
const { simpleTranslateMock } = require("./tests/__mocks__/mocks.js");


const translator = TJO();

translator.init({
  googleApiKey: process.env.GOOGLE_CLOUD_API,
});


  translator.translate(simpleTranslateMock(), "en")
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log('Error: ', error)
  })
  

