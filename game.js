var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
userClickedPattern=[];


var started=false;
var level=0;

$(".restart-btn").text("Start");
$(".restart-btn").click(function()
    {
        
        if(!started)
        {
            $(".restart-btn").text("Restart");
            $("#level-title").text("Level "+level);
            nextSequence();
            started=true;
        }
    }); 


$(".btn").click(function()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) 
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {nextSequence();}, 1000);
        }
    } 
    else 
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);   

        $("#level-title").text("Game Over! Press Restart to Play Again");
        startOver();
    }
}


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    var activeButton=$("#"+currentColor);
    activeButton.addClass("pressed");
    setTimeout(function(){activeButton.removeClass("pressed");},100);
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}