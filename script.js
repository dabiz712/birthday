// Contraseña correcta
const correctPassword = "14082022";

// Preguntas y Respuestas con fechas y horas específicas
const questionSets = [
    {
        questions: [
            { question: "Pregunta 1: ¿Cuál es mi color favorito?", answer: "azul", background: "fondo_spiderverse.jpg" },
            { question: "Pregunta 2: ¿Cuántos años tengo?", answer: "30", background: "fondo_arcane.jpg" },
            { question: "Pregunta 3: ¿Cuál es el nombre de mi perro?", answer: "luna", background: "fondo_cyberpunk.jpg" },
        ],
        unlockTime: "2025-01-04T09:00:00Z" // Fecha y hora de inicio del set 1 (UTC)
    },
    {
        questions: [
            { question: "Pregunta 4: ¿En qué ciudad nací?", answer: "madrid", background: "fondo_harrypotter.jpg" },
            { question: "Pregunta 5: ¿Cuál es mi película favorita?", answer: "interestelar", background: "fondo_lotr.jpg" },
            { question: "Pregunta 6: ¿Qué instrumento toco?", answer: "guitarra", background: "fondo_jazz.jpg" },
        ],
        unlockTime: "2025-01-04T12:00:00Z" // Fecha y hora de inicio del set 2 (UTC)
    },
    {
        questions: [
            { question: "Pregunta 7: ¿Qué deporte practico?", answer: "fútbol", background: "fondo_futbol.jpg" },
            { question: "Pregunta 8: ¿Cómo se llama mi hermano?", answer: "carlos", background: "fondo_familia.jpg" },
            { question: "Pregunta 9: ¿Cuál es mi plato favorito?", answer: "paella", background: "fondo_cocina.jpg" },
        ],
        unlockTime: "2025-01-04T15:00:00Z" // Fecha y hora de inicio del set 3 (UTC)
    }
];

let currentSet = 0;
let currentQuestion = 0;

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        if (isSetUnlocked(currentSet)) {
            document.getElementById("login-screen").style.display = "none";
            document.getElementById("questions").style.display = "block";
            updateQuestion();
        } else {
            const nextUnlockTime = new Date(questionSets[currentSet].unlockTime).toLocaleString("es-ES", {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
            alert(`El siguiente set de preguntas estará disponible el ${nextUnlockTime} (hora UTC).`);
        }
    } else {
        document.getElementById("error").style.display = "block";
    }
});

// Validar Respuestas de las Preguntas
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const currentQuestionObj = questionSets[currentSet].questions[currentQuestion];

    if (userAnswer === currentQuestionObj.answer) {
        currentQuestion++;
        if (currentQuestion < questionSets[currentSet].questions.length) {
            updateQuestion();
        } else {
            // Termina el set actual
            currentSet++;
            currentQuestion = 0;

            if (currentSet < questionSets.length) {
                const nextUnlockTime = new Date(questionSets[currentSet].unlockTime).toLocaleString("es-ES", {
                    timeZone: "UTC",
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });
                document.getElementById("question-container").style.display = "none";
                document.getElementById("hint").style.display = "block";
                document.getElementById("hint").innerHTML = `
                    <p>¡Has completado este set!</p>
                    <p>La pista es: "Busca en el cajón azul".</p>
                    <p>El próximo set estará disponible el ${nextUnlockTime} (hora UTC).</p>
                `;
            } else {
                // Juego completado
                document.getElementById("question-container").style.display = "none";
                document.getElementById("hint").style.display = "block";
                document.getElementById("hint").textContent = "¡Has completado el juego! Gracias por participar.";
            }
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});

// Función para actualizar la pregunta y el fondo
function updateQuestion() {
    const currentQuestionObj = questionSets[currentSet].questions[currentQuestion];
    document.getElementById("question").textContent = currentQuestionObj.question;
    document.getElementById("answer").value = "";
    updateBackground(currentQuestionObj.background);
    document.getElementById("question-container").style.display = "block";
    document.getElementById("hint").style.display = "none";
}

// Función para actualizar el fondo dinámico
function updateBackground(image) {
    const background = document.getElementById("background");
    background.style.backgroundImage = `url('${image}')`;
}

// Función para verificar si un set está desbloqueado
function isSetUnlocked(setIndex) {
    const now = new Date();
    const unlockTime = new Date(questionSets[setIndex].unlockTime);
    return now >= unlockTime;
}
