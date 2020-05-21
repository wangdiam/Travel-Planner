function checkInput(destination, startDate, endDate) {
    console.log("::: Running checkInput :::");
    if (isEmptyOrSpaces(destination) || isEmptyOrSpaces(startDate) || isEmptyOrSpaces(endDate)) {
        const modal = document.getElementById("error-modal");
        console.log("Creating modal");
        modal.style.display = "block";
        return false;
    }
    if (Date.parse(endDate) < Date.parse(startDate)) {
        const modal = document.getElementById("error-modal");
        console.log("Creating modal");
        modal.style.display = "block";
        return false;
    } else {
        return true;
    }

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
}

export { checkInput }