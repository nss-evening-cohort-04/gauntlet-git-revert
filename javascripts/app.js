"use strict";

let selectedClass = null;
let selectedWeapon = null;
let selectedSpell = null;

let BattleGround = function () {
  this.player = null;
  this.enemy = null;
};

$(document).ready(function() {

    const $playerName = $('span#player-name');
    const $playerClass = $('span#player-class');
    const $playerHealth = $('#player-health');
    const $playerMana = $('#player-mana');


    var orc = new Gauntlet.Combatants.Orc();
    orc.generateClass();
    orc.setWeapon(new Gauntlet.WeaponRack.Spear());
    console.log(orc.toString());

    var battleGround = new BattleGround();

    battleGround.enemy = orc;

    function attack() {
        console.log("player health", battleGround.player.health);
        battleGround.player.health -= battleGround.enemy.weapon.damage;
        console.log("player health after", battleGround.player.health);

        $('#player-health .health-fill').css('height', battleGround.player.health + "%");
        if (battleGround.player.health < 1) {
            alert("Enemy Wins");
            return;
        }
        console.log("enemy health", battleGround.enemy.health);
        battleGround.enemy.health -= battleGround.player.weapon.damage;
        console.log("enemy health after", battleGround.enemy.health);
        $('#enemy-health .health-fill').css('height', battleGround.enemy.health + "%");
        if (battleGround.enemy.health < 1) {
            alert("Player Wins");
            return;
        }
    }

    $("#player-setup").show();

    /*
      When any button with card__link class is clicked,
      move on to the next view.
     */
    $(".card__link").click(function(e) {
        var nextCard = $(this).attr("next");
        var moveAlong = false;

        switch (nextCard) {
            case "card--class":
                moveAlong = ($("#player-name").val() !== "");
                battleGround.player = new Gauntlet.Combatants.Player();
                battleGround.player.playerName = $("#player-name").val();
                break;
            case "card--weapon":
                moveAlong = ($("#player-name").val() !== "");
                break;
            case "card--spell":
                moveAlong = ($("#player-name").val() !== "");
                console.log('selectedWeapon', selectedWeapon);
                battleGround.player.setWeapon(selectedWeapon);
                break;
            case "card--battleground":
                moveAlong = ($("#player-name").val() !== "");
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

    /*
      When the back button clicked, move back a view
     */
    $(".card__back").click(function(e) {
        var previousCard = $(this).attr("previous");
        $(".card").hide();
        $("." + previousCard).show();
    });

    $(".attack__link").click(function(e) {
        console.log("attack clicked");
        attack();
    });

    function setupBattleGroundScreen() {
        $playerName.text(battleGround.player.playerName);
        $playerClass.text(battleGround.player.class);
    }

});
