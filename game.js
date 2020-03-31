var buttonColors = ["red","blue","green","yellow"];
var level = 0;
var gameOn = false;
var gamePattern = [];
var userClickedPattern = [];


$(document).on("keydown",function(){
  if(!gameOn) {
    $("h1").html("Level "+level);
    nextSequence();
    gameOn=true;
  }
});


$(".btn").on("click",function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
  userClickedPattern=[];
  $("h1").html("Level "+level);
  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        userClickedPattern=[];
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level=0;
  gamePattern=[];
  gameOn = false;
}
