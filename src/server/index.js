var path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

let POSTAL_CODE = "";
let API_LINK = "http://api.geonames.org/postalCodeLookupJSON?postalcode=";
const API_END = "&country=US&username=sataystick";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
console.log("WEATHERBIT API KEY", WEATHERBIT_API_KEY);


const app = express()

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))
console.log(__dirname)



app.get('/', function(req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

app.post("/getData", (req, res) => {
            console.log(req.body);
            POSTAL_CODE = req.body.destination;
            console.log(API_LINK + POSTAL_CODE + API_END);
            const currentDate = new Date();
            const startDate = Date.parse(req.body.startDate);
            console.log(startDate - currentDate, startDate, currentDate);
            if (startDate - currentDate < 604800000) {
                fetch(https: //api.weatherbit.io/v2.0/current)
                }
                else {

                }
                /*     fetch(API_LINK + POSTAL_CODE + API_END)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)

                            })
                            .catch() */
            });


        module.exports = app;