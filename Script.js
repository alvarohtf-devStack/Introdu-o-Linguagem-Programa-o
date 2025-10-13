// 1. Encontrar o botão no DOM pelo seu ID
const botaoToggle = document.getElementById('theme-toggle');

// 2. Encontrar o <body>. Ele é o alvo de todas as mudanças de classe
const body = document.body;

// 3. Função que executa a lógica de troca
function toggleTheme() {
    // Isso adiciona ou remove a classe 'tema-escuro' no body.
    // Lembre-se: 'tema-claro' é mantida, mas 'tema-escuro' a sobrescreve no CSS.
    body.classList.toggle('dark-mode'); 
    
    // OPCIONAL: Mudar o texto do botão para dar feedback ao usuário
    if (body.classList.contains('dark-mode')) {
        botaoToggle.textContent = 'Tema Claro';
    } else {
        botaoToggle.textContent = 'Tema Escuro';
    }
}

// 4. Ligar o evento: Quando houver um "click" no botão, execute a função toggleTheme
botaoToggle.addEventListener('click', toggleTheme);



// Usando const para a lista de fatos, já que ela não será reatribuída.
const fatos = [
    // Foco na História e Curiosidade
    "A linguagem **Python** recebeu o nome em homenagem ao grupo de comédia britânico *Monty Python*.",
    "O **C** é a 'mãe' de muitas linguagens modernas, como C++, Java e C#, influenciando até o JS.",
    "O **JavaScript** foi criado em apenas 10 dias por Brendan Eich, em 1995.",
    "O primeiro nome do JavaSript foi **Mocha**, depois LiveScript, e só então JavaScript.",
    "**Cobol**, uma das linguagens mais antigas (1959), ainda é usada por muitos sistemas bancários centrais.",

    // Foco no Impacto e Motivação
    "Aprender **SQL** é crucial, pois toda aplicação moderna usa bancos de dados para guardar informações.",
    "Dominar o **JavaScript** te permite criar desde apps mobile até servidores, sendo a linguagem mais versátil do mercado.",
    "A **Lógica de Programação** é mais importante que a sintaxe; ela te permite aprender qualquer nova linguagem rapidamente."
];

// 2. Encontrar os elementos no DOM usando o método getElementById
const displayFato = document.getElementById('fato-dinamico');
const botao = document.getElementById('btn-fato');

// 3. Função principal que contém a lógica
function gerarFatoAleatorio() {
    // Math.random(): Gera um número decimal entre 0 (inclusivo) e 1 (exclusivo).
    // * fatos.length: Multiplica pelo número de itens no Array (ex: 5).
    // Math.floor(): Arredonda para o número inteiro mais próximo, garantindo um índice válido (0, 1, 2, 3 ou 4).
    const indiceAleatorio = Math.floor(Math.random() * fatos.length);
    
    // 4. Manipulação do DOM: Atualiza o texto do parágrafo com o fato escolhido.
    displayFato.innerHTML = fatos[indiceAleatorio];

}


// 5. Ligar o evento: Quando o botão for clicado, execute a função. MODAL PARA MSG DE "EM CONSTRUÇÃO"
botao.addEventListener('click', gerarFatoAleatorio);
// Agora, quando o usuário clicar no botão, um fato aleatório será exibido no parágrafo.


function abrirModal() {
    document.getElementById("meuModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("meuModal").style.display = "none";
}

// Opcional: Fechar ao clicar fora da caixa
window.onclick = function(event) {
    if (event.target == document.getElementById("meuModal")) {
        fecharModal();
    }
}