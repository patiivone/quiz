const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: 'Qual é a montanha mais alta do Brasil?',
    answers: [
      { text: 'Pico da Bandeira', correct: false },
      { text: 'Pedra da Mina', correct: false },
      { text: 'Pico da Neblina', correct: true },
      { text: 'Monte Roraima', correct: false },
    ]
  },
  {
    question: 'Qual país mais consome cerveja no mundo?',
    answers: [
      { text: 'Alemanha', correct: false },
      { text: 'Brasil', correct: false },
      { text: 'Estados Unidos', correct: false },
      { text: 'China', correct: true },
    ]
  },
  {
    question: 'Qual é o sobrenome mais comum do Brasil?',
    answers: [
      { text: 'Santos', correct: false },
      { text: 'Silva', correct: true },
      { text: 'Oliveira', correct: false },
      { text: 'Souza', correct: false },
    ]
  },
  {
    question: 'Hipponstrosesesquipedaliofobia é fobia de quê?',
    answers: [
      { text: 'Hipopótamos', correct: false },
      { text: 'Animais Marinhos', correct: false },
      { text: 'Animais grandes', correct: false },
      { text: 'Palavras longas', correct: true },
    ]
  },
  {
    question: 'Qual animal marinho possui três corações e tem sangue azul?',
    answers: [
      { text: 'Polvo', correct: true },
      { text: 'Baleia', correct: false },
      { text: 'Tubarão', correct: false },
      { text: 'Peixe Palhaço', correct: false },
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfeito,Você é um genio!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Esta indo bem, na proxima vai ser de boas!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Não fique triste, teste novamente ";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Estude mais um pouco...";
  } else {
    resultMessage.textContent = "EITA nem AI tava esperando isso :(";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}