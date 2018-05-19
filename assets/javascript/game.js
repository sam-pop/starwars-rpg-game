// Global variables
var originalAttack = 0;
var player;
var CharArray = [];

// Constructor
function Character(name, hp, ap, counter) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
}

Character.prototype.increaseAttack = function () {
    this.attackPower += originalAttack;
};

Character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    this.increaseAttack();
};

Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
};

function initCharacters() {
    var luke = new Character("luke", 100, 10, 5);
    var vader = new Character("vader", 200, 20, 10);
    var obi = new Character("obi", 150, 15, 12);
    CharArray.push(luke, vader, obi);
}

function setOriginalAttack(Obj) {
    originalAttack = Obj.attackPower;
}

$(document).on('click', 'img', function () {
    for (var i = 0; i < CharArray.length; i++) {
        if (CharArray[i].name == (this).id) {
            player = CharArray[i];
            CharArray.splice(i, 1);
        }
    }
});

initCharacters();

// WORKING!
// $(document).on('click', 'img', function () {
//     alert((this).id);
// // });