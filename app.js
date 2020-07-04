

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quix-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}
// set question number and question options
function getNewQuestion() {
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + "of" + quiz.length;

    //set questions
    //get random questions

    const questionIndex = availableQuestions[Math.floor(math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    // get the position of questionIndex from the availabe array;
    
    const index1 = availableQuestions.indexOf(questionIndex);
    
    //remove the questionIndex from the availabe array, so that the question does not repeat.
    
    availableQuestions.splice(index1,1);

    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length
    for(let i=0; i<optionLen; i++) {
       availableQuestions.push(i)
    }
    
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    //create options in html
    
    for(let i=0; i<optionLen; i++) {
        //random option
        const optionIndex =  availableQuestions[Math.floor(math.random() * availableQuestions.length)]


        //get the position of 'optionIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);

        //remove the of 'optionIndex' from the availableOptions so that the option does not repeat
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");

    }

    questionCounter++
}

//get the result of correct attempt question
function getResult(eLememt) {
    const id = parseInt(element.id);

    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer) {
        //set the green color to the correct option
        element.classList.add("correct");

        //add the indicator to the correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else {
        //set the red color to the incorrect color 
        element.classList.add("wrong");

        //add the indicator to the wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect then show the correct option by adding green color to the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++) {
            if(parseInt(optionContainer.children.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add('correct')
            }
        }
    }

    attempt++;

    unclickableOptions();
}

//make all the option unclickable once the user select an option
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}


function updateAnswersIndicator(markType) {
    answersIndicatorContainer.children[questionsCounter-1].classList.add(markType)
} 

function next() {
    if(questionCounter === quiz.length) {
       quizOver();
    }
    else{
        getNewQuestion();
    }
} 

function quizOver() {
    //hide quizbox
    quizBox.classList.add("hide");

    //show result box
    quizBox.classList.remove("hide");
    quizResult();
}

//get the quiz result
function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBoxx.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length;
}

function resetQuiz() {
    let questionCounter = 0;
    let correctAnswers = 0;
    let attempt = 0;
}

function tryAgainQuiz() {
    //hide the resultBox
    resultBox.classList.add("hide");

    //show the quixBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    //hide result box
    resultBox.classList.add("hide");

    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

//STARTING POINT

function startQuiz() {
    //hide home box
    homeBox.classList.add("hide");

    //show quiz box
    quizBox.classList.remove("hide");

    //set all of the questions
    setAvailableQuestions();

    //get ne questions
    getNewQuestion();
    // to create indicator of answers
    answersIndicator();

}  

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;

}