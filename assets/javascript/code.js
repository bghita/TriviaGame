
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
