"use strict";

let selectedClass = null;
let selectedWeapon = null;
let selectedSpell = null;
let selectedRace = null;
let manaRegen = 7;

let BattleGround = function() {
  this.player = null;
  this.enemy = null;
  this.battleText = [];
  this.playerInitialHealth = 0;
  this.enemyInitialHealth = 0;
  this.playerInitialMana = 0;
  this.enemyInitialMana = 0;
};

$(document).ready(function() {

  const $playerName = $('span#player-name');
  const $enemyName = $('span#enemy-name');
  const $playerClass = $('span#player-class');
  const $playerHealth = $('#player-health');
  const $playerMana = $('#player-mana');
  const $battleText = $('#battle-text');

  var battleGround = new BattleGround();
  battleGround.enemy = generateRandomEnemy();
  battleGround.enemyInitialHealth = battleGround.enemy.health;
  battleGround.enemyInitialMana = battleGround.enemy.mana;

  function attack(type) {
    let attackFirst = Math.floor(Math.random() * 2) + 1;
    let continueFighting = true;

    console.log("attackFirst", attackFirst);
    setTimeout(function functionName() {
      continueFighting = (attackFirst === 1)
        ? attackPlayer()
        : attackEnemy(type);
      if (continueFighting) {
        setTimeout(function functionName() {
          continueFighting = (attackFirst === 1)
            ? attackEnemy(type)
            : attackPlayer();
        }, 1000);
      }
    }, 500);
  }

  function attackPlayer() {
    let type = Math.floor(Math.random() * 2) + 1;
    if (type === 1 && battleGround.enemy.mana >= battleGround.enemy.spell.manaCost) {
      if(battleGround.player.health >= battleGround.enemy.spell.damage){
        battleGround.player.health -= battleGround.enemy.spell.damage;
      }else{
        battleGround.player.health = 0;
      }
      $battleText.append(`<div>${battleGround.enemy.playerName} attacked with ${battleGround.enemy.spell.name} for ${battleGround.enemy.spell.damage} damage.</div>`);
      battleGround.enemy.mana -= battleGround.enemy.spell.manaCost;
    } else {
      if(battleGround.player.health >= battleGround.enemy.weapon.damage){
        battleGround.player.health -= battleGround.enemy.weapon.damage;
      }else{
        battleGround.player.health = 0;
      }
      $battleText.append(`<div>${battleGround.enemy.playerName} attacked with ${battleGround.enemy.weapon.name} for ${battleGround.enemy.weapon.damage} damage.</div>`);
    }
    if (battleGround.enemyInitialMana !== battleGround.enemy.mana) {
      if (battleGround.enemy.mana + manaRegen <= battleGround.enemyInitialMana) {
        battleGround.enemy.mana += manaRegen;
      } else {
        battleGround.enemy.mana = battleGround.enemyInitialMana;
      }
    }
    $('#enemy-mana .mana-fill').css('height', (battleGround.enemy.mana / battleGround.enemyInitialMana) * 100 + "%");
    $('#enemy-mana .mana-title').html(`${battleGround.enemy.mana} / ${battleGround.enemyInitialMana}`);
    $('#player-health .health-fill').css('height', (battleGround.player.health / battleGround.playerInitialHealth) * 100 + "%");
    $('#player-health .health-title').html(`${battleGround.player.health} / ${battleGround.playerInitialHealth}`);
    battleGround.enemy.health -= battleGround.enemy.weapon.damage;
    if (battleGround.player.health < 1) {
      $('.weapon-btn').attr("disabled", true);
      $('.spell-btn').attr("disabled", true);
      $('#reset-battleground-btn').show();
      $('#battle-text').hide();
      $('#winning-moment').show();
      $('#winning-moment').html(`${battleGround.enemy.playerName} Wins!`);
      return false;
    }
    return true;
  }

  function attackEnemy(type) {
    if (type === "spell" && battleGround.player.mana >= battleGround.player.spell.manaCost) {
      if(battleGround.enemy.health >= battleGround.player.spell.damage){
        battleGround.enemy.health -= battleGround.player.spell.damage;
      }else{
        battleGround.enemy.health = 0;
      }
      $battleText.append(`<div>${battleGround.player.playerName} attacked with ${battleGround.player.spell.name} for ${battleGround.player.spell.damage} damage.</div>`);
      battleGround.player.mana -= battleGround.player.spell.manaCost;
    } else {
      if(battleGround.enemy.health >= battleGround.player.weapon.damage){
        battleGround.enemy.health -= battleGround.player.weapon.damage;
      }else{
        battleGround.enemy.health = 0;
      }
      $battleText.append(`<div>${battleGround.player.playerName} attacked with ${battleGround.player.weapon.name} for ${battleGround.player.weapon.damage} damage.</div>`);
    }
    if (battleGround.playerInitialMana !== battleGround.player.mana) {
      if (battleGround.player.mana + manaRegen <= battleGround.playerInitialMana) {
        battleGround.player.mana += manaRegen;
      } else {
        battleGround.player.mana = battleGround.playerInitialMana;
      }
    }
    $('#player-mana .mana-fill').css('height', (battleGround.player.mana / battleGround.playerInitialMana) * 100 + "%");
    $('#enemy-health .health-fill').css('height', (battleGround.enemy.health / battleGround.enemyInitialHealth) * 100 + "%");
    $('#player-mana .mana-title').html(`${battleGround.player.mana} / ${battleGround.playerInitialMana}`);
    $('#enemy-health .health-title').html(`${battleGround.enemy.health} / ${battleGround.enemyInitialHealth}`);
    if (battleGround.enemy.health < 1) {
      $('.weapon-btn').attr("disabled", true);
      $('.spell-btn').attr("disabled", true);
      $('#reset-battleground-btn').show();
      $('#battle-text').hide();
      $('#winning-moment').show();
      $('#winning-moment').html(`<div>${battleGround.player.playerName} Wins!</div>`)
      return false;
    }
    return true;
  }

  setInterval(() => {
    $('#battle-text').children().first().fadeOut(1000).remove();
  }, 3000);

  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--playerCreation":
        moveAlong = ($("#player-name").val() !== "");
        if (selectedRace != null) {
          console.log("select race", selectedRace);
          battleGround.player = selectedRace;
          if ($("#player-name").val() !== "") {
            battleGround.player.playerName = $("#player-name").val();
          }
        }
        if (selectedClass != null) {
          battleGround.player.setClass(selectedClass);
          battleGround.playerInitialHealth = battleGround.player.health;
          battleGround.playerInitialMana = battleGround.player.mana;
        }
        if (selectedWeapon != null) {
          battleGround.player.setWeapon(selectedWeapon);
        }
        if (selectedSpell != null) {
          battleGround.player.setSpell(selectedSpell);
        }
        break;
      case "card--race":
        moveAlong = true;
        break;
      case "card--class":
        moveAlong = true;
        break;
      case "card--weapon":
        moveAlong = true;
        break;
      case "card--spell":
        moveAlong = true;
        break;
      case "card--battleground":
        $("body").removeClass("login");
        $("body").addClass("goldshire");
        battleGround.player.setSpell(selectedSpell);
        console.log('card--weapon battleGround.player', battleGround.player);
        console.log("battleGround", battleGround);
        moveAlong = (battleGround.player.spell !== null);
        console.log('battleGround.player.playerName', battleGround.player.playerName);
        setupBattleGroundScreen();
        break;
    }
    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  $(document).on("click", ".class__link", function(e) {
    let races = $(this).find(".btn__text").attr("races");
    switch (races) {
      case "Human":
        console.log("Human selected");
        selectedRace = new Gauntlet.Combatants.Human();
        break;
      case "Elf":
        console.log("Elf selected");
        selectedRace = new Gauntlet.Combatants.Human();
        break;
      case "Dwarf":
        console.log("Dwarf selected");
        selectedRace = new Gauntlet.Combatants.Human();
        break;
    }
  });

  $(document).on("click", ".class__link", function(e) {
    let classes = $(this).find(".btn__text").attr("classes");
    switch (classes) {
      case "Warrior":
        console.log("Warrior selected");
        selectedClass = new Gauntlet.GuildHall.Warrior();
        break;
      case "Valkyrie":
        console.log("Valkyrie selected");
        selectedClass = new Gauntlet.GuildHall.Valkyrie();
        break;
      case "Berserker":
        console.log("Berserker selected");
        selectedClass = new Gauntlet.GuildHall.Berserker();
        break;
      case "Monk":
        console.log("Monk selected");
        selectedClass = new Gauntlet.GuildHall.Monk();
        break;
      case "Wizard":
        console.log("Wizard selected");
        selectedClass = new Gauntlet.GuildHall.Wizard();
        break;
      case "Sorcerer":
        console.log("Sorcerer selected");
        selectedClass = new Gauntlet.GuildHall.Sorcerer();
        break;
      case "Conjurer":
        console.log("Conjurer selected");
        selectedClass = new Gauntlet.GuildHall.Conjurer();
        break;
      case "Shaman":
        console.log("Shaman selected");
        selectedClass = new Gauntlet.GuildHall.Shaman();
        break;
      case "Thief":
        console.log("Thief selected");
        selectedClass = new Gauntlet.GuildHall.Thief();
        break;
      case "Ninja":
        console.log("Ninja selected");
        selectedClass = new Gauntlet.GuildHall.Ninja();
        break;
      case "Assassin":
        console.log("Assassin selected");
        selectedClass = new Gauntlet.GuildHall.Assassin();
        break;
      case "randomClass":
        console.log("randomClass selected");
        let Class = battleGround.player.generateClass();
        console.log('Class', Class);
        selectedClass = new Gauntlet.GuildHall[Class]();
        break;
    }
  });

  $(document).on("click", ".spell__link", function(e) {
    let spell = $(this).find(".btn__text").attr("spell");
    switch (spell) {
      case "Sphere":
        console.log("Sphere selected");
        selectedSpell = new Gauntlet.SpellBook.Sphere();
        break;
      case "FrostNova":
        console.log("FrostNova selected");
        selectedSpell = new Gauntlet.SpellBook.FrostNova();
        break;
      case "KillingCurse":
        console.log("KillingCurse selected");
        selectedSpell = new Gauntlet.SpellBook.KillingCurse();
        break;
      case "Fireball":
        console.log("Fireball selected");
        selectedSpell = new Gauntlet.SpellBook.Fireball();
        break;
      case "Herpes":
        console.log("Herpes selected");
        selectedSpell = new Gauntlet.SpellBook.Herpes();
        break;
      case "Bubbles":
        console.log("Bubbles selected");
        selectedSpell = new Gauntlet.SpellBook.Bubbles();
        break;
      case "Pyroblast":
        console.log("Pyroblast selected");
        selectedSpell = new Gauntlet.SpellBook.Pyroblast();
        break;
      case "Earthquake":
        console.log("Earthquake selected");
        selectedSpell = new Gauntlet.SpellBook.Earthquake();
        break;
      case "Tremor":
        console.log("Tremor selected");
        selectedSpell = new Gauntlet.SpellBook.Tremor();
        break;
      case "Lightning":
        console.log("Lightning selected");
        selectedSpell = new Gauntlet.SpellBook.Lightning();
        break;
      case "Moonbeam":
        console.log("Moonbeam selected");
        selectedSpell = new Gauntlet.SpellBook.Moonbeam();
        break;
      case "randomSpell":
        console.log("randomSpell selected");
        spell = battleGround.player.generateSpell();
        console.log('spell', spell);
        selectedSpell = new Gauntlet.SpellBook[spell]();
        break;
    }
  });
  $(document).on("click", ".weapon__link", function(e) {
    let weapon = $(this).find(".btn__text").attr("weapon");
    switch (weapon) {
      case "Axe":
        console.log("Axe selected");
        selectedWeapon = new Gauntlet.WeaponRack.Axe();
        break;
      case "Dagger":
        console.log("Dagger selected");
        selectedWeapon = new Gauntlet.WeaponRack.Dagger();
        break;
      case "Spear":
        console.log("Spear selected");
        selectedWeapon = new Gauntlet.WeaponRack.Spear();
        break;
      case "Bow":
        console.log("Bow selected");
        selectedWeapon = new Gauntlet.WeaponRack.Bow();
        break;
      case "Wand":
        console.log("Wand selected");
        selectedWeapon = new Gauntlet.WeaponRack.Wand();
        break;
      case "SwordAndShield":
        console.log("SwordAndShield selected");
        selectedWeapon = new Gauntlet.WeaponRack.SwordAndShield();
        break;
      case "Staff":
        console.log("Staff selected");
        selectedWeapon = new Gauntlet.WeaponRack.Staff();
        break;
      case "Mace":
        console.log("Mace selected");
        selectedWeapon = new Gauntlet.WeaponRack.Mace();
        break;
      case "Claymore":
        console.log("Claymore selected");
        selectedWeapon = new Gauntlet.WeaponRack.Claymore();
        break;
      case "Crossbow":
        console.log("Crossbow selected");
        selectedWeapon = new Gauntlet.WeaponRack.Crossbow();
        break;
      case "randomWeapon":
        console.log("randomWeapon selected");
        weapon = battleGround.player.generateWeapon();
        console.log('weapon', weapon);
        selectedWeapon = new Gauntlet.WeaponRack[weapon]();
        break;
    }
  });

  $("#player-setup").show();

  /*
      When the back button clicked, move back a view
     */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

  $(".weapon-btn").click(function(e) {
    attack("weapon");
  });

  $(".spell-btn").click(function(e) {
    attack("spell");
  });

  $(".reset-btn").click(function(e) {
    resetBG();
  });

  function resetBG() {
    battleGround.player.health = battleGround.playerInitialHealth;
    battleGround.player.mana = battleGround.playerInitialMana;
    battleGround.enemy.health = battleGround.enemyInitialHealth;
    battleGround.enemy.mana = battleGround.enemyInitialMana;
    $('#player-mana .mana-fill').css('height', (battleGround.player.mana / battleGround.playerInitialMana) * 100 + "%");
    $('#player-health .health-fill').css('height', (battleGround.player.health / battleGround.playerInitialHealth) * 100 + "%");
    $('#enemy-mana .mana-fill').css('height', (battleGround.enemy.mana / battleGround.enemyInitialMana) * 100 + "%");
    $('#enemy-health .health-fill').css('height', (battleGround.enemy.health / battleGround.enemyInitialHealth) * 100 + "%");
    $('#player-mana .mana-title').html(`${battleGround.player.mana} / ${battleGround.playerInitialMana}`);
    $('#player-health .health-title').html(`${battleGround.player.health} / ${battleGround.playerInitialHealth}`);
    $('#enemy-mana .mana-title').html(`${battleGround.enemy.mana} / ${battleGround.enemyInitialMana}`);
    $('#enemy-health .health-title').html(`${battleGround.enemy.health} / ${battleGround.enemyInitialHealth}`);
    $('.weapon-btn').attr("disabled", false);
    $('.spell-btn').attr("disabled", false);
    $('#reset-battleground-btn').hide();
    $('#battle-text').html("");
    $('#battle-text').show();
    $('#winning-moment').hide();
  }

  function setupBattleGroundScreen() {
    $playerName.text(battleGround.player.toString());
    $enemyName.text(battleGround.enemy.toString());
    $('#player-mana .mana-title').html(`${battleGround.player.mana} / ${battleGround.playerInitialMana}`);
    $('#player-health .health-title').html(`${battleGround.player.health} / ${battleGround.playerInitialHealth}`);
    $('#enemy-mana .mana-title').html(`${battleGround.enemy.mana} / ${battleGround.enemyInitialMana}`);
    $('#enemy-health .health-title').html(`${battleGround.enemy.health} / ${battleGround.enemyInitialHealth}`);
  }

  function generateRandomEnemy() {
    let random = 0;
    let names = ["Zoe", "Nathan", "Joe", "Steve", "William"];
    random = Math.round(Math.random() * (names.length - 1));
    let randomName = names[random];

    let enemies = ["Murloc", "Kobold", "Gnoll", "Orc", "Undead"];
    random = Math.round(Math.random() * (enemies.length - 1));
    let randomClass = enemies[random];

    let randomEnemy = new Gauntlet.Combatants[randomClass]();
    randomEnemy.playerName = randomName;
    let weapon = randomEnemy.generateWeapon();
    let spell = randomEnemy.generateSpell();

    randomEnemy.weapon = new Gauntlet.WeaponRack[weapon]();
    randomEnemy.spell = new Gauntlet.SpellBook[spell]();
    console.log("random Enemey", randomEnemy);
    return randomEnemy;
  }


});
