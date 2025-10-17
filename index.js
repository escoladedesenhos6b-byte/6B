// --- DADOS ORIGINAIS ---
const stages = [
    {
        title: "🎨 ETAPA 1 – Personagem / Protagonista",
        description: "Sorteie o tipo de personagem que será o foco da cena.",
        options: [
            { text: "Guerreiro", color: "#e74c3c" },
            { text: "Mago", color: "#9b59b6" },
            { text: "Cientista", color: "#3498db" },
            { text: "Criança", color: "#2ecc71" },
            { text: "Criatura Fantástica", color: "#f1c40f" },
            { text: "Andróide", color: "#1abc9c" },
            { text: "Animal Antropomórfico", color: "#e67e22" },
            { text: "Anti-herói", color: "#34495e" },
            { text: "Alienígena", color: "#16a085" },
            { text: "Caçador de Tesouros", color: "#d35400" },
            { text: "Monge", color: "#8e44ad" }
        ],
        emoji: "🎨"
    },
    {
        title: "🧠 ETAPA 2 – Conceito / Tema Narrativo",
        description: "Agora sorteie o conceito central da história ou da emoção que a cena vai transmitir.",
        options: [
            { text: "Esperança", color: "#e74c3c" },
            { text: "Mistério", color: "#9b59b6" },
            { text: "Aventura", color: "#3498db" },
            { text: "Solidão", color: "#2ecc71" },
            { text: "Conflito interno", color: "#f1c40f" },
            { text: "Caçada", color: "#1abc9c" },
            { text: "Exploração", color: "#e67e22" },
            { text: "Proteção", color: "#34495e" },
            { text: "Reencontro", color: "#16a085" },
            { text: "Ritual", color: "#d35400" },
            { text: "Sobrevivência", color: "#8e44ad" }
        ],
        emoji: "🧠"
    },
    {
        title: "🌍 ETAPA 3 – Ambiente / Cenário",
        description: "Sorteie onde a cena acontece.",
        options: [
            { text: "Floresta Densa", color: "#e74c3c" },
            { text: "Cidade Futurista", color: "#9b59b6" },
            { text: "Ruínas Antigas", color: "#3498db" },
            { text: "Deserto", color: "#2ecc71" },
            { text: "Montanha de Neve", color: "#f1c40f" },
            { text: "Laboratório Secreto", color: "#1abc9c" },
            { text: "Caverna Subterrânea", color: "#e67e22" },
            { text: "Castelo Abandonado", color: "#34495e" },
            { text: "Praia Rochosa", color: "#16a085" },
            { text: "Espaço Sideral", color: "#d35400" }
        ],
        emoji: "🌍"
    },
    {
        title: "🏺 ETAPA 4 – Objeto / Elemento de Foco",
        description: "Escolha um elemento de destaque que estará presente na cena.",
        options: [
            { text: "Espada Antiga", color: "#e74c3c" },
            { text: "Livro de Magia", color: "#9b59b6" },
            { text: "Relógio Quebrado", color: "#3498db" },
            { text: "Máscara Misteriosa", color: "#2ecc71" },
            { text: "Fogo ou Tocha", color: "#f1c40f" },
            { text: "Poção", color: "#1abc9c" },
            { text: "Pedra Flutuante", color: "#e67e22" },
            { text: "Computador Antigo", color: "#34495e" },
            { text: "Correntes", color: "#16a085" },
            { text: "Amuleto Brilhante", color: "#d35400" }
        ],
        emoji: "🏺"
    },
    {
        title: "💡 ETAPA 5 – Clima / Atmosfera",
        description: "Defina o clima emocional ou visual da cena.",
        options: [
            { text: "Névoa", color: "#e74c3c" },
            { text: "Chuva Forte", color: "#9b59b6" },
            { text: "Luz de Pôr do Sol", color: "#3498db" },
            { text: "Céu Estrelado", color: "#2ecc71" },
            { text: "Tempestade Elétrica", color: "#f1c40f" },
            { text: "Ambiente Sombrio", color: "#1abc9c" },
            { text: "Amanhecer", color: "#e67e22" },
            { text: "Calor Intenso", color: "#34495e" },
            { text: "Silêncio Total", color: "#16a085" },
            { text: "Vento Forte", color: "#d35400" }
        ],
        emoji: "💡"
    },
    {
        title: "🎥 ETAPA 6 – Composição / Foco da Cena",
        description: "Agora defina o tipo de enquadramento da cena.",
        options: [
            { text: "Close no personagem", color: "#e74c3c" },
            { text: "Plano aberto", color: "#9b59b6" },
            { text: "Contra-luz dramático", color: "#3498db" },
            { text: "Personagem de costas", color: "#2ecc71" },
            { text: "Cena de ação congelada", color: "#f1c40f" },
            { text: "Foco no objeto", color: "#1abc9c" },
            { text: "Vista de cima", color: "#e67e22" },
            { text: "Perspectiva forçada", color: "#34495e" }
        ],
        emoji: "🎥"
    }
];

// --- VARIÁVEIS DE ESTADO ---
let currentStage = 0;
let isSpinning = false;
let results = Array(stages.length).fill(null);

