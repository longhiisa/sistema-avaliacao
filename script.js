const perguntas = [
    {
        pergunta: "Qual é o resultado de 5 + 3?",
        alternativas: ["6", "7", "8", "9"],
        correta: 2
    },
    {
        pergunta: "Quanto é 10% de 200?",
        alternativas: ["10", "20", "30", "40"],
        correta: 1
    },
    {
        pergunta: "Qual é o resultado de 9 × 7?",
        alternativas: ["63", "56", "72", "49"],
        correta: 0
    },
    {
        pergunta: "Se um produto custa R$ 150 e recebe 20% de desconto, qual será o valor final?",
        alternativas: ["R$ 120", "R$ 130", "R$ 110", "R$ 100"],
        correta: 0
    },
    {
        pergunta: "Quanto é 25% de 80?",
        alternativas: ["15", "20", "25", "30"],
        correta: 1
    },
    {
        pergunta: "Um valor de R$ 1.000 aplicado a juros simples de 10% ao ano renderá quanto após 1 ano?",
        alternativas: ["R$ 100", "R$ 110", "R$ 1.100", "R$ 900"],
        correta: 0
    },
    {
        pergunta: "Qual é o resultado de 12 × 4?",
        alternativas: ["36", "44", "48", "52"],
        correta: 2
    },
    {
        pergunta: "Se um produto aumentou 10% e passou a custar R$ 220, qual era o preço inicial?",
        alternativas: ["R$ 200", "R$ 210", "R$ 190", "R$ 180"],
        correta: 0
    },
    {
        pergunta: "Quanto é 50% de 60?",
        alternativas: ["20", "25", "30", "35"],
        correta: 2
    },
    {
        pergunta: "Qual é o resultado de 100 − 37?",
        alternativas: ["63", "73", "67", "60"],
        correta: 0
    }
];

let atual = 0;
let respostas = [];
let tempo = 1800; // 30 minutos

const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const progressoEl = document.getElementById("progresso");
const tempoEl = document.getElementById("tempo");

document.getElementById("btnIniciar").onclick = () => {
    const nome = document.getElementById("nomeAluno").value;
    const email = document.getElementById("emailAluno").value;

    if (!nome || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    document.getElementById("infoAluno").innerText = nome;

    inicio.classList.remove("ativa");
    quiz.classList.add("ativa");

    iniciarTimer();
    carregarPergunta();
};

function carregarPergunta() {
    const p = perguntas[atual];
    perguntaEl.innerText = p.pergunta;
    alternativasEl.innerHTML = "";

    p.alternativas.forEach((alt, i) => {
        const div = document.createElement("div");
        div.classList.add("alternativa");
        div.innerText = alt;

        if (respostas[atual] === i) {
            div.classList.add("selecionada");
        }

        div.onclick = () => {
            respostas[atual] = i;
            carregarPergunta();
        };

        alternativasEl.appendChild(div);
    });

    progressoEl.style.width =
        ((atual + 1) / perguntas.length) * 100 + "%";
}

document.getElementById("btnProxima").onclick = () => {
    if (atual < perguntas.length - 1) {
        atual++;
        carregarPergunta();
    }
};

document.getElementById("btnAnterior").onclick = () => {
    if (atual > 0) {
        atual--;
        carregarPergunta();
    }
};

document.getElementById("btnFinalizar").onclick = finalizar;

function finalizar() {
    let acertos = 0;

    perguntas.forEach((p, i) => {
        if (respostas[i] === p.correta) {
            acertos++;
        }
    });

    quiz.classList.remove("ativa");
    resultado.classList.add("ativa");

    document.getElementById("resumo").innerText =
        `Você acertou ${acertos} de ${perguntas.length} questões.`;

    document.getElementById("nota").innerText =
        `Nota Final: ${((acertos / perguntas.length) * 10).toFixed(1)}`;
}

function iniciarTimer() {
    const intervalo = setInterval(() => {
        tempo--;

        let minutos = Math.floor(tempo / 60);
        let segundos = tempo % 60;

        tempoEl.innerText =
            String(minutos).padStart(2, "0") + ":" +
            String(segundos).padStart(2, "0");

        if (tempo <= 0) {
            clearInterval(intervalo);
            finalizar();
        }
    }, 1000);
}
