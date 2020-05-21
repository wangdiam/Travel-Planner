import { checkInput } from './checkInput'
import fetch from 'node-fetch';

function getCoordinatesOfElement(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

function scrollToElement(element) {
    window.scrollTo({
        top: getCoordinatesOfElement(element).top,
        left: getCoordinatesOfElement(element).left,
        behavior: "smooth"
    });
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let destination = document.getElementById('destination').value;
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    if (checkInput(destination, startDate, endDate)) {
        document.getElementById("loader-wrapper").style.display = "flex";
        fetch('/getData', {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "destination": destination, "startDate": startDate, "endDate": endDate })
            })
            .then(res => res.json())
            .then((res) => {
                const data = res;
                console.log(data);
                document.getElementById("trip-data-container").style.display = "flex";
                document.getElementById("trip-header").innerHTML = `My trip to:\n${data["cityName"]}, ${data["state"]}, ${data["country"]}`;
                document.getElementById("trip-date").innerHTML = `Departing:\n${startDate}`;
                document.getElementById("days-away-message").innerHTML = `${data["cityName"]}, ${data["state"]}, ${data["country"]} is ${data["daysAway"]} days away`;
                document.getElementById("length-of-trip").innerHTML = `A ${((Date.parse(endDate)-Date.parse(startDate))/ (1000 * 3600 * 24)).toFixed(0)}-day trip that ends on ${endDate}`
                document.getElementById("trip-data-container").style.backgroundImage = `url('${data["image"]}')`
                console.log(data["weatherData"][0]);
                if (data["weatherData"][0]["max_temp"] != null) {
                    document.getElementById("weather-information").innerHTML =
                        `Typical weather for then is:\nHigh - ${data["weatherData"][0]["max_temp"]} Low - ${data["weatherData"][0]["low_temp"]}`;
                } else {
                    document.getElementById("weather-information").innerHTML = `Typical weather for then is:\n${data["weatherData"][0]["temp"]}&#8451`;
                }
            })
            .then(() => {
                scrollToElement(document.getElementById("trip-data-container"));
                document.getElementById("loader-wrapper").style.display = "none";
            });
    }
}

export { handleSubmit, scrollToElement, getCoordinatesOfElement }