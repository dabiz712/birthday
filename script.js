// Contraseña correcta
const correctPassword = "14082022";

// Preguntas y Respuestas
const questionSets = [
    [
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
    ],
    [
        {
            question: "Pregunta 4: ¿En qué ciudad nací?",
            answer: "madrid",
            background: "fondo_harrypotter.jpg"
        },
        {
            question: "Pregunta 5: ¿Cuál es mi película favorita?",
            answer: "interestelar",
            background: "fondo_lotr.jpg"
        },
        {
            question: "Pregunta 6: ¿Qué instrumento toco?",
            answer: "guitarra",
            background: "fondo_jazz.jpg"
        }
    ],
    [
        {
            question: "Pregunta 7: ¿Qué deporte practico?",
            answer: "fútbol",
            background: "fondo_futbol.jpg"
        },
        {
            question: "Pregunta 8: ¿Cómo se llama mi hermano?",
            answer: "carlos",
            background: "fondo_familia.jpg"
        },
        {
            question: "Pregunta 9: ¿Cuál es mi plato favorito?",
            answer: "paella",
            background: "fondo_cocina.jpg"
        }
    ]
];

let currentSet = 0;
let currentQuestion = 0;

// Validar Contraseña
document.getElementById("submit-password").addEventListener("click", () => {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("questions").style.display = "block";

        if (currentSet === 0 && currentQuestion === 0) {
            document.getElementById("question-container").style.display = "none";
            document.getElementById("hint").style.display = "block";
            document.getElementById("hint").textContent = "Preparando juego, vuelve más tarde.";
        } else {
            updateQuestion();
        }
    } else {
        document.getElementById("error").style.display = "block";
    }
});

// Validar Respuestas de las Preguntas
document.getElementById("submit-answer").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const currentQuestionObj = questionSets[currentSet][currentQuestion];

    if (userAnswer === currentQuestionObj.answer) {
        currentQuestion++;
        if (currentQuestion < questionSets[currentSet].length) {
            updateQuestion();
        } else {
            // Termina el set actual
            currentSet++;
            currentQuestion = 0;

            if (currentSet < questionSets.length) {
                document.getElementById("question-container").style.display = "none";
                document.getElementById("hint").style.display = "block";
                document.getElementById("hint").innerHTML = `
                    <p>¡Has completado todas las preguntas de este set!</p>
                    <p>La pista es: "Busca en el cajón azul".</p>
                    <p>El juego continúa a las ${getNextGameTime()}.</p>
                `;
            } else {
                // Juego completado
                document.getElementById("question-container").style.display = "none";
                document.getElementById("hint").style.display = "block";
                document.getElementById("hint").textContent = "Gracias por participar en el juego.";
            }
        }
    } else {
        alert("Respuesta incorrecta, inténtalo de nuevo.");
    }
});

// Función para actualizar la pregunta y el fondo
function updateQuestion() {
    const currentQuestionObj = questionSets[currentSet][currentQuestion];
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

// Función para calcular la hora del siguiente set
function getNextGameTime() {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1); // Ajustar según la lógica deseada
    return currentTime.toTimeString().split(" ")[0].slice(0, 5);
}
