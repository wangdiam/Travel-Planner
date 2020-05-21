import { checkInput } from './checkInput'

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let destination = document.getElementById('destination').value;
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
    if (checkInput(destination) && checkInput(startDate) && checkInput(endDate)) {
        console.log("::: Form Submitted :::")
        fetch('/getData', {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "destination": destination, "startDate": startDate, "endDate": endDate })
            })
            .then(res => res.json())
            .then(function(res) {
                const data = res.data;
            })
    }
}

export { handleSubmit }