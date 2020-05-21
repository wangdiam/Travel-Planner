const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


const app = express()

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))
console.log(__dirname)

let POSTAL_CODE = "";
let API_LINK = "http://api.geonames.org/postalCodeLookupJSON?postalcode=";
const API_END = "&country=US&username=sataystick";
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
console.log("WEATHERBIT API KEY", WEATHERBIT_API_KEY);


app.get('/', function(req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Travel planning app listening on port 8081!')
})

let tripData = {}

app.post("/getData", (req, res) => {
    console.log(req.body);
    POSTAL_CODE = req.body.destination;
    console.log(API_LINK + POSTAL_CODE + API_END);
    const currentDate = new Date();
    const startDate = Date.parse(req.body.startDate);
    console.log(startDate - currentDate, startDate, currentDate);
    let lng = "";
    let lat = "";
    fetch(API_LINK + POSTAL_CODE + API_END)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lng = data["postalcodes"][0]["lng"];
            lat = data["postalcodes"][0]["lat"];
            console.log(lng, lat);
        })
        .then(() => {
            tripData["daysAway"] = ((startDate - currentDate) / (1000 * 3600 * 24)).toFixed(0);
            console.log(tripData);
            if (startDate - currentDate < 604800000) {
                fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        tripData["cityName"] = data["data"][0]["city_name"];
                        tripData["state"] = data["data"][0]["state_code"];
                        tripData["country"] = data["data"][0]["country_code"];
                        tripData["weatherData"] = [{ "date": data["data"][0]["datetime"], "low_temp": null, "max_temp": null, "temp": data["data"][0]["temp"] }];
                        console.log(tripData);
                    })
                    .then(() => {
                        fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${tripData["cityName"]}+city&image_type=photo`)
                            .then(response => response.json())
                            .then(data => {
                                if (data["total"] != 0) {
                                    tripData["image"] = data["hits"][0]["largeImageURL"];
                                    console.log("Trip Data", tripData);
                                    res.send(tripData);
                                } else {
                                    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${tripData["country"]}+country&image_type=photo`)
                                        .then(response => response.json())
                                        .then(data => {
                                            tripData["image"] = data["hits"][0]["largeImageURL"];
                                            console.log(tripData);
                                            res.send(tripData);
                                        })
                                }
                            });
                    });
            } else {
                fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&days=${tripData["daysAway"]}&key=${WEATHERBIT_API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        tripData["weatherData"] = [];
                        let days = parseInt(tripData["daysAway"], 10);
                        console.log(data);
                        tripData["cityName"] = data["city_name"];
                        tripData["state"] = data["state_code"];
                        tripData["country"] = data["country_code"];
                        for (day = 0; day < (days > 16 ? 16 : days); day++) {
                            tripData["weatherData"].push({ "date": data["data"][day]["datetime"], "low_temp": data["data"][day]["low_temp"], "max_temp": data["data"][day]["max_temp"], "temp": null });
                        }
                    })
                    .then(() => {
                        fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${tripData["cityName"]}+city&image_type=photo`)
                            .then(response => response.json())
                            .then(data => {
                                if (data["total"] != 0) {
                                    tripData["image"] = data["hits"][0]["largeImageURL"];
                                    console.log("Trip Data", tripData);
                                    res.send(tripData);

                                } else {
                                    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${tripData["country"]}+country&image_type=photo`)
                                        .then(response => response.json())
                                        .then(data => {
                                            tripData["image"] = data["hits"][0]["largeImageURL"];
                                            res.send(tripData);
                                        })
                                }
                            })
                    });
            }
        })
});


module.exports = app;