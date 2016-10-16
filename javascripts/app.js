"use strict";

let selectClass = null;
let selectWeapon = null;
let selectSpell = null;

$(document).ready(function() {

  const $playerName = $('span#player-name');
  const $playerClass = $('span#player-class');
  const $playerHealth = $('#player-health');
  const $playerMana = $('#player-mana');


  var orc = new Gauntlet.Combatants.Orc();
  orc.generateClass();
  orc.setWeapon(new Gauntlet.WeaponRack.BroadSword());
  console.log(orc.toString());

  var battleGround = new BattleGround();

  battleGround.enemy = orc;

  function attack() {
    console.log("player health",battleGround.player.health);
    battleGround.player.health -= battleGround.enemy.weapon.damage;
    console.log("player health after",battleGround.player.health);

    $('#player-health .health-fill').css('height', battleGround.player.health + "%");
    if(battleGround.player.health < 1){
      alert("Enemy Wins");
      return;
    }
    console.log("enemy health",battleGround.enemy.health);
    battleGround.enemy.health -= battleGround.player.weapon.damage;
    console.log("enemy health after",battleGround.enemy.health);
    $('#enemy-health .health-fill').css('height', battleGround.enemy.health + "%");
    if(battleGround.enemy.health < 1){
      alert("Player Wins");
      return;
    }
  }

  console.log(battleGround);

  /*
    Test code to generate a spell
   */
  var spell = new Gauntlet.SpellBook.Sphere();
  console.log("spell: ", spell.toString());
  /*
    Show the initial view that accepts player name
   */
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
        battleGround.player.setWeapon(new Gauntlet.WeaponRack.BroadSword());
        break;
      case "card--spell":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        console.log('battleGround.player.playerName', battleGround.player.playerName);
        setupBattleGroundScreen();
        break;
    }

$(document).on("click", ".spell__link", function(e) {
     let spell = $(this).find(".btn__text").attr("spell");
     switch(spell){
       case "Sphere":
       console.log("Sphere selected");
       spellSelected = new Gauntlet.SpellBook.Sphere();
       break;
       case "FrostNova":
       console.log("FrostNova selected");
       spellSelected = new Gauntlet.SpellBook.FrostNova();
       break;
       case "KillingCurse":
       console.log("KillingCurse selected");
       spellSelected = new Gauntlet.SpellBook.KillingCurse();
       break;
       case "Fireball":
       console.log("Fireball selected");
       spellSelected = new Gauntlet.SpellBook.Fireball();
       break;
       case "Herpes":
       console.log("Herpes selected");
       spellSelected = new Gauntlet.SpellBook.Herpes();
       break;
       case "Bubbles":
       console.log("Bubbles selected");
       spellSelected = new Gauntlet.SpellBook.Bubbles();
       break;
       case "Pyroblast":
       console.log("Pyroblast selected");
       spellSelected = new Gauntlet.SpellBook.Pyroblast();
       break;
       case "Earthquake":
       console.log("Earthquake selected");
       spellSelected = new Gauntlet.SpellBook.Earthquake();
       break;
       case "Tremor":
       console.log("Tremor selected");
       spellSelected = new Gauntlet.SpellBook.Tremor();
       break;
       case "Lightning":
       console.log("Lightning selected");
       spellSelected = new Gauntlet.SpellBook.Lightning();
       break;
       case "Moodbeam":
       console.log("Moodbeam selected");
       spellSelected = new Gauntlet.SpellBook.Moodbeam();
       break;
     }
   });

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
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