// --- REFERÊNCIAS AO DOM (HTML) ---
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const stageTitle = document.getElementById('stage-title');
const stageDescription = document.getElementById('stage-description');
const optionsList = document.getElementById('options-list');
const resultElements = [
    document.getElementById('result1'),
    document.getElementById('result2'),
    document.getElementById('result3'),
    document.getElementById('result4'),
    document.getElementById('result5'),
    document.getElementById('result6')
];

// --- INICIALIZAÇÃO ---
function init() {
    createWheel(stages[currentStage].options);
    updateStageInfo();
    
    spinBtn.addEventListener('click', spinWheel);
    resetBtn.addEventListener('click', resetBriefing);
}

// --- FUNÇÕES DE UTENSÍLIOS ---

// Cria a estrutura visual da roleta e o texto das opções
function createWheel(options) {
    wheel.innerHTML = '';
    const numOptions = options.length;
    // Ângulo para a fatia de pizza
    const sectionAngle = 360 / numOptions;
    
    options.forEach((option, index) => {
        const section = document.createElement('div');
        section.className = 'wheel-section';
        section.style.backgroundColor = option.color;
        
        // Aplica a rotação e o skew para formar a fatia
        section.style.transform = `rotate(${index * sectionAngle}deg) skewY(${90 - sectionAngle}deg)`;
        
        // Adiciona o texto da opção dentro da fatia
        const optionText = document.createElement('div');
        optionText.className = 'option-text';
        optionText.textContent = option.text;
        
        // Ajusta a posição e rotação do texto para que ele pareça reto no centro da fatia
        // O valor do 'rotate' (sectionAngle / 2) alinha o texto ao longo da fatia.
        optionText.style.transform = `rotate(${sectionAngle / 2}deg) skewY(${-(90 - sectionAngle)}deg) translateX(30px)`;
        
        section.appendChild(optionText);
        wheel.appendChild(section);
    });
}

// Atualiza o título e a descrição da etapa atual
function updateStageInfo() {
    if (currentStage < stages.length) {
        stageTitle.textContent = stages[currentStage].title;
        stageDescription.textContent = stages[currentStage].description;
        updateOptionsList(stages[currentStage].options);
    }
}

// Atualiza a lista lateral de opções
function updateOptionsList(options) {
    optionsList.innerHTML = '';
    options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: ${option.color}">■</span> ${option.text}`;
        optionsList.appendChild(li);
    });
}

// --- FUNÇÃO PRINCIPAL: GIRAR A ROLETA ---

function spinWheel() {
    if (isSpinning || currentStage >= stages.length) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = "GIRANDO...";
    
    const options = stages[currentStage].options;
    const numOptions = options.length;
    const sectionAngle = 360 / numOptions;

    // 1. Escolhe a seção vencedora (o índice)
    const winningIndex = Math.floor(Math.random() * numOptions);

    // 2. Calcula o ângulo necessário para a seção vencedora parar no PONTEIRO (topo)
    // O ponteiro aponta para 0 graus. O centro da seção vencedora deve alinhar com o ponteiro.
    // O giro total precisa ser no sentido anti-horário (negativo no CSS transform).
    // O ângulo onde o centro da fatia 'winningIndex' está é: winningIndex * sectionAngle + (sectionAngle / 2)
    // Para alinhar no topo (0 graus), precisamos de: 360 - (ângulo do centro)
    
    // Adiciona 5 a 8 voltas extras para o drama
    const extraSpins = Math.floor(Math.random() * 4 + 5) * 360; 

    // Calcula a rotação para alinhar o centro da fatia com o topo (0 graus)
    let degreesToStop = 360 - (winningIndex * sectionAngle + sectionAngle / 2);
    
    // Total de graus de rotação (negativo para giro anti-horário)
    const totalDegrees = extraSpins + degreesToStop;

    // Aplica a animação no CSS
    wheel.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${totalDegrees}deg)`;
    
    // --- Lógica de Fim de Giro ---
    setTimeout(() => {
        // Encontra o resultado
        const selectedOption = options[winningIndex];
        
        // 1. Salva e exibe o resultado no briefing
        results[currentStage] = selectedOption.text;
        resultElements[currentStage].textContent = selectedOption.text;
        
        // 2. Move para a próxima etapa
        currentStage++;
        isSpinning = false;
        
        // 3. Verifica se terminou
        if (currentStage < stages.length) {
            // Prepara a roleta para o próximo estágio
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)'; // Reseta a posição para o próximo estágio
            
            spinBtn.disabled = false;
            spinBtn.textContent = "GIRAR ROLETA";
            
            // Atualiza as informações da nova etapa
            createWheel(stages[currentStage].options);
            updateStageInfo();
            
        } else {
            // Fim do Briefing
            spinBtn.style.display = 'none';
            resetBtn.style.display = 'block';
            stageTitle.textContent = "✨ BRIEFING COMPLETO! ✨";
            stageDescription.textContent = "Sua ideia criativa está pronta! Use os resultados para criar sua arte.";
            optionsList.innerHTML = '';
        }

    }, 5000); // 5000ms (5 segundos) deve ser igual ao tempo de transição CSS
}

// --- FUNÇÃO DE RESET ---
function resetBriefing() {
    currentStage = 0;
    results.fill(null);
    resultElements.forEach(el => el.textContent = 'Aguardando...');
    
    spinBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    spinBtn.disabled = false;
    
    init(); // Reinicia o processo
}

// Inicia a aplicação
init();