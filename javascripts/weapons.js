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

  weaponChoice.WeaponRack.Axe = function() {
    this.name = "Axe";
    this.damage = 20;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.Axe.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Dagger = function() {
    this.name = "Dagger";
    this.damage = 5;
    this.hands = 1;
  };
  weaponChoice.WeaponRack.Dagger.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Spear = function() {
    this.name = "Spear";
    this.damage = 19;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.Spear.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Bow = function() {
    this.name = "Bow";
    this.damage = 18;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.Bow.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Wand = function() {
    this.name = "Wand";
    this.damage = 17;
    this.hands = 1;
  };
  weaponChoice.WeaponRack.Wand.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.SwordAndShield = function() {
    this.name = "Sword and Shield";
    this.damage = 15;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.SwordAndShield.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Staff = function() {
    this.name = "Staff";
    this.damage = 14;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.Staff.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Mace = function() {
    this.name = "Mace";
    this.damage = 15;
    this.hands = 1;
  };
  weaponChoice.WeaponRack.Mace.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Claymore = function() {
    this.name = "Claymore";
    this.damage = 15;
    this.hands = 2;
  };
  weaponChoice.WeaponRack.Claymore.prototype = new weaponChoice.WeaponRack.Weapon();

  weaponChoice.WeaponRack.Crossbow = function() {
    this.name = "Crossbow";
    this.damage = 18;
    this.hands = 1;
  };
  weaponChoice.WeaponRack.Crossbow.prototype = new weaponChoice.WeaponRack.Weapon();

  return weaponChoice;

  })(Gauntlet || {});
