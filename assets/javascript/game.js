// Global variables
var baseAttack = 0; // original attack strength
var player; // holds the player Object
var defender; // holds the current defender Object
var charArray = []; // array that stores the game characters (Objects)
var playerSelected = false; // flag to mark if we picked a player yet
var defenderSelected = false; // flag to mark if we picked a defender


// Constructor
function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}


// Increase the attack strength (this attack strength + original attack strength)
Character.prototype.increaseAttack = function () {
    this.attackPower += baseAttack;
};

// Performs an attack
Character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    this.increaseAttack();
};

// Performs a counter attack
Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
};


// Initialize all the characters
function initCharacters() {
    var luke = new Character("Luke Skywalker", 100, 10, 5, "./assets/images/vader.jpg");
    var vader = new Character("Darth Vader", 200, 50, 30, "./assets/images/vader.jpg");
    var obi = new Character("Obi One", 150, 15, 2, "./assets/images/vader.jpg");
    charArray.push(luke, vader, obi);
}

// "Save" the original attack value
function setBaseAttack(Obj) {
    baseAttack = Obj.attackPower;
}

// Checks if character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;
}

// Checks if the player has won
function isWinner() {
    if (charArray.length == 0)
        return true;
    else return false;
}

// Update the characters pictures location on the screen (move them between divs)
function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(divID).append("<div />");
        $(divID + ' div:last-child').addClass("card");
        $(divID + ' div:last-child').append("<img />");
        $(divID + " img:last-child").attr("id", charArray[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", charArray[i].pic);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + ' div:last-child').append(charArray[i].name + "<br>");
        $(divID + ' div:last-child').append("HP: " + charArray[i].healthPoints);
        $(divID + ' idv:last-child').append();

    }
}

function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}


// Change the view from the first screen to the second screen
function changeView() {
    $('#firstScreen').empty();
    $('#secondScreen').show();
}


$(document).on("click", "img", function () {
    // Stores the defender the user has clicked on in the defender variable and removes it from the charArray
    if (playerSelected && !defenderSelected && (this.id != player.name)) {
        for (var j = 0; j < charArray.length; j++) {
            if (charArray[j].name == (this).id) {
                defender = charArray[j]; // sets defender
                charArray.splice(j, 1);
                defenderSelected = true;
            }
        }
        $("#defenderDiv").append(this); // appends the selected defender to the div
        $("#defenderDiv").append("<br>" + defender.name);
        $("#defenderHealthDiv").append(defender.healthPoints);
    }
    // Stores the character the user has clicked on in the player variable and removes it from charArray
    if (!playerSelected) {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i]; // sets current player
                setBaseAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
                changeView();
            }
        }
        updatePics("#game", "#defendersLeftDiv");
        $("#playerDiv").append(this); // appends the selected player to the div
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append(player.healthPoints);
    }

});

// The attack button functionality
$(document).on("click", "#attackBtn", function () {
    if (playerSelected && defenderSelected) {
        if (isAlive(player) && isAlive(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
            $('#playerHealthDiv').html(player.healthPoints);
            if (!isAlive(player)) {
                $('#playerHealthDiv').html("0");
                alert("PLAYER DIED!"); //TODO: change this line


            }
        } else if (!isAlive(defender)) {
            alert("DEFENDER DIED!"); //TODO: change this line
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            defenderSelected = false;
            if (isWinner()) {
                // TODO: do somethign if player eliminated all defenders 
            }
        }
    }
});

// EXECUTE
$(document).ready(function () {
    $('#secondScreen').hide();
    initCharacters();
    characterCards("#game");
});