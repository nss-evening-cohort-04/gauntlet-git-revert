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
