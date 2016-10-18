"use strict";

var Gauntlet = (function (player){
player.Combatants = {};

/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
player.Combatants.Player = function(name) {
  this.species = null;
  this.class = null;
  this.weapon = null;
  this.spell = null;

  this.playerName = name || "unknown adventurer";
  this.health = Math.floor(Math.random() * 40 + 50);
  this.limbs = ["head", "neck", "arm", "leg", "torso"];
  this.skinColor = "gray";
  this.skinColors = [this.skinColor];
  this.strength = 90;
  this.intelligence = 90;

  this.toString = function() {
    var output = [this.playerName,
      ": a ",
      this.skinColor,
      " skinned ",
      this.species,
      " ",
      this.class,
      " with ",
      this.health,
      " health. ",
      (this.class.magical) ? "Able to cast " : " Wielding a ",
      this.weapon.toString(),
      "!"
    ].join("");
    return output;
  };
};

player.Combatants.Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = newWeapon;
};

player.Combatants.Player.prototype.setSpell = function(newSpell) {
  this.spell = newSpell;
};

player.Combatants.Player.prototype.generateClass = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

  // Get the string at the index
  var randomClass = this.allowedClasses[random];
  console.log('Random Class', randomClass);
  // Composes the corresponding player class into the player object
  this.class = new Gauntlet.GuildHall[randomClass]();

  // Add the health bonus
  this.health += this.class.healthBonus;
  return this.class;
};

player.Combatants.Player.prototype.generateWeapon = function() {
  // Get a random index from the allowed classes array
  this.allowedWeapons = ["Axe", "Dagger", "Spear", "Bow", "Wand", "SwordAndShield", "Staff", "Mace", "Claymore", "Crossbow"];
  var random = Math.round(Math.random() * (this.allowedWeapons.length - 1));

  // Get the string at the index
  var randomWeapon = this.allowedWeapons[random];

  return randomWeapon;
};

player.Combatants.Player.prototype.generateSpell = function() {
  // Get a random index from the allowed classes array
  this.allowedSpells = ["Sphere", "FrostNova", "KillingCurse", "Fireball", "Herpes", "Bubbles", "Pyroblast", "Moonbeam", "Earthquake", "Tremor", "Lightning"];
  var random = Math.round(Math.random() * (this.allowedSpells.length - 1));

  // Get the string at the index
  var randomSpell = this.allowedSpells[random];

  return randomSpell;
};

player.Combatants.Player.prototype.setClass = function(newClass) {
  this.class = new Gauntlet.GuildHall[newClass]();

  // Add the health bonus
  this.health += this.class.healthBonus;
  return this.class;
};

/*
  Define the base properties for a human in a
  constructor function.
 */
player.Combatants.Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  this.skinColors.push("brown", "red", "white", "disease");
  randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  this.skinColor = this.skinColors[randomSkin];

  this.allowedClasses = ["Warrior", "Berserker", "Valkyrie", "Monk"];
};
player.Combatants.Human.prototype = new player.Combatants.Player();


/*
  Define the base properties for a monster in a
  constructor function.
 */
player.Combatants.Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};

player.Combatants.Monster.prototype = new player.Combatants.Player();
return player;

})(Gauntlet || {});
