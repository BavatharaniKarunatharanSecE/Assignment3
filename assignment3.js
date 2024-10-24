//Array of question objects
const questions = [
    {
        question: "What is the full form of CSS?" ,
        answers: [
            {text:"Cascading Style Sheets", correct: true},
            {text:"Coloured Special Sheets", correct: false},
            {text:"Color and Style Sheets", correct: false},
            {text:"None of the above", correct: false},
        ]
    },
    {
        question: "In how many ways can CSS be written in?" ,
        answers: [
            {text:"one", correct: false},
            {text:"two", correct: false},
            {text:"three", correct: true},
            {text:"four", correct: false},
        ]
    },
    {
        question: "What type of CSS is generally recommended for designing large web pages?" ,
        answers: [
            {text:"Inline", correct: false},
            {text:"Internal", correct: false},
            {text:"External", correct: true},
            {text:"None of the above", correct: false},
        ]
    },
    {
        question: "We can make rounded borders around elements using which CSS element?" ,
        answers: [
            {text:"border-collapse", correct: false},
            {text:"border-round", correct: false},
            {text:"border-radius", correct: true},
            {text:"None of the above", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Initialize variables
let currentQuestionIndex =0;
let score =0;

//Function to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Function to display the question and answer
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
//Creating buttons for answer options
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//Reset the questions
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Selcting the answer
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//Display the final score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//Handle the "Next" button
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
//Event listener for the "Next" button
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();