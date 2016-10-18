"use strict";

var Gauntlet = (function (enemies){

enemies.Combatants.Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Wizard", "Shaman"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Orc.prototype = new enemies.Combatants.Monster();


enemies.Combatants.Murloc = function() {
  this.health = this.health + 5;
  this.species = "Murloc";
  this.allowedClasses = ["Ninja", "Berserker", "Valkyrie"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Murloc.prototype = new enemies.Combatants.Monster();


enemies.Combatants.Kobold = function() {
  this.health = this.health + 30;
  this.species = "Kobold";
  this.allowedClasses = ["Shaman", "Assassin", "Monk"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];
    console.log('random class', randomClass);
    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Kobold.prototype = new enemies.Combatants.Monster();


enemies.Combatants.Gnoll = function() {
  this.health = this.health + 15;
  this.species = "Gnoll";
  this.allowedClasses = ["Conujurer", "Monk", "Warrior"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Gnoll.prototype = new enemies.Combatants.Monster();


enemies.Combatants.Wolves = function() {
  this.health = this.health + 10;
  this.species = "Wolves";
  this.allowedClasses = ["Berserker", "Monk", "Sorcerer"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Wolves.prototype = new enemies.Combatants.Monster();

enemies.Combatants.Undead = function() {
  this.health = this.health + 35;
  this.species = "Undead";
  this.allowedClasses = ["Warrior", "Sorcerer", "Conujurer"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new enemies.GuildHall[randomClass]();
    return this.class;
  };
};
enemies.Combatants.Undead.prototype = new enemies.Combatants.Monster();

return enemies;

})(Gauntlet || {});

