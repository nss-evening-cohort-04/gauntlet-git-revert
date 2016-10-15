"use strict";

var Gauntlet = (function (weaponChoice){

  weaponChoice.WeaponRack = {};

  weaponChoice.WeaponRack.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
  };

  weaponChoice.WeaponRack.Dagger = function() {
    this.name = "dagger";
    this.damage = 4;
    this.hands = 1;
  };
  weaponChoice.WeaponRack.Dagger.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.BroadSword = function() {
    this.name = "broad sword";
    this.damage = 14;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.BroadSword.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.WarAxe = function() {
    this.name = "war axe";
    this.damage = 18;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.WarAxe.prototype = new weaponChoice.WeaponRack.Weapon();

  return weaponChoice;

  })(Gauntlet || {});
