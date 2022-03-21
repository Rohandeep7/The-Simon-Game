var buttonColors=["green","red","yellow","blue"]
var userPattern=[]
var gamePattern=[]

$(document).on("keydown",function(){
  if(gamePattern.length===0){
    nextLevel();
  }
})

function nextLevel(){
  userPattern=[]
  var randomColor=buttonColors[Math.floor(Math.random()*4)]
  gamePattern.push(randomColor)
  playSound(randomColor)
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100)
  $("#header-title").text("Level "+gamePattern.length)
}

$('.btn').click(function(){
  var userColor= this.id;
  playSound(userColor)
  userPattern.push(userColor);
  pressAnimate(userColor);
  checkAnswer();
})

function checkAnswer(){
  if(userPattern[userPattern.length-1]===gamePattern[userPattern.length-1]){
    if(userPattern.length===gamePattern.length){
      setTimeout(function(){
        nextLevel();
      },1000);
    }
  }
  else{
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    $("#header-title").text("Game Over, Press Any Key To Restart");
    startOver()
  }
}

function startOver(){
  gamePattern=[]
}

function playSound(color){
  var audio=new Audio("sounds/"+color+".mp3")
  audio.play();
}

function pressAnimate(color){
  $("#"+color).addClass("pressed")
  setTimeout(function(){
    $("#"+color).removeClass("pressed")
  },250);
}
