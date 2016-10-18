"use strict";

let selectedClass = null;
let selectedWeapon = null;
let selectedSpell = null;

let BattleGround = function () {
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
    const $playerClass = $('span#player-class');
    const $playerHealth = $('#player-health');
    const $playerMana = $('#player-mana');
    const $battleText = $('#battle-text');

    var orc = new Gauntlet.Combatants.Orc();
    orc.generateClass();
    orc.setWeapon(new Gauntlet.WeaponRack.Spear());
    console.log(orc.toString());

    var battleGround = new BattleGround();
    battleGround.enemy = orc;
    battleGround.enemyInitialHealth = battleGround.enemy.health;
    battleGround.enemyInitialMana = battleGround.enemy.mana;

    function attack(type) {
      let attackFirst = Math.floor(Math.random() * 2) + 1
      let continueFighting = true;

      console.log("attackFirst", attackFirst);
      setTimeout(function functionName() {
        continueFighting = (attackFirst === 1) ? attackPlayer() : attackEnemy(type);
        if (continueFighting) {
          setTimeout(function functionName() {
            continueFighting = (attackFirst === 1) ? attackEnemy(type) : attackPlayer();
          }, 1000);
        }
      }, 500);
    }

    function attackPlayer() {
      console.log("player health", battleGround.player.health);
      battleGround.player.health -= battleGround.enemy.weapon.damage;
      console.log(`enemy attack with ${battleGround.enemy.weapon.name} for ${battleGround.enemy.weapon.damage} damage`);
      $battleText.append(`<div>-${battleGround.enemy.weapon.damage}</div>`);
      battleGround.battleText.push(battleGround.enemy.weapon.damage);
      console.log("player health after", battleGround.player.health);

      $('#player-health .health-fill').css('height', (battleGround.player.health / battleGround.playerInitialHealth) * 100 + "%");
      if (battleGround.player.health < 1) {
        $('.weapon-btn').attr("disabled", true);
        $('.spell-btn').attr("disabled", true);
          alert("Enemy Wins");
          $('#reset-battleground-btn').toggle();
          return false;
      }
      return true;
    }

    function attackEnemy(type) {
      console.log("enemy health", battleGround.enemy.health);
      let manaRegen = 10;
      if(type === "spell" && battleGround.player.mana >= battleGround.player.spell.manaCost){
          battleGround.enemy.health -= battleGround.player.spell.damage;
          console.log(`player attack with ${battleGround.player.spell.name} for ${battleGround.player.spell.damage} damage`);
          $battleText.append(`<div>-${battleGround.player.spell.damage}</div>`);
          battleGround.battleText.push(battleGround.player.weapon.damage);
          console.log('player mana before', battleGround.player.mana);
          battleGround.player.mana -= battleGround.player.spell.manaCost;
          console.log(`player attack with ${battleGround.player.spell.name} for ${battleGround.player.spell.manaCost} mana cost`);
      }else{
        battleGround.enemy.health -= battleGround.player.weapon.damage;
        console.log(`player attack with ${battleGround.player.weapon.name} for ${battleGround.player.weapon.damage} damage`);
        $battleText.append(`<div>-${battleGround.player.weapon.damage}</div>`);
        battleGround.battleText.push(battleGround.player.weapon.damage);
      }
      if(battleGround.playerInitialMana !== battleGround.player.mana){
        if(battleGround.player.mana + manaRegen <= battleGround.playerInitialMana){
          battleGround.player.mana += manaRegen;
        }else{
          battleGround.player.mana = battleGround.playerInitialMana;
        }
      }
      $('#player-mana .mana-fill').css('height', (battleGround.player.mana / battleGround.playerInitialMana) * 100 + "%");
      console.log("enemy health after", battleGround.enemy.health);
      $('#enemy-health .health-fill').css('height', (battleGround.enemy.health / battleGround.enemyInitialHealth) * 100 + "%");
      if (battleGround.enemy.health < 1) {
          $('.weapon-btn').attr("disabled", true);
          $('.spell-btn').attr("disabled", true);
          alert("Player Wins");
          $('#reset-battleground-btn').toggle();
          return false;
      }
      return true;
    }

    setInterval(()=>{
      $('#battle-text').children().first().fadeOut(500).remove();
    },2000);

    $(".card__link").click(function(e) {
        var nextCard = $(this).attr("next");
        var moveAlong = false;

        switch (nextCard) {
            case "card--class":
                moveAlong = ($("#player-name").val() !== "");
                battleGround.player = new Gauntlet.Combatants.Player();
                break;
            case "card--weapon":
                battleGround.player.playerName = $("#player-name").val();
                battleGround.player.setClass(selectedClass);
                battleGround.playerInitialHealth = battleGround.player.health;
                battleGround.playerInitialMana = battleGround.player.mana;
                moveAlong = (battleGround.player.class !== null);
                console.log('card--weapon battleGround.player',battleGround.player);
                break;
            case "card--spell":
                console.log('selectedWeapon', selectedWeapon);
                battleGround.player.setWeapon(selectedWeapon);
                moveAlong = (battleGround.player.weapon !== null);
                console.log('card--weapon battleGround.player',battleGround.player);
                break;
            case "card--battleground":
                battleGround.player.setSpell(selectedSpell);
                console.log('card--weapon battleGround.player',battleGround.player);
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
                selectedClass = new Gauntlet.GuildHall.randomClass();
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
            case "random":
                console.log("random selected");
                selectedSpell = new Gauntlet.SpellBook.random();
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
            case "Random":
                console.log("random selected");
                selectedWeapon = new Gauntlet.WeaponRack.Random();
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
      $('.weapon-btn').attr("disabled", false);
      $('.spell-btn').attr("disabled", false);
      $('#reset-battleground-btn').toggle();
    }

    function setupBattleGroundScreen() {
        $playerName.text(battleGround.player.playerName);
        $playerClass.text(battleGround.player.class);
    }

});
