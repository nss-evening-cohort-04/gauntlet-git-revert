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
            case "Moodbeam":
                console.log("Moodbeam selected");
                selectedSpell = new Gauntlet.SpellBook.Moodbeam();
                break;
        }
    });
    $(document).on("click", ".weapon__link", function(e) {
        let weapon = $(this).find(".btn__text").attr("weapon");
        switch (weapon) {
            case "Axe":
                console.log("axe selected");
                selectedWeapon = new Gauntlet.WeaponRack.Axe();
                break;
            case "Dagger":
                console.log("dagger selected");
                selectedWeapon = new Gauntlet.WeaponRack.Dagger();
                break;
            case "BroadSword":
                console.log("BroadSword selected");
                selectedWeapon = new Gauntlet.WeaponRack.Spear();
                break;
            case "Wand":
                console.log("BroadSword selected");
                selectedWeapon = new Gauntlet.WeaponRack.Wand();
                break;
            case "SwordandShield":
                console.log("BroadSword selected");
                selectedWeapon = new Gauntlet.WeaponRack.SwordandShield();
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
                console.log("Crossbow");
                selectedWeapon = new Gauntlet.WeaponRack.Crossbow();
                break;
            case "Random":
                console.log("random");
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
