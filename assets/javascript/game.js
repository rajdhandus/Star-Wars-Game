var yourCharChosen = false;
var fightRound = 0;

$("#fytBtnCtnr").on("click", function() {
  fight();
});

function fight() {
  var urHP = $("#urCharacter")
    .children()
    .children("h5")
    .data("health-points");
  var urBaseAttackPwr = $("#urCharacter")
    .children()
    .children("h5")
    .data("base-attack-power");
  var enemyCntrAttackPwr = $("#enemyCharacter")
    .children()
    .children("h5")
    .data("counter-attack-power");
  var enemyHP = $("#enemyCharacter")
    .children()
    .children("h5")
    .data("health-points");

  console.log("************ Before deduction ***************");
  console.log("Your health is " + urHP);
  console.log("Your Base Attack Power is " + urBaseAttackPwr);
  console.log("Enemy Attack Power is " + enemyCntrAttackPwr);
  console.log("Enemy Health Power is " + enemyHP);

  $("#urCharacter")
    .children()
    .children("h5")
    .data("health-points", urHP - enemyCntrAttackPwr);
  $("#enemyCharacter")
    .children()
    .children("h5")
    .data("health-points", enemyHP - urBaseAttackPwr);
  $("#urCharacter")
    .children()
    .children("h5")
    .data("base-attack-power", urBaseAttackPwr * 2);

  urHP = $("#urCharacter")
    .children()
    .children("h5")
    .data("health-points");
  urBaseAttackPwr = $("#urCharacter")
    .children()
    .children("h5")
    .data("base-attack-power");
  enemyCntrAttackPwr = $("#enemyCharacter")
    .children()
    .children("h5")
    .data("counter-attack-power");
  enemyHP = $("#enemyCharacter")
    .children()
    .children("h5")
    .data("health-points");

  console.log("************ After deduction ***************");

  console.log("Your health is " + urHP);
  console.log("Your Base Attack Power is " + urBaseAttackPwr);
  console.log("Enemy Attack Power is " + enemyCntrAttackPwr);
  console.log("Enemy Health Power is " + enemyHP);

  if (urHP <= 0) {
    //You have lost
    $("#urCharacter")
      .child()
      .remove();
  } else if (enemyHP <= 0) {
    //Enemy has lost
    $("#enemyCharacter")
      .children()
      .remove();
    $(".backstage a").toggleClass("disabled", false);
    fightRound++;
  }
}

$("a").on("click", function(event) {
  if (!yourCharChosen) {
    //choosing your character
    $(this).toggleClass("disabled", true);
    $("#urCharacter").append(
      $(this)
        .parent()
        .parent()
        .removeClass("backstage")
        .addClass("col-xs-4")
        .removeClass("col-xs-3")
    );
    $("#titleLetter").text("Choose enemy character");
    $(".backstage")
      .addClass("col-xs-4")
      .removeClass("col-xs-3");
    $(this).replaceWith('<div id="urCharacterLabel">Your Character<div>');
    yourCharChosen = true;
  } else {
    //choosing enemy character
    $(this).toggleClass("disabled", true);
    $(this)
      .parent()
      .parent()
      .removeClass("backstage");
    
    if (fightRound == 0) {
      $(".backstage")
        .addClass("col-xs-6")
        .removeClass("col-xs-4");
      $(this).replaceWith('<div id="enemyCharacterLabel">Your Enemy<div>');
      $("#fytBtnCtnr").append(
        '<a id="fytBtn" class="btn btn-danger">Fight</a>'
      );
      $("#titleLetter").text("Fight!");
      $("#enemyCharacter").append(
        $(this)
          .parent()
          .parent()
      );
    } else if (fightRound == 1) {
        $(".backstage")
        .addClass("col-xs-12")
        .removeClass("col-xs-6");
        $("#enemyCharacter").append(
            $(this)
              .parent()
              .parent().removeClass("col-xs-6").addClass("col-xs-4")
          );
    }

    $(".backstage a").toggleClass("disabled", true);
  }
});
