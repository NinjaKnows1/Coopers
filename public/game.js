var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 1;
var buttonColors = ["red", "blue", "green", "yellow"];

$("body").keydown(function() {
    if (!gameStart) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStart = true;    
    }
});

$(".btn").click(function(event) {
    console.log(event.target.id);
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    var lastAnswerIndex = userClickedPattern.length -1;

    // Force a reflow to ensure animation can be re-triggered
    $(this).removeClass("flash");  // Remove class (if it's already there)
    void $(this)[0].offsetWidth;   // Trigger reflow
    $(this).addClass("flash");     // Re-add the class to trigger the animation

    setTimeout(function() {
        $(this).removeClass("flash");
    }, 200); // You might want to specify a delay (e.g., 500ms)

    makeSound(userChosenColor);
    
    checkAnswer(lastAnswerIndex);

    console.log(userClickedPattern);   

});



function nextSequence() {
    userClickedPattern = []; //every time you level up, clear user inputs
    $("h1").text("Level " + level); //update the level
    var randomNum = Math.floor(Math.random() * 4); //choose a new color
    console.log(randomNum);

    var newColor = buttonColors[randomNum];
    gamePattern.push(newColor);

    makeSound(newColor);
    animationPress(newColor)

    console.log(gamePattern);
    level++;
}

function animationPress(currentColor) {
    $("." + currentColor).addClass("pressed");
    console.log("currentColor is " + currentColor);
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function makeSound(userChosenColor){
    switch (userChosenColor) {
        case 'red':
           var red = new Audio("/sounds/red.mp3");
           red.play()
           break;
        case 'blue':
            var blue = new Audio("/sounds/blue.mp3");
            blue.play();
            break;

        case 'green':
            var green = new Audio("/sounds/green.mp3");
            green.play();
            break;

        case 'yellow':
            var yellow = new Audio("/sounds/yellow.mp3");
            yellow.play();
            break;

        case 'wrong':
            var wrongSound = new Audio("/sounds/wrong.mp3");
            wrongSound.play();

        default:
            console.log(this.id);
    }
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
    
    // If the user has completed the sequence, check if the entire pattern was followed
    if (userClickedPattern.length === gamePattern.length){
        //setTimeout(nextSequence, 1000); // This will call nextSequence after 1 second
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }else {
        //if the user is wrong, restart the game

        makeSound("wrong")
        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function startOver(){
      // If the user is wrong, restart the game
      gameStart = false;
      level = 1;
      gamePattern = [];
      userClickedPattern = [];
}