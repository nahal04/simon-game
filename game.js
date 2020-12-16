const buttonColours = ["red", "blue", "green", "yellow"];
var userChosenPattern = [];
let gamePattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userChosenPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    level++;
    $("#level-title").text("Level " + level);
}

$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    userChosenPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenPattern.length - 1);
})

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
})

$(document).on("tap", function(){
        if (!started){
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
})

function checkAnswer(currentLevel){
    if (userChosenPattern[currentLevel] === gamePattern[currentLevel]){
        if (userChosenPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

