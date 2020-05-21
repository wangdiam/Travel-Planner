function checkInput(inputText) {
    console.log("::: Running checkInput :::", inputText);
    if (isEmptyOrSpaces(inputText)) {
        alert("Please fill in the fields with appropriate information");
        return false;
    }
    return true;
}

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

export { checkInput }