"use strict";

var Gauntlet = (function (weaponChoice){

  weaponChoice.weaponRack = {};

  weaponChoice.weaponRack.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
<<<<<<< HEAD
  };

  weaponChoice.weaponRack.Dagger = function() {
    this.name = "dagger";
    this.damage = 4;
    this.hands = 1;
  };
  weaponChoice.weaponRack.Dagger.prototype = new weaponChoice.weaponRack.Weapon();

  weaponChoice.weaponRack.BroadSword = function() {
    this.name = "broad sword";
    this.damage = 14;
    this.hands = 2;
  };
  weaponChoice.weaponRack.BroadSword.prototype = new weaponChoice.weaponRack.Weapon();

  weaponChoice.weaponRack.WarAxe = function() {
    this.name = "war axe";
    this.damage = 18;
    this.hands = 2;
  };
  weaponChoice.weaponRack.WarAxe.prototype = new weaponChoice.weaponRack.Weapon();

  return weaponChoice;

  })(Gauntlet || {});


=======
};

var Dagger = function() {
  this.name = "dagger";
  this.damage = 4;
  this.hands = 1;
};
Dagger.prototype = new Weapon();

var BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
BroadSword.prototype = new Weapon();

var WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
WarAxe.prototype = new Weapon();
>>>>>>> master
