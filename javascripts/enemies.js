"use strict";

var Gauntlet = (function (enemies){

enemies.Combatants.Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Shaman"];

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

return enemies;

})(Gauntlet || {});
