# Udacity Front End Development Nanodegree Capstone: Travel Planning App

A travel planning app that helps you plan your trips. Simply enter the desired trip location and dates and the app will display the current weather or weather forecast depending on the trip date and an image of the location using information obtained from external APIs.

## Table of Contents

1. [About the Project](#about-the-project)
2. [API(s) Used](#apis(s)-used)
3. [Development Strategy](#development-strategy)
4. [Additional Features](#additional-features)
5. [Getting Started](#getting-started) 
6. [Built With](#built-with)
7. [Test](#test)

## About the Project

The project will include simple input fields where you enter the location you are travelling to (currently only working for US cities) and the dates you are leaving and returning. If the trip is within a week, you will get the current weather at the destination. If the trip is more than a week in the future, you will get a predicted forecast. The API used in this project is from Weatherbit. Weatherbit accepts coordinates of the location entered to retrieve relevant weather information. Geonames API is utilized for obtaining the latitude and longitude of the destination. Once the above data are retrieved, Pixabay API will then be used to retrieve an image of the location entered.


## API(s) Used

* [Geonames API](http://www.geonames.org/export/web-services.html) - Geographical database from which the location data is pulled
* [WeatherBit API](https://www.weatherbit.io/api) - Weather API for current and future weather data
* [Pixabay API](https://pixabay.com/api/docs/) - RESTful interface for searching and retrieving free images and videos

## Development strategy

1. Started by creating a file structure that is required by Webpack and started with the design of my HTML first and then working my way up from there
2. After setting up HTML and CSS, start to implement buttons and display behaviours using ES6 and complete my front-end designs
3. Create a Node.js server using Express and import relevant API keys from my .env file that is not included in this repository
4. Fetch API requests and see how relevant information from the responses can be packaged to be sent back to the client
5. Unpack the response on the client side and pass them in to relevant divs
6. Added small visual improvements

## Additional Features

1. Add end date and display length of the trip
2. Pull in an image for the country from Pixabay API when the entered location brings up no results.

## Getting Started

1. Download or clone the project:
```
git clone https://github.com/wangdiam/FEND-Capstone-Project.git [folder_name]
```
2. Install dependencies
```
npm install --save-dev
```
3. Start the server
```
npm start
```
4. Setup the environment development or production
```
npm run build-dev
```
or 
```
npm run build-prod
```
5. Test with Jest
```
npm run test
```

## Built With
 
* [Sass](https://sass-lang.com/documentation) - The CSS framework used
* [Webpack](https://webpack.js.org/concepts/) - Asset Management
* [Babel](https://babeljs.io/) - JavaScript Compiler
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime
* [Express.js](https://expressjs.com/) - Server Framework for Node.js
* [Jest](https://jestjs.io/) - JavaScript Testing Framework
* [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) - For offline capability

## Test

To test the application, run
```
npm run test
```