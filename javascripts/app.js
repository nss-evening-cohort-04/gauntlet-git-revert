"use strict";

let BattleGround = function () {
  this.player = null;
  this.enemy = null;
}
let spellSelected = null;

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

});
