"use strict";

var Gauntlet = (function (spells){
spells.SpellBook = {};


/*
  Base spell function that defines name, damage, damage type
 */
spells.SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.damageTypes = ["lightning", "fire", "water", "earth", "mysticism"];
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  };
};

/*
  An elemental sphere that can be cast by a magical class
 */
spells.SpellBook.Sphere = function() {
  this.name = "sphere";
  this.damage = Math.floor(Math.random() * 10 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
spells.SpellBook.Sphere.prototype = new spells.SpellBook.Spell();

return spells;

})(Gauntlet || {});
