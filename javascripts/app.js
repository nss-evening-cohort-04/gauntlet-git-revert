"use strict";

let BattleGround = function () {
  this.player = null;
  this.enemy = null;
}


$(document).ready(function() {

  /*
    Test code to generate a human player and an orc player
   */
  var warrior = new Gauntlet.Combatants.Human();
  warrior.setWeapon(new Gauntlet.WeaponRack.WarAxe());
  warrior.generateClass();  // This will be used for "Surprise me" option
  console.log(warrior.toString());

  var orc = new Gauntlet.Combatants.Orc();
  orc.generateClass();
  orc.setWeapon(new Gauntlet.WeaponRack.BroadSword());
  console.log(orc.toString());

  var battleGround = new BattleGround();

  battleGround.player = warrior;
  battleGround.enemy = orc;

  console.log(battleGround);

  function attack(combatant) {
    console.log("player",combatant);
    console.log("player health",combatant.health);
    combatant.health -= 10;
    console.log("player health after",combatant.health);
  }

  attack(battleGround.player);

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
        BattleGround.player = new Gauntlet.Combatants.Player();
        BattleGround.player.playerName = $("#player-name").val();
        console.log("moving along player", BattleGround.player);
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        BattleGround.player.setWeapon(new Gauntlet.WeaponRack.BroadSword());
        console.log("moving along weapon", BattleGround.player);
        break;
      case "card--spell":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
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

});
