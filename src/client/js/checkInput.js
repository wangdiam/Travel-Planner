function checkInput(destination, startDate, endDate) {
    console.log("::: Running checkInput :::");
    const modal = document.getElementById("error-modal");
    const span = document.getElementsByClassName("close")[0];
    if (isEmptyOrSpaces(destination) || isEmptyOrSpaces(startDate) || isEmptyOrSpaces(endDate)) {
        console.log("Creating modal");
        modal.style.display = "block";
        span.addEventListener("click", () => {
            modal.style.display = "none";
        });
        return false;
    }
    if (Date.parse(endDate) < Date.parse(startDate)) {
        console.log("Creating modal");
        modal.style.display = "block";
        span.addEventListener("click", () => {
            modal.style.display = "none";
        });
        return false;
    } else {
        return true;
    }

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
}

export { checkInput }