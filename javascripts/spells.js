"use strict";

var Gauntlet = (function (spells){
spells.SpellBook = {};

/*
  Base spell function that defines name, damage, damage type
 */
spells.SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.toString = function() {
    return this.name + " for " + this.damage + " damage!";
  };
};

/*
  An elemental sphere that can be cast by a magical class
 */
spells.SpellBook.Sphere = function() {
  this.name = "Sphere";
  this.damage = 3;
};
spells.SpellBook.Sphere.prototype = new spells.SpellBook.Spell();

spells.SpellBook.FrostNova = function() {
  this.name = "FrostNova";
  this.damage = 7;
};
spells.SpellBook.FrostNova.prototype = new spells.SpellBook.Spell();

spells.SpellBook.KillingCurse = function() {
  this.name = "KillingCurse";
  this.damage = 11;
};
spells.SpellBook.KillingCurse.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Fireball = function() {
  this.name = "Fireball";
  this.damage = 6;
};
spells.SpellBook.Fireball.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Herpes = function() {
  this.name = "Herpes";
  this.damage = 2;
};
spells.SpellBook.Herpes.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Bubbles = function() {
  this.name = "Bubbles";
  this.damage = 1;
};
spells.SpellBook.Bubbles.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Pyroblast = function() {
  this.name = "Pyroblast";
  this.damage = 8;
};
spells.SpellBook.Pyroblast.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Earthquake = function() {
  this.name = "Earthquake";
  this.damage = 9;
};
spells.SpellBook.Earthquake.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Tremor = function() {
  this.name = "Tremor";
  this.damage = 4;
};
spells.SpellBook.Tremor.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Lightning = function() {
  this.name = "Lightning";
  this.damage = 10;
};
spells.SpellBook.Lightning.prototype = new spells.SpellBook.Spell();

spells.SpellBook.Moodbeam = function() {
  this.name = "Moodbeam";
  this.damage = 5;
};
spells.SpellBook.Moodbeam.prototype = new spells.SpellBook.Spell();

return spells;

})(Gauntlet || {});


