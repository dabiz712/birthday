// Contraseña correcta
const correctPassword = "cumple123";

// Preguntas y Respuestas
const questions = [
    { question: "Pregunta 1: ¿Cuál es mi color favorito?", answer: "azul" },
    { question: "Pregunta 2: ¿Cuántos años tengo?", answer: "30" },
    { question: "Pregunta 3: ¿Cuál es el nombre de mi perro?", answer: "luna" }
];

let currentQuestion = 0;

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("login").style.display = "none";
        document.getElementById("questions").style.display = "block";
    } else {
        document.getElementById("error").style.display = "block";
    }
});

// Validar Respuestas de las Preguntas
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === questions[currentQuestion].answer) {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            document.getElementById("question").textContent = questions[currentQuestion].question;
            document.getElementById("answer").value = "";
        } else {
            document.getElementById("question-container").style.display = "none";
            document.getElementById("hint").style.display = "block";
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});