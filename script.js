// Contraseña correcta
const correctPassword = "14082022";

// Configuración de fechas de inicio y fin para cada set
const sets = [
    { start: "2025-01-04T00:00:00", end: "2025-01-06T00:00:00", questions: [
        { question: "Pregunta 1: ¿Cuál es mi color favorito?", answer: "azul", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿Cuántos años tengo?", answer: "30", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Cuál es el nombre de mi perro?", answer: "luna", background: "fondo_cyberpunk.jpg" }
    ]},
    { start: "2025-01-06T00:00:00", end: "2025-01-07T00:00:00", questions: [
        { question: "Pregunta 1: ¿Cuál es mi comida favorita?", answer: "pizza", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿En qué ciudad nací?", answer: "madrid", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Qué instrumento toco?", answer: "guitarra", background: "fondo_cyberpunk.jpg" }
    ]},
    { start: "2025-01-07T00:00:00", end: "2025-01-08T00:00:00", questions: [
        { question: "Pregunta 1: ¿Cuál es mi película favorita?", answer: "inception", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿Qué deporte me gusta más?", answer: "fútbol", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Cuál es mi animal favorito?", answer: "gato", background: "fondo_cyberpunk.jpg" }
    ]}
];

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        checkGameStatus();
    } else {
        document.getElementById("error").style.display = "block";
    }
});

let currentSet = null;

// Comprobar el estado del juego (si ya ha comenzado, qué set de preguntas mostrar, etc.)
function checkGameStatus() {
    const currentDate = new Date();
    const gameStartDate = new Date(sets[0].start);
    
    if (currentDate < gameStartDate) {
        document.getElementById("waiting-screen").style.display = "flex";
    } else {
        document.getElementById("waiting-screen").style.display = "none";
        showQuestionsForCurrentSet();
    }
}

// Mostrar preguntas correspondientes según el set actual
function showQuestionsForCurrentSet() {
    const currentDate = new Date();
    let currentSet = null;

    for (let i = 0; i < sets.length; i++) {
        const setStart = new Date(sets[i].start);
        const setEnd = new Date(sets[i].end);
        if (currentDate >= setStart && currentDate < setEnd) {
            currentSet = sets[i];
            break;
        }
    }

    if (currentSet) {
        document.getElementById("questions").style.display = "block";
        // Mostrar las preguntas y ajustar el fondo
        currentQuestion = 0;
        displayCurrentQuestion();
    } else {
        document.getElementById("game-end-screen").style.display = "flex";
    }
}

// Función para mostrar la pregunta actual
function displayCurrentQuestion() {
    const question = sets[currentSet].questions[currentQuestion];
    document.getElementById("question").textContent = question.question;
    document.getElementById("answer").value = "";
    updateBackground(question.background);
}

// Manejar respuestas y transiciones
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === sets[currentSet].questions[currentQuestion].answer) {
        currentQuestion++;
        if (currentQuestion < sets[currentSet].questions.length) {
            displayCurrentQuestion();
        } else {
            document.getElementById("hint").style.display = "block";
            const nextTime = new Date(sets[currentSet + 1].start).toLocaleTimeString();
            document.getElementById("continue-message").style.display = "block";
            document.getElementById("next-time").textContent = nextTime;
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});

// Función para actualizar el fondo
function updateBackground(backgroundImage) {
    const background = document.getElementById("background");
    background.style.backgroundImage = `url('${backgroundImage}')`;
}
