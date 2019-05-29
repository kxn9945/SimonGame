// attributes
var randomNumber;
var buttonColours = ["red","blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;


$(document).ready(function(){
  $("#level-title").text("Press A Key to Start");

   $(document).keypress(function(event){
     if(!gameStart){
       console.log("start");
       gameStart = true;
       $("#level-title").text("Level " + level);
       nextSequence();
     }

   });

   $(".btn").on("click", function(){
     var userChosenColour = $(this).attr("id");
     console.log(userChosenColour);
     playSound(userChosenColour);
     userClickedPattern.push(userChosenColour);
     animatePress(userChosenColour);

     checkAnswer(userClickedPattern.length-1);

   });
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  selectNextPattern();
}

function selectNextPattern(){
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
