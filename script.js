let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarBadge() {
    let badge = document.getElementById("badge");
    if (badge) {
        let totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
        badge.innerText = totalItens;
    }
}

function adicionarCarrinho(nome, preco) {
    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarBadge();
    mostrarNotificacao(nome + " adicionada!");
}

function carregarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalElemento = document.getElementById("total");

    if (!lista) return;

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;

        lista.innerHTML += `
        <div class="item-carrinho">
            <div>
                <strong>${item.nome}</strong><br>
                R$ ${item.preco.toFixed(2)}
            </div>
            <div class="controles">
                <button onclick="diminuir(${index})">-</button>
                <span>${item.quantidade}</span>
                <button onclick="aumentar(${index})">+</button>
            </div>
        </div>
        `;
    });

    totalElemento.innerText = total.toFixed(2);
}

function limparCarrinho() {
    carrinho = []; // esvazia o array
    localStorage.removeItem("carrinho"); // remove do armazenamento
    atualizarCarrinho(); // atualiza a tela
}

function aumentar(index) {
    carrinho[index].quantidade++;
    salvarCarrinho();
    carregarCarrinho();
    atualizarBadge();
}



function diminuir(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    } else {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    carregarCarrinho();
    atualizarBadge();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    carregarCarrinho();
    atualizarBadge();
}

function finalizarPedido() {
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let pagamento = document.getElementById("pagamento").value;

    if (!nome || !endereco || carrinho.length === 0) {
        alert("Preencha seus dados e adicione itens!");
        return;
    }

    let mensagem = `🍕 *Novo Pedido MsPizza* 🍕\n\n`;
    mensagem += `👤 Cliente: ${nome}\n`;
    mensagem += `📍 Endereço: ${endereco}\n`;
    mensagem += `💳 Pagamento: ${pagamento}\n\n`;
    mensagem += `🛒 Itens:\n`;

    let total = 0;

    carrinho.forEach(item => {
        mensagem += `- ${item.quantidade}x ${item.nome}\n`;
        total += item.preco * item.quantidade;
    });

    mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

    alert("Pedido enviado! 🎉");

    limparCarrinho();
}

function mostrarNotificacao(texto) {
    let div = document.createElement("div");
    div.className = "notificacao";
    div.innerText = texto;
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}

function atualizarTotalNoForm() {
    const total = document.getElementById("total").innerText;
    document.getElementById("totalInput").value = total;
}

document.querySelector("form").addEventListener("submit", atualizarTotalNoForm);

atualizarBadge();
carregarCarrinho();

