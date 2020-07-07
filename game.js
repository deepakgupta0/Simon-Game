var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started = false;
var clickStarted = false;
var level = 0;
var score = 0;
var highScore=0;
function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("LEVEL "+level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomChosenColour);
  // console.log(gamePattern);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function () {
  if(clickStarted)
  {
  userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  // nextSequence();
  checkAnswer(userClickedPattern.length-1);
}
});
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
      $("#"+currentColor).removeClass("pressed");
  },100);

}
$(document).keypress(function() {
  if(!started){
    // $("#level-title").text("Level " + level);
    level = 0;
    nextSequence();
    started = true;
    clickStarted = true;
  }
});
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      score++;
      $("#score").text(score);

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      },300);
      if(score>highScore){
        highScore = score;
      }
      $("#high-score").text(highScore);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      started = false;
      gamePattern=[];
      score=0;
      $("#score").text(score);
      clickStarted=false;
    }
}
