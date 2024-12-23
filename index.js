var arrayColorsGame = new Array();
var UserPattern = new Array();
var level = 1;
var flagGameOver = false;
var keyPress = false;

$("html").keypress(function (e) {
    if((e.key == "A" || e.key == "a") && !keyPress){
        $("h1").text("Level " + level);
        game();
        keyPress = true;
    }
});

function game() {
    setTimeout(function(){
        randomColorGame();
    },300)
    
    click();
}

function randomColorGame() {
    random = true
    var classColor = buttonSelected(colorSelected());
    animationFlash("."+classColor);
    soundButton(classColor);
}

function click() {
    setTimeout(function(){
        $(".btn").on("click", function() {
            if(!flagGameOver){
                animationPressed("."+this.classList[1]);
                UserPattern.push(this.classList[1]);
                checkAnswer();
                soundButton(this.classList[1]);
            }
        });
    },100)
}

function checkAnswer(){
    if(checkArray(UserPattern) && UserPattern.length != 0) {
        UserPattern = [];
        setTimeout(function(){  
            randomColorGame();
        },100)
        level++;
        $("h1").text("Level " + level);
    }
}

function checkArray(UserPattern) {
    for(let i = 0; i < UserPattern.length;i++){
        if(buttonSelected(arrayColorsGame[i]) != UserPattern[i]) {
            gameOver();
            return false;
        }
    }

    if(arrayColorsGame.length == UserPattern.length){
        return true;
    }
}

function animationFlash(nameclass) {
    $(nameclass).fadeOut(200, function(e) {
        $(nameclass).fadeIn(200);
    }); 
}

function soundButton(nameclass) {
    var Url = './sounds/'+nameclass+".mp3";

    if(flagGameOver){
        Url = './sounds/wrong.mp3'
    }

    var audio = new Audio(Url);
    audio.play();
}

function buttonSelected(number){
    switch(number){
        case 1:
            return "green";
        case 2:
            return "red";
        case 3:
            return "yellow";
        case 4:
            return "blue";
    }
}

function animationPressed(className){
    $(className).addClass("pressed");

    setTimeout(function(){
         $(className).removeClass("pressed");
    }, 100)
}

function gameOver() {
    flagGameOver = true;

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
   }, 200)

   restart();
}

function restart(){
    $("h1").text("Game Over, Aperte qualquer tecla para Recomeçar.");

    $("html").keypress(function(e) {
        if(flagGameOver){
            level = 1;
            $("h1").text("Level " + level);
            arrayColorsGame = new Array();
            UserPattern = new Array();
            flagGameOver = false;
            randomColorGame();
        }
    });
}

function colorSelected(){
    var number = randomColor()
    arrayColorsGame.push(number);
    return number;
}

function randomColor(){
    return Math.floor(Math.random() * 4)+1;
}