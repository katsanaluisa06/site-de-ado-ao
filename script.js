// =====================================================
// MENU MOBILE + ANO DO RODAPÉ
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // Atualiza o ano automaticamente
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    // Menu mobile
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu");

    if (toggle && menu) {

        toggle.addEventListener("click", () => {
            menu.classList.toggle("open");
        });


        // Fecha o menu quando clicar em algum link
        menu.querySelectorAll("a").forEach((a) => {

            a.addEventListener("click", () => {
                menu.classList.remove("open");
            });

        });

    }

});


// =====================================================
// CATÁLOGO + FILTROS
// =====================================================

const lista = document.getElementById("lista");
const filtros = document.getElementById("filtros");

let filtroAtivo = "Todos";


// =====================================================
// FILTRAR PETS
// =====================================================

function filtrar(itens, filtro) {

    if (filtro === "Todos") {
        return itens;
    }

    return itens.filter((item) => {
        return item.categoria === filtro;
    });

}


// =====================================================
// FORMATAR PREÇO / IDADE
// =====================================================

function formatarPreco(valor) {

    if (typeof valor === "number") {

        return "R$ " + valor.toLocaleString("pt-BR");

    }

    // Caso LABEL_PRECO não exista
    if (window.LABEL_PRECO) {

        return window.LABEL_PRECO + " " + valor;

    }

    return valor;

}


// =====================================================
// RENDERIZAR PETS
// =====================================================

function renderizar() {

    // Verifica se existem itens
    if (!window.ITENS || !Array.isArray(window.ITENS)) {

        if (lista) {

            lista.innerHTML = `
                <p class="vazio">
                    Nenhum pet disponível no momento. 🐾
                </p>
            `;

        }

        return;
    }


    const itens = filtrar(window.ITENS, filtroAtivo);


    // Nenhum pet encontrado
    if (itens.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum pet encontrado. 🐾
            </p>
        `;

        return;
    }


    // Criar os cards
    lista.innerHTML = itens.map((item) => {

        return `
            <article class="item-card">

                <div class="img">
                    ${item.emoji || "🐾"}
                </div>


                <h3>
                    ${item.nome}
                </h3>


                <p>
                    ${item.categoria}
                </p>


                <p class="preco">
                    ${formatarPreco(item.preco)}
                </p>


                <button
                    class="btn-adotar"
                    onclick="adotarPet('${item.nome}')">

                    💗 Quero Adotar

                </button>

            </article>
        `;

    }).join("");

}


// =====================================================
// BOTÕES DOS FILTROS
// =====================================================

if (filtros) {

    filtros.addEventListener("click", (event) => {

        const botao = event.target.closest(".filtro-btn");


        // Se não clicou em um botão de filtro
        if (!botao) {
            return;
        }


        // Define o filtro
        filtroAtivo = botao.dataset.filtro;


        // Remove classe ativo de todos
        filtros
            .querySelectorAll(".filtro-btn")
            .forEach((btn) => {

                btn.classList.remove("ativo");

            });


        // Ativa o botão clicado
        botao.classList.add("ativo");


        // Atualiza os pets
        renderizar();

    });


    // Primeiro filtro ativo
    const primeiroFiltro =
        filtros.querySelector(".filtro-btn");


    if (primeiroFiltro) {

        primeiroFiltro.classList.add("ativo");

    }

}


// =====================================================
// BOTÃO "QUERO ADOTAR"
// =====================================================

function adotarPet(nome) {

    alert(
        "💗 Você escolheu adotar o " +
        nome +
        "!\n\n" +
        "Entre em contato para saber mais sobre a adoção. 🐾"
    );

}


// =====================================================
// IR PARA A SEÇÃO DE PETS
// =====================================================

function irParaPets() {

    const pets = document.getElementById("pets");


    if (pets) {

        pets.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// FAVORITAR PET
// =====================================================

function favoritar(botao) {

    if (!botao) {
        return;
    }


    if (botao.textContent.trim() === "♡") {

        botao.textContent = "♥";

        botao.style.transform = "scale(1.3)";


        setTimeout(() => {

            botao.style.transform = "scale(1)";

        }, 200);

    } else {

        botao.textContent = "♡";

    }

}


// =====================================================
// BOTÃO VOLTAR AO TOPO
// =====================================================

const botaoTopo =
    document.getElementById("topo");


if (botaoTopo) {

    // Esconde o botão inicialmente
    botaoTopo.style.display = "none";


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            botaoTopo.style.display = "block";

        } else {

            botaoTopo.style.display = "none";

        }

    });

}


// Função para voltar ao topo
function voltarTopo() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// =====================================================
// FORMULÁRIO DE CONTATO / ADOÇÃO
// =====================================================

const formContato = document.getElementById("formContato");
const mensagemSucesso = document.getElementById("mensagemSucesso");

if (formContato) {

    formContato.addEventListener("submit", function(event) {

        // Impede QUALQUER envio normal do formulário
        event.preventDefault();
        event.stopImmediatePropagation();

        // Pega os dados
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const pet = document.getElementById("pet").value;
        const mensagem = document.getElementById("mensagem").value.trim();

        // =================================================
        // SEU NÚMERO DO WHATSAPP
        // =================================================

        const numeroWhatsApp = "5511999999999";


        // =================================================
        // MENSAGEM
        // =================================================

        const texto =
`🐾 *NOVO INTERESSE EM ADOÇÃO*

👤 *Nome:* ${nome}

📧 *E-mail:* ${email}

📱 *Telefone:* ${telefone}

🐶 *Pet escolhido:* ${pet}

💬 *Mensagem:*
${mensagem}

❤️ Enviado pelo site Adote um Amigo.`;


        // =================================================
        // LINK DO WHATSAPP
        // =================================================

        const linkWhatsApp =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(texto);


        // =================================================
        // MENSAGEM DE SUCESSO
        // =================================================

        if (mensagemSucesso) {

            mensagemSucesso.textContent =
                "🐾 Formulário preenchido! Abrindo o WhatsApp... ❤️";

            mensagemSucesso.classList.add("mostrar");

        }


        // =================================================
        // ABRIR WHATSAPP
        // =================================================

        const link = document.createElement("a");

        link.href = linkWhatsApp;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        // =================================================
        // LIMPAR FORMULÁRIO
        // =================================================

        formContato.reset();

    }, true);

}

