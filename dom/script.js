const questions = [
    {
        question: "we do call click event in js?",
        options: ["onscrool", "onhover", "onchange", "onclick"],
        answer: 3,
    },
    {
        question: "In below what are in build browser events? ",
        options: ["alert", "makecall", "input", "dom"],
        answer: 0,
        
    },
    {
        question: "what is not an atrribute of HTME element?",
        options: ["class", "id", "div", "href"],
        answer: 2
    },
];
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

function showQuestions(index) {
    const question = questions[index];
    questionElement.textContent = question.question;
    console.log(question.options);
    question.options.map((option, index)=> {
        const button = Document.createElement("button");
        button.textContent = option;
        optionElement.appendChild(button);
    });
}
showQuestions(1);