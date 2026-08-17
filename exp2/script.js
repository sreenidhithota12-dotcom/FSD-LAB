const quiz = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used to style web pages?",
    options: [
      "HTML",
      "CSS",
      "Java",
      "Python"
    ],
    answer: "CSS"
  },
  {
    question: "Which language is used to make web pages interactive?",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    answer: "JavaScript"
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<a>",
      "<link>",
      "<href>",
      "<url>"
    ],
    answer: "<a>"
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClassName()",
      "createElement()"
    ],
    answer: "getElementById()"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const question = document.getElementById("question");
const options = document.getElementById("options");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(quiz); 
function loadQuestion() {
    clearInterval(timer);

    timeLeft = 15;
    timerText.textContent = "Time : " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = "Time Left: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    question.textContent = quiz[currentQuestion].question;
    options.innerHTML = "";

    const shuffledOptions = [...quiz[currentQuestion].options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.onclick = () => {
            clearInterval(timer);

            // Disable all buttons after one click
            document.querySelectorAll("#options button").forEach(b => b.disabled = true);

            if (option === quiz[currentQuestion].answer) {
                score++;
                scoreText.textContent = "Score: " + score;
            }

            setTimeout(nextQuestion, 500);
        };

        options.appendChild(btn);
    });
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestion++;

    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    question.textContent = "Quiz Completed!";
    options.innerHTML = `<h3>Your Score: ${score}/${quiz.length}</h3>`;
    nextBtn.style.display = "none";
    timerText.style.display = "none";
}

nextBtn.onclick = nextQuestion;

loadQuestion();