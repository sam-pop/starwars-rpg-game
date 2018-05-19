// Global variables
var originalAttack = 0; // original attack strength
var player; // holds the player Object
var CharArray = []; // array that stores the game characters (Objects)


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
    CharArray.push(luke, vader, obi);
}

// "Save" the original attack value
function setOriginalAttack(Obj) {
    originalAttack = Obj.attackPower;
}

// // ES6+ 
// $(document).on('click', 'img', function () {
//     var player = CharArray.find(item => item.name == (this).id);
// });

// SUPPORT FOR OLDER BROWSERS
$(document).on('click', 'img', function () {
    for (var i = 0; i < CharArray.length; i++) {
        if (CharArray[i].name == (this).id) {
            player = CharArray[i];
            CharArray.splice(i, 1);
        }
    }
});

initCharacters();