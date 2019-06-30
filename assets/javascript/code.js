
$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
$(".jumbotron").css({ height: $(window).height() + "px" });
});

// Variables

let rightPicks = 0;
let wrongPicks = 0;
let questionsAsked = 0;
var timer = 30;
var intervalId;
const timeScore = [];
let timeAvgTotal = 0;
let category = "";
let difficulty = "";
let question = "";
let cAnswer = "";
let iAnswer1 = "";
let iAnswer2 = "";
let iAnswer3 = "";
let $question = "";
let $cAnswer = "";
let $iAnswer1 = "";
let $iAnswer2 = "";
let $iAnswer3 = "";
var options = [];
var quizObject = {};
let giphySearch = "";
let categorySelect = false;
let difficultySelect = false;
let resetState = false;

$("#game-results").hide();
$("#game-giphy").hide();
$("#game-trivia").hide();
$("#text-box").text("Choose a Category and Difficulty");

// timer functions

function startClock() {
    timer = 30;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    timer--;
    $("#clock").text(timer);
    if (timer === 0) {
        stopClock();
        $("#clock").text("0");
        $("#text-box").html(`You ran out of time! The correct answer was: <span style='color: green'>${cAnswer}</span>`);
        giphyCue();
        setTimeout(askQuestion, 5000);
    }
}

function stopClock() {
    clearInterval(intervalId);
}

// Fisher-Yates shuffle for randomizing order of multiple choice options

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

// game start, reset, and restart functions

$(document).on("click", "#start-game", function() {
    if (categorySelect === true && difficultySelect === true) {
        resetState = false;
        $("#category1").addClass("unable");
        $("#category2").addClass("unable");
        $("#category3").addClass("unable");
        $("#diff-easy").addClass("unable");
        $("#diff-medium").addClass("unable");
        $("#diff-hard").addClass("unable");
        askQuestion();
        startClock();
        setTimeout(function() {
            $("#start-game").attr("id", "reset-game").text("Reset Game");
        }, 200);
    } else if (categorySelect === false && difficultySelect === false) {
        $("#text-box").text("First Choose a Category and Difficulty");
    } else if (categorySelect === false && difficultySelect === true) {
        $("#text-box").text("First Choose a Category");
    } else if (categorySelect === true && difficultySelect === false) {
        $("#text-box").text("First Choose a Difficulty");
    } else {};
}) 

$(document).on("click", "#reset-game", function() {
    gameReset();
    resetState = true;
    $("#game-trivia").hide();
    $("#game-giphy").hide();
    $("#giphy-home").hide();
    $("#reset-game").attr("id", "restart-game").text("Restart Game");
}) 

$(document).on("click", "#restart-game", function() {
    if (categorySelect === true && difficultySelect === true) {
        $("#right-picks").text("0");
        $("#wrong-picks").text("0");
        $("#restart-game").attr("id", "reset-game").text("Reset Game");
        resetState = false;
        questionsAsked = 0;
        $("#category1").addClass("unable");
        $("#category2").addClass("unable");
        $("#category3").addClass("unable");
        $("#diff-easy").addClass("unable");
        $("#diff-medium").addClass("unable");
        $("#diff-hard").addClass("unable");
        $("#game-results").hide();
        askQuestion();
        startClock();
    } else if (categorySelect === false && difficultySelect === false) {
        $("#text-box").text("First Choose a Category and Difficulty");
    } else if (categorySelect === false && difficultySelect === true) {
        $("#text-box").text("First Choose a Category");
    } else if (categorySelect === true && difficultySelect === false) {
        $("#text-box").text("First Choose a Difficulty");
    } else {};
}) 

// category and difficulty toggle buttons

$(document).on("click", "#category1", function() {
    category = "27";
    $(this).removeClass("btn-secondary").addClass("btn-dark active");
    if ($("#category2").hasClass("btn-dark active")) {
        $("#category2").removeClass("btn-dark active").addClass("btn-secondary");
    }
    if ($("#category3").hasClass("btn-dark active")) {
        $("#category3").removeClass("btn-dark active").addClass("btn-secondary");
    }
    categorySelect = true;
})
