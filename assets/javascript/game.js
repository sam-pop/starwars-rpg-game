// Global variables


// Constructors
function Character(name, hp) {
    this.name = name;
    this.healthPoints = hp;
}

function Attacker(name, hp, ap, counter) {
    Character.call(this, name, hp);
    this.attackPower = ap;
    this.counterAttackPower = counter;
}

function Defender(name, hp, counter) {
    Character.call(this, name, hp);
    this.counterAttackPower = counter;
}

//TODO: remove
// TESTS
var luke = new Character("luke", 100);
console.log(luke);
var vader = new Attacker("darth", 1000, 100, 50);
console.log(vader);
var jedi = new Defender("jedi1", 200, 8);
console.log(jedi);