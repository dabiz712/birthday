// Contraseña correcta
const correctPassword = "2";

// Configuración de fechas de inicio y fin para cada set
const sets = [
    { start: "2025-01-04T00:00:00", end: "2025-01-04T06:11:59", 
     questions: [
        { question: "Pregunta 1: ¿Cuál es mi color favorito?", answer: "1", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿Cuántos años tengo?", answer: "1", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Cuál es el nombre de mi perro?", answer: "1", background: "fondo_cyberpunk.jpg" }
    ],
    hint: "¡Felicidades, has completado las preguntas! Mira en el cajón"
    },
    { start: "2025-01-04T06:12:00", end: "2025-01-08T07:00:00", 
     questions: [
        { question: "Pregunta 1: ¿Cuál es mi comida favorita?", answer: "1", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿En qué ciudad nací?", answer: "1", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Qué instrumento toco?", answer: "1", background: "fondo_cyberpunk.jpg" }
    ],
    hint: "¡Felicidades, has completado las preguntas! Mira en el la mesilla"
    },
    { start: "2025-01-08T09:00:00", end: "2025-01-08T10:00:00", 
     questions: [
        { question: "Pregunta 1: ¿Cuál es mi película favorita?", answer: "1", background: "fondo_spiderverse.jpg" },
        { question: "Pregunta 2: ¿Qué deporte me gusta más?", answer: "1", background: "fondo_arcane.jpg" },
        { question: "Pregunta 3: ¿Cuál es mi animal favorito?", answer: "1", background: "fondo_cyberpunk.jpg" }
    ],
    hint: "¡Felicidades, has completado las preguntas! Mira en la cocina"
    }
];

const pistas = {
  set1: "Pista para el primer set de preguntas: El regalo está cerca de un árbol.",
  set2: "Pista para el segundo set de preguntas: Busca cerca de una fuente.",
  set3: "Pista para el tercer set de preguntas: El regalo está cerca de un banco en el parque.",
  // Añadir más sets y pistas según sea necesario
};

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
let currentQuestion = 0;
const totalSets = 3;

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

    for (let i = 0; i < sets.length; i++) {
        const setStart = new Date(sets[i].start);
        const setEnd = new Date(sets[i].end);
        console.log(`Comprobando set ${i}: ${sets[i].start} - ${sets[i].end}`);
        if (currentDate >= setStart && currentDate < setEnd) {
            currentSet = sets[i];
            break;
        }
    }

    if (currentSet) {
        console.log("currentSet:", currentSet); // Depuración
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
    if (currentSet && currentSet.questions && currentSet.questions.length > 0) {  // Asegúrate de que currentSet y questions estén definidos
        const question = currentSet.questions[currentQuestion]; // Usa currentSet aquí
        document.getElementById("question").textContent = question.question;
        document.getElementById("answer").value = "";
        updateBackground(question.background); // Pasa el fondo de la pregunta actual
    } else {
        console.error("No se encontraron preguntas en el set actual.");
    }
}

// Manejar respuestas y transiciones entre preguntas
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === currentSet.questions[currentQuestion].answer) {
        currentQuestion++;  // Avanzar a la siguiente pregunta

        if (currentQuestion < currentSet.questions.length) {
            displayCurrentQuestion();  // Mostrar la siguiente pregunta
        } else {
            // Al haber respondido correctamente todas las preguntas del set
            document.getElementById("question-container").style.display = "none";  // Ocultar preguntas
            document.getElementById("hint-screen").style.display = "flex";  // Mostrar mensaje de hint

            // Mostrar el mensaje con la pista
            const hint = currentSet.hint;
            document.getElementById("completed-message").style.display = "block";  // Mostrar mensaje de completado
            document.getElementById("completed-message").innerText = hint;  // Mostrar mensaje de completado
            // Mostrar el botón "Aceptar"
            document.getElementById("accept-button").style.display = "block";  // Mostrar el botón

            updateBackground('balatro.jpg');
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});

// Función al hacer clic en "Aceptar"
document.getElementById("accept-button").addEventListener("click", () => {
    document.getElementById("completed-message").style.display = "none";
    document.getElementById("accept-button").style.display = "none";  // Ocultar el botón

    // Verificar si hay más sets
    const nextSetIndex = sets.indexOf(currentSet) + 1;
    if (nextSetIndex < sets.length) {
        const nextTime = new Date(sets[nextSetIndex].start).toLocaleString("es-ES", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        document.getElementById("continue-message").style.display = "block";
        document.getElementById("next-time").textContent = `${nextTime}.`;
    } else {
        // Fin del juego, mostrar el mensaje de fin
        document.getElementById("end-message").style.display = "block";
    }
});

// Función para actualizar el fondo
function updateBackground(backgroundImage) {
    if (backgroundImage) {
        const background = document.getElementById("background");
        background.style.backgroundImage = `url('${backgroundImage}')`;  // Corregir la sintaxis de las comillas
    } else {
        console.error("No se proporcionó imagen de fondo.");
    }
}
