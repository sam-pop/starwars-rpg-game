// Global variables
var originalAttack = 0; // original attack strength
var player; // holds the player Object
var defender; // holds the current defender Object
var charArray = []; // array that stores the game characters (Objects)
var playerSelected = false; // flag to mark if we picked a player yet
var defenderSelected = false; // flag to mark if we picked a defender


// Constructor
function Character(name, hp, ap, counter) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
}


// Increase the attack strength (this attack strength + original attack strength)
Character.prototype.increaseAttack = function () {
    this.attackPower += originalAttack;
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
    var luke = new Character("luke", 100, 10, 5);
    var vader = new Character("vader", 200, 20, 10);
    var obi = new Character("obi", 150, 15, 12);
    charArray.push(luke, vader, obi);
}

// "Save" the original attack value
function setOriginalAttack(Obj) {
    originalAttack = Obj.attackPower;
}

// Stores the character the user clicked on in the player variable and removes it from charArray
$(document).on("click", "img", function () {
    if (!playerSelected) { // sets current player
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i];
                console.log("​player", player); //TODO: DELETE
                setOriginalAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
            }
        }
        $("#playerDiv").append(this); // appends the selected player to the div
    }
    if (playerSelected && !defenderSelected) { // sets defender
        for (var j = 0; j < charArray.length; j++) {
            if (charArray[j].name == (this).id) {
                defender = charArray[j];
                console.log("​defender", defender); // TODO: DELETE
                defenderSelected = true;
            }
        }
        $("#defenderDiv").append(this); // appends the selected defender to the div
    }
});

$(document).ready(function () {
    initCharacters();
});



//TODO: REMINDER! use charArr[index] to perform actions like attack etc, since luke,vader,obi etc are declared locally!