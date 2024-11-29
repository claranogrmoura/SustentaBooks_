// Função para adicionar item ao carrinho
function adicionarAoCarrinho(id, titulo, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id, titulo, preco, imagem, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert("Item adicionado ao carrinho!");
}

// Configurar eventos para botões de compra
document.querySelectorAll('.btn-success').forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        const produto = event.target.closest('.col-md-3');
        const id = produto.id;
        const titulo = produto.querySelector('h3').textContent.trim();
        const preco = produto.querySelector('.preco').textContent.trim();
        const imagem = produto.querySelector('img').src;

        adicionarAoCarrinho(id, titulo, preco, imagem);
    });
});

// Função para carregar itens no carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const container = document.querySelector('.cart');

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    container.innerHTML = carrinho.map(item => `
        <div class="cart-item">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="item-info">
                <h2>${item.titulo}</h2>
                <p>Preço: ${item.preco}</p>
                <label for="quantity-${item.id}">Quantidade:</label>
                <input type="number" id="quantity-${item.id}" value="${item.quantidade}" min="1" onchange="atualizarQuantidade('${item.id}', this.value)">
                <button class="remove-btn" onclick="removerItem('${item.id}')">Remover</button>
            </div>
        </div>
    `).join('');

    calcularTotal();
}

// Atualiza a quantidade de itens no carrinho
function atualizarQuantidade(id, novaQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let item = carrinho.find(item => item.id === id);
    if (item) item.quantidade = parseInt(novaQuantidade, 10);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    calcularTotal();
}

// Remove um item do carrinho
function removerItem(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(item => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// Calcula o total dos itens no carrinho
function calcularTotal() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total = carrinho.reduce((soma, item) => soma + (parseFloat(item.preco.replace('R$', '').replace(',', '.')) * item.quantidade), 0);
    document.querySelector('.cart-total h3').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Inicializa o carrinho na página do carrinho
if (document.querySelector('.cart')) {
    document.addEventListener('DOMContentLoaded', carregarCarrinho);
}