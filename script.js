// Contraseña correcta
const correctPassword = "14082022";

// Sets de preguntas por fecha
const questionSets = [
    {
        startDate: new Date("2025-01-04T00:00:00+01:00"),
        endDate: new Date("2025-01-05T23:59:59+01:00"),
        questions: [
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
        ]
    },
    {
        startDate: new Date("2025-01-06T00:00:00+01:00"),
        endDate: new Date("2025-01-07T23:59:59+01:00"),
        questions: [
            { 
                question: "Pregunta 1: ¿Cuál es mi comida favorita?", 
                answer: "pizza",
                background: "fondo_nieve.jpg"
            },
            { 
                question: "Pregunta 2: ¿Qué ciudad quiero visitar?", 
                answer: "tokio",
                background: "fondo_montañas.jpg"
            },
            { 
                question: "Pregunta 3: ¿Cuál es mi película favorita?", 
                answer: "interestelar",
                background: "fondo_espacio.jpg"
            }
        ]
    }
];

let currentQuestion = 0;
let activeSet = null;

// Determinar el set activo basado en la fecha actual
function getActiveQuestionSet() {
    const now = new Date();
    return questionSets.find(set => now >= set.startDate && now <= set.endDate);
}

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        activeSet = getActiveQuestionSet();

        if (!activeSet) {
            showUnavailableScreen();
        } else {
            startGame();
        }
    } else {
        document.getElementById("error").style.display = "block";
    }
});

// Validar Respuestas de las Preguntas
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === activeSet.questions[currentQuestion].answer) {
        currentQuestion++;
        if (currentQuestion < activeSet.questions.length) {
            document.getElementById("question").textContent = activeSet.questions[currentQuestion].question;
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

// Función para iniciar el juego
function startGame() {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("questions").style.display = "block";
    document.getElementById("question").textContent = activeSet.questions[currentQuestion].question;
    updateBackground();
}

// Función para mostrar pantalla de contenido no disponible
function showUnavailableScreen() {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("unavailable-screen").style.display = "flex";

    const now = new Date();
    const nextSet = questionSets.find(set => now < set.startDate);
    if (nextSet) {
        document.getElementById("next-available").textContent = 
            `El próximo set estará disponible el ${nextSet.startDate.toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}.`;
    } else {
        document.getElementById("next-available").textContent = 
            "No hay más sets disponibles en este momento.";
    }
}

// Función para actualizar el fondo
function updateBackground() {
    const background = document.getElementById("background");
    background.style.backgroundImage = `url('${activeSet.questions[currentQuestion].background}')`;
}

// Verificar si hay contenido activo al cargar la página
window.addEventListener("load", () => {
    const now = new Date();
    activeSet = getActiveQuestionSet();

    if (!activeSet) {
        showUnavailableScreen();
    }
});
