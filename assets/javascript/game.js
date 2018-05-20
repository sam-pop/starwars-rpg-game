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
    var luke = new Character("luke", 100, 10, 5, "./assets/images/vader.jpg");
    var vader = new Character("vader", 200, 20, 10, "./assets/images/vader.jpg");
    var obi = new Character("obi", 150, 15, 12, "./assets/images/vader.jpg");
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

function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        console.log(charArray[i].pic);
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

// Stores the character the user clicked on in the player variable and removes it from charArray
$(document).on("click", "img", function () { //FIXME: can choose the player as defender after beating the first defender - maybe splice the defenser from the array
    if (playerSelected && !defenderSelected) {
        for (var j = 0; j < charArray.length; j++) {
            if (charArray[j].name == (this).id) {
                defender = charArray[j]; // sets defender
                defenderSelected = true;
            }
        }
        $("#defenderDiv").append(this); // appends the selected defender to the div
    }
    if (!playerSelected) {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i]; // sets current player
                setBaseAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
            }
        }
        updatePics("#pics", "#defendersLeftDiv");
        $("#playerDiv").append(this); // appends the selected player to the div
    }
});

// Attack button
$(document).on("click", "#attackBtn", function () {
    if (playerSelected && defenderSelected) {
        if (isAlive(player) && isAlive(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
        } else {
            if (!isAlive(player)) {
                alert("PLAYER DIED!"); //TODO: change this line
            }
            if (!isAlive(defender)) {
                alert("DEFENDER DIED!"); //TODO: change this line
                $("#defenderDiv").children().remove();
                defenderSelected = false;
            }
        }
    }
});

$(document).ready(function () {
    initCharacters();
    updatePics("", "#pics");
});
