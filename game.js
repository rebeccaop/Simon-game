var gamePattern=[];
userClickedPattern=[];
var level=-1;
var check= false;
var buttonColours=["red","blue","green","yellow"];

function nextSequence(){
  level++;
  $("h1").text("Level"+" "+level);
  var randomNumber=Math.floor(Math.random() *4) ;

 var randomChoosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChoosenColour);

playSound(randomChoosenColour);

}

function handler(key){
  playSound(key);
}

function playSound(name){
  $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colourName) {
   $("#"+colourName).addClass("pressed");
   setTimeout(function () {
     $("#"+colourName).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length ===userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      },1000);
      userClickedPattern=[];
    }
  }
  else {
    var audio= new Audio("sounds/wrong.mp3")
    $("body").addClass("game-over");
           audio.play();
      setTimeout(function () {
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");

        $("h2").text("Highscore ="+" "+level);


       startOver();
  }
}

function startOver() {
  level=-1;
  check=false;
  gamePattern=[];

}

  $("body").on("keydown",function () {
    if(check===false){
     nextSequence();
       $("h2").text("Highscore = 0");
     check=true;
   }
  });


  $(".btn").on("click",function(){
    if(check===true){
     var userChosenColour= $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     handler(userChosenColour);
     animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1)
   }
 });
