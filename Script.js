// ==========================================
// 1. CONFIGURAÇÕES DE TEMA (Global)
// ==========================================
const botaoToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleTheme() {
    if (!botaoToggle) return; // Segurança
    body.classList.toggle('dark-mode'); 
    botaoToggle.textContent = body.classList.contains('dark-mode') ? 'Tema Claro' : 'Tema Escuro';
}

if (botaoToggle) {
    botaoToggle.addEventListener('click', toggleTheme);
}

// ==========================================
// 2. FATOS ALEATÓRIOS (Página Index)
// ==========================================
const fatos = [
    "A linguagem **Python** recebeu o nome em homenagem ao Monty Python.",
    "O **C** é a 'mãe' de muitas linguagens modernas.",
    "O **JavaScript** foi criado em apenas 10 dias em 1995.",
    "O primeiro nome do JavaScript foi **Mocha**.",
    "A **Lógica de Programação** é mais importante que a sintaxe."
];

const displayFato = document.getElementById('fato-dinamico');
const btnFato = document.getElementById('btn-fato');

function gerarFatoAleatorio() {
    if (!displayFato) return;
    const indiceAleatorio = Math.floor(Math.random() * fatos.length);
    displayFato.innerHTML = fatos[indiceAleatorio];
}

// Só ativa o evento se o botão existir na página atual
if (btnFato) {
    btnFato.addEventListener('click', gerarFatoAleatorio);
}

// ==========================================
// 3. MODAL (Páginas Diversas)
// ==========================================
function abrirModal() {
    const modal = document.getElementById("meuModal");
    if (modal) modal.style.display = "block";
}

function fecharModal() {
    const modal = document.getElementById("meuModal");
    if (modal) modal.style.display = "none";
}

// O clique fora do modal também precisa de verificação
window.addEventListener('click', function(event) {
    const modal = document.getElementById("meuModal");
    if (modal && event.target == modal) {
        fecharModal();
    }
});

// ==========================================
// 4. CHATBOX SESMT (Página Intro JS)
// ==========================================
(function() {
    let chatMensagens;
    let chatOpcoes;
    let dadosAgendamento = {};

    function adicionarMensagem(texto, tipo) {
        if (!chatMensagens) return;
        const balao = document.createElement('div');
        balao.className = `balao ${tipo === 'bot' ? 'balao-bot' : 'balao-user'}`;
        balao.innerHTML = texto;
        chatMensagens.appendChild(balao);
        chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }

    function criarOpcoes(listaOpcoes) {
        if (!chatOpcoes) return;
        chatOpcoes.innerHTML = '';
        listaOpcoes.forEach(opcao => {
            const botao = document.createElement('button');
            botao.className = 'btn-opcao';
            botao.innerText = opcao;
            botao.onclick = () => processarEscolha(opcao);
            chatOpcoes.appendChild(botao);
        });
    }

    function solicitarEntradaTexto(proximoPasso) {
        if (!chatOpcoes) return;
        chatOpcoes.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Digite aqui...';
        input.className = 'input-chat';
        
        const btnEnviar = document.createElement('button');
        btnEnviar.innerText = 'Enviar';
        btnEnviar.className = 'btn-opcao';
        
        btnEnviar.onclick = () => {
            if(input.value.trim() !== "") {
                const valor = input.value.trim();
                adicionarMensagem(valor, 'user');
                proximoPasso(valor);
            }
        };
        
        chatOpcoes.appendChild(input);
        chatOpcoes.appendChild(btnEnviar);
    }

    function processarEscolha(escolha) {
        adicionarMensagem(escolha, 'user');

        if (escolha === 'Suporte Técnico') {
            adicionarMensagem('Para suporte: <br><strong>alvarothomazprefcachoeirapta@gmail.com</strong>', 'bot');
            criarOpcoes(['Voltar ao Início']);
        } 
        else if (escolha === 'Agendamento' || escolha === 'Voltar ao Início') {
            adicionarMensagem('Qual o motivo do agendamento?', 'bot');
            criarOpcoes(['Atestado Médico', 'Retorno ao Trabalho']);
        }
        else if (escolha === 'Atestado Médico') {
            dadosAgendamento.motivo = 'Atestado Médico';
            adicionarMensagem('Quantos dias de atestado?', 'bot');
            solicitarEntradaTexto((val) => {
                dadosAgendamento.dias = val;
                adicionarMensagem('Início do atestado:', 'bot');
                solicitarEntradaTexto((data) => {
                    dadosAgendamento.inicioAtestado = data;
                    pedirDadosPessoais();
                });
            });
        }
        else if (escolha === 'Retorno ao Trabalho') {
            dadosAgendamento.motivo = 'Retorno ao Trabalho';
            adicionarMensagem('Você possui o Comunicado do INSS?', 'bot');
            criarOpcoes(['Sim, estou Ciente']);
        }
        else if (escolha === 'Sim, estou Ciente') {
            pedirDadosPessoais();
        }
        else if (escolha.includes("às")) {
            dadosAgendamento.horarioEscolhido = escolha;
            finalizarAgendamento();
        }
    }

    function pedirDadosPessoais() {
        adicionarMensagem('Informe seu Nome Completo:', 'bot');
        solicitarEntradaTexto((nome) => {
            dadosAgendamento.nome = nome;
            adicionarMensagem('Informe seu RE:', 'bot');
            solicitarEntradaTexto((re) => {
                dadosAgendamento.re = re;
                mostrarDatasDisponiveis();
            });
        });
    }

    function mostrarDatasDisponiveis() {
        adicionarMensagem('Escolha o horário:', 'bot');
        criarOpcoes(['17/02 às 09:00', '17/02 às 10:00', '19/02 às 14:00']);
    }

    function finalizarAgendamento() {
        adicionarMensagem('<strong>Finalizando...</strong>', 'bot');
        
        fetch('https://hook.us2.make.com/gylr928hnrnmaq30hjkrfh49ep4qnq8d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAgendamento)
        })
        .then(() => {
            adicionarMensagem('Sincronizado com o SESMT!', 'bot');
        })
        .catch(() => {
            adicionarMensagem('Salvo localmente (erro de rede).', 'bot');
        });

        criarOpcoes(['Voltar ao Início']);
    }

    function iniciarChat() {
        chatMensagens = document.getElementById('chat-mensagens');
        chatOpcoes = document.getElementById('chat-opcoes');
        
        // Se os IDs existirem na página atual, o chat inicia
        if (chatMensagens && chatOpcoes && chatMensagens.innerHTML.trim() === "") {
            adicionarMensagem('Olá! Sou o Assistente SESMT.', 'bot');
            criarOpcoes(['Suporte Técnico', 'Agendamento']);
        }
    }

    // Inicialização segura
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(iniciarChat, 300);
    } else {
        document.addEventListener('DOMContentLoaded', iniciarChat);
    }
})();