var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var gameSpeed = 0.55;
var CharecterSpeed= 2;

//moving our charecter to left
function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    //geting property of elemnt from css
    if (left > 0) {
        character.style.left = left - CharecterSpeed + "px";
        // this -CharecterSpeed is determinig movement, in a way speed to left
    }
}

//moving our charecter to right
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    //geting property of elemnt from css
    if (left < 475) {
        character.style.left = left + CharecterSpeed + "px";
        // this +CharecterSpeed is determinig movement, in a way speed to right

    }
}

//adding listener so that our move function will be executed on respective key usage
document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
        //this set interval function takes our function and a time interval and carries the function at that interval of time
    }
});
//adding listener with clearInterval to remove the function set by setInterval
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

//this set interval function takes our function and a time interval and carries the function at that interval of time

//this function used to create and move our blocks
var blocks = setInterval(function () {

    //geting an element block from css and naming it blocklast here 
    var blockLast = document.getElementById("block" + (counter - 1));

    //geting an element hole from css and naming it hole last here 
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {

        //taking top property of elemnt block from css and naming it blocklasttop
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));

        //taking top property of elemnt block from css and naming it blocklasttop
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);

        // new blocks and holes after 100px of previous
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        //generating holes at random places in the range of width of blocks
        var random = Math.floor(Math.random() * 450);
        hole.style.left = random + "px";

        //adding these elemnts to our game
        game.appendChild(block);
        game.appendChild(hole);


        currentBlocks.push(counter);

        counter++;
    }
    //getting top and left properties of our charecter
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;

    //if the charecter reaches to the first row of screen ie , hits the top GAME OVER
    if (characterTop <= 0) {
        alert("Game over. Score: " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }
    //moving the blocks upwards
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        //moving above with a speed defined earlier
        iblock.style.top = iblockTop - gameSpeed + "px";
        ihole.style.top = iblockTop - gameSpeed + "px";
        if (iblockTop < -20) {
            //removing the top block
            currentBlocks.shift();
            
            iblock.remove();
            ihole.remove();
        }
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                //if charecter is at hole drop =0
                drop = 0;
            }
        }
    }
    if (drop == 0) {
        //and if drop=0
        if (characterTop < 480) {
            // if charecter is inside the window it will fall
            character.style.top = characterTop + 2 + "px";
        }
    }
    else {
        //else it will move with blocks
        character.style.top = characterTop - gameSpeed + "px";
    }
}, 1);