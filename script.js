// Contraseña correcta
const correctPassword = "14082022";

// Preguntas y Respuestas
const questions = [
    { 
        question: "Pregunta 1: ¿Cuál es mi color favorito?", 
        answer: "azul",
        background: "fondo_spiderverse.jpg"
    },
    { 
        question: "Pregunta 2: ¿Cuántos años tengo?", 
        answer: "30",
        background: "fondo_arcane.jpg"
    },
    { 
        question: "Pregunta 3: ¿Cuál es el nombre de mi perro?", 
        answer: "luna",
        background: "fondo_cyberpunk.jpg"
    }
];

let currentQuestion = 0;

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("questions").style.display = "block";
        updateBackground();
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
            updateBackground();
        } else {
            document.getElementById("question-container").style.display = "none";
            document.getElementById("hint").style.display = "block";
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});

// Función para actualizar el fondo
function updateBackground() {
    const background = document.getElementById("background");
    background.style.backgroundImage = `url('${questions[currentQuestion].background}')`;
}
