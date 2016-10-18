"use strict";

var Gauntlet = (function (classesChoice){

classesChoice.GuildHall = {};

/*
  Base function for a player, or enemy, class (profession)
 */
classesChoice.GuildHall.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  this.magical = false;

  this.toString = function() {
    return this.name;
  };
};

/*
    FIGHTER CLASSES
      - Warrior
      - Valkyrie
      - Berserker
      - Monk
 */
classesChoice.GuildHall.Fighter = function() {
  this.healthBonus = 50;
  this.strengthBonus = 10;
};
classesChoice.GuildHall.Fighter.prototype = new classesChoice.GuildHall.PlayerClass();


classesChoice.GuildHall.Warrior = function() {
  this.name = "Warrior";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
};
classesChoice.GuildHall.Warrior.prototype = new classesChoice.GuildHall.Fighter();


classesChoice.GuildHall.Valkyrie = function() {
  this.name = "Valkyrie";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
};
classesChoice.GuildHall.Valkyrie.prototype = new classesChoice.GuildHall.Fighter();


classesChoice.GuildHall.Berserker = function() {
  this.name = "Berserker";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
};
classesChoice.GuildHall.Berserker.prototype = new classesChoice.GuildHall.Fighter();


classesChoice.GuildHall.Monk = function() {
  this.name = "Monk";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
};
classesChoice.GuildHall.Monk.prototype = new classesChoice.GuildHall.Fighter();


/*
    MAGICAL CLASSES
      - Shaman
      - Wizard
      - Conjurer
      - Sorcerer
 */
classesChoice.GuildHall.Mage = function() {
  this.name = "Mage";
  this.magical = true;
  this.healthBonus = this.healthBonus - 10;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
classesChoice.GuildHall.Mage.prototype = new classesChoice.GuildHall.PlayerClass();


classesChoice.GuildHall.Shaman = function() {
  this.name = "Shaman";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 20;
};
classesChoice.GuildHall.Shaman.prototype = new classesChoice.GuildHall.Mage();


classesChoice.GuildHall.Wizard = function() {
  this.name = "Wizard";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 25;
  this.intelligenceBonus = this.intelligenceBonus + 40;
};
classesChoice.GuildHall.Wizard.prototype = new classesChoice.GuildHall.Mage();


classesChoice.GuildHall.Conjurer = function() {
  this.name = "Conjurer";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
classesChoice.GuildHall.Conjurer.prototype = new classesChoice.GuildHall.Mage();


classesChoice.GuildHall.Sorcerer = function() {
  this.name = "Sorcerer";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
classesChoice.GuildHall.Sorcerer.prototype = new classesChoice.GuildHall.Mage();


/*
    STEALTH CLASSES
      - Thief
      - Ninja
      - Assassin
 */

classesChoice.GuildHall.Stealth = function() {
  this.name = "Stealth";
  this.magical = false;
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 5;
  this.intelligenceBonus = this.intelligenceBonus + 10;
};
classesChoice.GuildHall.Stealth.prototype = new classesChoice.GuildHall.PlayerClass();

classesChoice.GuildHall.Thief = function() {
  this.name = "Thief";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
classesChoice.GuildHall.Thief.prototype = new classesChoice.GuildHall.Stealth();

classesChoice.GuildHall.Ninja = function() {
  this.name = "Ninja";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
classesChoice.GuildHall.Ninja.prototype = new classesChoice.GuildHall.Stealth();

classesChoice.GuildHall.Assassin = function() {
  this.name = "Assassin";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
};
classesChoice.GuildHall.Assassin.prototype = new classesChoice.GuildHall.Stealth();


return classesChoice;
})(Gauntlet || {});
