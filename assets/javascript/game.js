var yourCharChosen = false;
var fightRound = 0;
var urHP = 0;
var urBaseAttackPwr = 0;
var urAttackPwr = 0;
var enemyCntrAttackPwr = 0;
var enemyHP = 0;

function resetPoints() {
  urHP = $("#urCharacter").children().children("h5").data("health-points");
  urBaseAttackPwr = $("#urCharacter").children().children("h5").data("base-attack-power");
  urAttackPwr = $("#urCharacter").children().children("h5").data("attack-power");
  enemyCntrAttackPwr = $("#enemyCharacter").children().children("h5").data("counter-attack-power");
  enemyHP = $("#enemyCharacter").children().children("h5").data("health-points");
}

function displayHealthPoints() {
  $("#textResultCtnr").html("<div id=\"textResult\">"+"Your health is "+urHP+
  "</div><div id=\"textResult\">"+"Enemy health is "+enemyHP+"</div>"+ "<br>"+
  "<div id=\"textResult\">"+"Your attack power is "+urBaseAttackPwr+"</div>" +
  "<div id=\"textResult\">"+"Enemy counter attack power is "+enemyCntrAttackPwr+"</div>");

  $("#urCharacter").children().children("div.card-body").children(".card-text").text(urHP + " Health Points");
  $("#enemyCharacter").children().children("div.card-body").children(".card-text").text(enemyHP + " Health Points");


}

function logEveryonesHealth() {
  console.log("Your health is " + urHP);
  console.log("Your Base Attack Power is " + urBaseAttackPwr);
  console.log("Enemy Attack Power is " + enemyCntrAttackPwr);
  console.log("Enemy Health Power is " + enemyHP);
}

function toggleFightBtn(isOff) {
  if(isOff) {
    $("#fytBtn").attr("disabled", "disabled");
    $("#fytBtn").toggleClass("disabled", true);
  } else {
    $("#fytBtn").removeAttr("disabled");
    $("#fytBtn").toggleClass("disabled");
  }
}

function fight() {

  console.log("************ Before deduction ***************");
  logEveryonesHealth();

  $("#urCharacter").children().children("h5").data("health-points", urHP - enemyCntrAttackPwr);
  $("#enemyCharacter").children().children("h5").data("health-points", enemyHP - urBaseAttackPwr);
  $("#urCharacter").children().children("h5").data("base-attack-power", urBaseAttackPwr + urAttackPwr);

  resetPoints();
  console.log("************ After deduction ***************");
  logEveryonesHealth();
  displayHealthPoints(urHP,enemyHP);

  

  if (enemyHP <= 0) {
    //Enemy has lost

    var lastEnemyName = $("#enemyCharacter").children().children("h5").text();
    
    $("#enemyCharacter").children().remove();

      if(fightRound<2) {
        $("#textResultCtnr").html("<div id=\"textResult\">You have defeated "+ lastEnemyName +"</div>"+
      "</div><div id=\"textResult\">Choose your next enemy</div>");
      }
      else {
        $("#textResultCtnr").html("<div id=\"textResult\">You have defeated "+ lastEnemyName +"</div>"+
      "</div><div id=\"textResult\">Game Over!! You have Won!!</div>"+
      "<button id=\"newGameBtn\" class=\"btn btn-primary\">"+"New Game</button>");
      $("#newGameBtn").on("click", function(){
        window.location.reload();
      });
      }
      

      $(".backstage a").toggleClass("disabled", false);

      toggleFightBtn(true);
      fightRound++;
  }
  else if (urHP <= 0) {
    //You have lost

    $("#textResultCtnr").html("<div id=\"textResult\">You have lost</div>"+
    "<button id=\"newGameBtn\" class=\"btn btn-primary\">"+"New Game</button>");

    $("#newGameBtn").on("click", function(){
      window.location.reload();
    });

      toggleFightBtn(true);
  }  
}

$("a").on("click", function(event) {
  if (!yourCharChosen) {
    //choosing your character
    $(this).toggleClass("disabled", true);
    $("#urCharacter").append($(this).parent().parent().removeClass("backstage").addClass("col-xs-4").removeClass("col-xs-3"));
    $("#titleLetter").text("Choose enemy character");
    $(".backstage").addClass("col-xs-4").removeClass("col-xs-3");
    $(this).replaceWith('<div id="urCharacterLabel">Your Character<div>');
    yourCharChosen = true;
  } else {
    //choosing enemy character
    toggleFightBtn(false);
    $(this).toggleClass("disabled", true);
    $(this).parent().parent().removeClass("backstage");
    if (fightRound == 0) {
      $("#enemyCharacter").append($(this).parent().parent());
      $(".backstage").addClass("col-xs-6").removeClass("col-xs-4");
      $("#fytBtnCtnr").append(
        '<button id="fytBtn" class="btn btn-danger">Fight</button>'
      );
      $("button#fytBtn").on("click", function() {
        fight();
      });
      $("#titleLetter").text("Fight!");
      resetPoints();
      displayHealthPoints();
    } else if (fightRound == 1) {
      $(".backstage").addClass("col-xs-12").removeClass("col-xs-6");
      $("#enemyCharacter").append($(this).parent().parent().removeClass("col-xs-6").addClass("col-xs-4"));
      resetPoints();
      displayHealthPoints();
    } else if (fightRound == 2) {
      $("#enemyCharacter").append($(this).parent().parent().removeClass("col-xs-12").addClass("col-xs-4"));
      resetPoints();
      displayHealthPoints();
    }

    $(this).replaceWith('<div id="enemyCharacterLabel">Your Enemy<div>');
    $(".backstage a").toggleClass("disabled", true);
  }
});


