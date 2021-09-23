var alphabet = [],
    words = [],
    selectedWord = "",
    numberOfTries = 0,
    countOfFound = 0,
    totalRights = 7,
    results = null,
    statusArea = null;

function initialize() {
    results = document.getElementById("results");
    statusArea = document.getElementById("current-status");
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    words = ["apple", "ball", "water", "red", "white", "blue","green","orange","black","football", "summer","winter", "mansoon"];

    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();

    switch(position){
        case 0: results.innerHTML = "----- a day keeps doctor away ";
                break;
        case 1: results.innerHTML = "bat and --- are best pair ";
                break;
        case 2: results.innerHTML = "----- have no shape ";
                break;
        case 3: results.innerHTML = " roses are --- , violets are blue  ";
                break;
        case 4: results.innerHTML = "----- is color of peace ";
                break;
        case 5: results.innerHTML = " roses are red , violets are ----  ";
                break;
        case 6: results.innerHTML = "indian flag have 3 colors orange, while and -----";
                break;
        case 7: results.innerHTML = "indian flag have 3 colors ------, while and green ";
                break;
        case 8: results.innerHTML = "----- lives matters ";
                break;
        case 9: results.innerHTML = "ronaldo is great -------- player";
                break;
        case 10: results.innerHTML = " ------ is hottest season ";
                break;
        case 11: results.innerHTML = "------ is coldest season ";
                break;
        case 12: results.innerHTML = "------- is season of frogs  ";
                break;
        default: results.innerHTML =  "no hint ";

    }

    for (var i = 0; i < selectedWord.length; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.readOnly = true;
        document.getElementById("inputs").appendChild(input);
    }

    for (var i = 0; i < alphabet.length; i++) {
        var btn = document.createElement("button");
       btn.id='btn1'
        btn.innerHTML = alphabet[i];
        btn.onclick = checkIt;
        document.getElementById("buttons").appendChild(btn);
    }
}

function checkIt() {
    var currentValue = this.innerHTML,
        foundIt = true;

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] == currentValue) {
            document.getElementsByTagName("input")[i].value = currentValue;
            foundIt = false;
            countOfFound++;
        }
    }

    if (countOfFound == selectedWord.length) {
        results.innerHTML = "<h1>Congratulations !!!</h1>";
        return;
    }

    this.disabled = true;

    if (foundIt) {
        numberOfTries++;
        statusArea.src = "images/s" + numberOfTries+ ".gif";

        results.innerHTML = "Try it " + numberOfTries + " times.";
        results.innerHTML += "<br />";
        results.innerHTML += "You have " + (totalRights - numberOfTries) + " remaining.";

        if (numberOfTries == totalRights) {
            var btns = document.getElementsByTagName("button");

            for (var i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }
        }

    }

}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

window.onload = initialize;

const reloadtButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);
