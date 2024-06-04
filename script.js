document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

let score = 0;
let currentQuestionIndex = 0;
let timer;

const questions = [
    {
        question: "What is the capital of Nepal?",
        options: ["Kathmandu", "London", "Rome", "Berlin"],
        answer: "Kathmandu"
    },
    {
        question: "What is 1+1?",
        options: ["2", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Jane Austen", "Mark Twain", "J.K. Rowling"],
        answer: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

function startQuiz() {
    document.getElementById('initial-screen').classList.remove('active');
    setTimeout(() => {
        document.getElementById('initial-screen').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-container').classList.add('active');
        displayQuestion();
        startTimer();
    }, 300);
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            <label>${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
}

document.getElementById('submit-btn').addEventListener('click', handleSubmit);

function handleSubmit() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
            document.getElementById('feedback-container').innerText = 'Correct!';
        } else {
            document.getElementById('feedback-container').innerText = 'Incorrect!';
        }
        document.getElementById('score').innerText = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert('Please select an answer');
    }
}

function startTimer() {
    let timeLeft = 30;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        } else {
            document.getElementById('timer').innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById('quiz-container').innerHTML = `<h2>Quiz Over! Your score is ${score}</h2>`;
}

// Trigger animation on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('initial-screen').classList.add('active');
});