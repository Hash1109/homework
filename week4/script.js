// JS For Questions.html Page

// Variables Listed
var questionElement = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var progressText = document.getElementById("progressText");
var scoreText = document.getElementById("score");
var progressBarFull = document.getElementById("progressBarFull");
var timerElement = document.getElementById("timerCount");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuesions = [];

var timerInterval;

// Time given for game - 60 seconds 
var timerCount = 60;

// Variable including Array of Question Data
var questionsData = [
    {
        question: "‘Table Mountain’ is located at which place?",
        choice1: "Johannesburg , South Africa",
        choice2: "Pretoria, South Africa",
        choice3: "Cape Town, South Africa",
        choice4: "Port Elizabeth, South Africa",
        answer: 3
    },
    {
        question: "Name the city, where Taj Mahal is located in India?",
        choice1: "Delhi",
        choice2: "Jaipur",
        choice3: "Varanasi",
        choice4: "Agra",
        answer: 4
    },
    {
        question: "Which among the following is a symbol for Peace?",
        choice1: "Olive Branch",
        choice2: "Heart",
        choice3: "Jade",
        choice4: "Green Eyed Monster",
        answer: 1
    },
    {
        question: "Which among the following is the world’s largest lake?",
        choice1: "Lake Baikal",
        choice2: "Caspian Sea",
        choice3: "Wular Lake",
        choice4: "Lake Erie",
        answer: 2
    },
    {
        question: "'The Colosseum' is located in which country?",
        choice1: "Florence",
        choice2: "Rome",
        choice3: "Venice",
        choice4: "Milan",
        answer: 2
    },
];


// Variable & Fuctions //
var CORRECT_BONUS = 10;
var MAX_QUESTIONS = 5;

// Lauch the Game
startGame = () => {
    questionCounter = 0;
    score = 0;
    timerInterval = setInterval(timer, 1000);
    availableQuesions = [...questionsData];
    getNewQuestion();
};

// Countdown Function
timer = () => {
    timerCount--;
    if (timerCount === 0) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("endpage.html");
    } else {
        timerElement.textContent = timerCount;
    }
};

// function increases the question counter until it reaches last question in the array
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("endpage.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Pick Out Questions at Random
    var questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    // function for array answers for each question
    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// event listener for every wromg or right clicked answer
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        // fuction for correct answer will increses point by 10, incorrect answer will decrease time by 10
        var classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        } else {
            timerCount = timerCount - 10;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// when function called score is added
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();

