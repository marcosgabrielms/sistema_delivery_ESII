// 1. DADOS SIMULADOS (Com URLs de imagens do Unsplash para visual profissional)
const restaurantes = [
    { id: 1, nome: "Vegan Life", descricao: "Comida saudável, bowls e orgânicos", tempo: "30-45 min", imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80" },
    { id: 2, nome: "Giovannis' Pizza", descricao: "Pizzas artesanais de fermentação natural", tempo: "40-60 min", imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" },
    { id: 3, nome: "Green Burger", descricao: "Hambúrgueres premium e batatas", tempo: "20-40 min", imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" }
];

const cardapios = {
    1: [
        { id: 101, nome: "Salada Tropical Bowl", descricao: "Mix de folhas, manga e molho cítrico", preco: 25.00, imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" },
        { id: 102, nome: "Wrap de Vegetais", descricao: "Massa integral com hummus e legumes", preco: 18.50, imagem: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80" }
    ],
    2: [
        { id: 201, nome: "Pizza Margherita", descricao: "Molho de tomate fresco, mussarela e manjericão", preco: 45.00, imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80" },
        { id: 202, nome: "Pizza Pepperoni", descricao: "Borda recheada e fatias de pepperoni", preco: 55.00, imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80" }
    ],
    3: [
        { id: 301, nome: "Smash Burger Duplo", descricao: "Dois blends de 90g, cheddar e bacon", preco: 32.00, imagem: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80" },
        { id: 302, nome: "Batata Rústica", descricao: "Porção individual com maionese da casa", preco: 15.00, imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80" }
    ]
};

// 2. ESTADO DO SISTEMA
let carrinhoDeCompras = [];

// 3. FUNÇÕES DE NAVEGAÇÃO
function carregarRestaurantes() {
    document.getElementById("titulo-sessao").innerText = "Restaurantes Disponíveis";
    document.getElementById("btn-voltar").style.display = "none";
    const grid = document.getElementById("grid-conteudo");
    grid.innerHTML = ""; 

    for (let i = 0; i < restaurantes.length; i++) {
        let rest = restaurantes[i];
        grid.innerHTML += `
            <div class="card" onclick="carregarCardapio(${rest.id}, '${rest.nome}')">
                <img src="${rest.imagem}" class="card-img" alt="${rest.nome}">
                <div class="card-content">
                    <div class="card-title">${rest.nome}</div>
                    <div class="card-desc">${rest.descricao}</div>
                    <div class="card-info">
                        <span class="tempo"><i class="fa-regular fa-clock"></i> ${rest.tempo}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function carregarCardapio(idRestaurante, nomeRestaurante) {
    document.getElementById("titulo-sessao").innerText = nomeRestaurante;
    document.getElementById("btn-voltar").style.display = "block";
    const grid = document.getElementById("grid-conteudo");
    grid.innerHTML = ""; 

    let pratos = cardapios[idRestaurante];

    for (let i = 0; i < pratos.length; i++) {
        let prato = pratos[i];
        grid.innerHTML += `
            <div class="card">
                <img src="${prato.imagem}" class="card-img" alt="${prato.nome}">
                <div class="card-content">
                    <div class="card-title">${prato.nome}</div>
                    <div class="card-desc">${prato.descricao}</div>
                    <div class="card-info">
                        <span class="preco">R$ ${prato.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="add-btn" onclick="adicionarAoCarrinho(${prato.id}, '${prato.nome}', ${prato.preco}, event)">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    }
}

function voltarParaRestaurantes() { carregarRestaurantes(); }

// 4. LÓGICA DO CARRINHO
function adicionarAoCarrinho(id, nome, preco, event) {
    event.stopPropagation(); 
    carrinhoDeCompras.push({ id: id, nome: nome, preco: preco });
    atualizarCarrinhoHTML(); 
    
    // Mostra notificação chique ao invés de alert
    mostrarToast("🛒 " + nome + " adicionado!");
}

function removerDoCarrinho(index) {
    carrinhoDeCompras.splice(index, 1);
    atualizarCarrinhoHTML();
}

function atualizarCarrinhoHTML() {
    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-itens");
    const campoTotal = document.getElementById("valor-total");

    contador.innerText = carrinhoDeCompras.length;

    if (carrinhoDeCompras.length === 0) {
        lista.innerHTML = `
            <div class="carrinho-vazio">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>Seu carrinho está vazio.</p>
            </div>
        `;
        campoTotal.innerText = "R$ 0,00";
        return;
    }

    lista.innerHTML = ""; 
    let subtotal = 0;

    for (let i = 0; i < carrinhoDeCompras.length; i++) {
        let item = carrinhoDeCompras[i];
        subtotal += item.preco;
        
        lista.innerHTML += `
            <div class="carrinho-item">
                <div class="item-detalhes">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }

    campoTotal.innerText = "R$ " + subtotal.toFixed(2).replace('.', ',');
}

function finalizarPedido() {
    if (carrinhoDeCompras.length === 0) {
        mostrarToast("⚠️ Adicione itens ao carrinho primeiro!");
        return;
    }
    
    mostrarToast("✅ Pedido enviado com sucesso!");
    carrinhoDeCompras = []; 
    atualizarCarrinhoHTML();
    fecharCarrinho();
    voltarParaRestaurantes();
}

// 5. CONTROLES DE INTERFACE (Modais e Toasts)
function abrirCarrinho() {
    document.getElementById("modal-carrinho").classList.add("aberto");
    document.getElementById("overlay").classList.add("ativo");
}

    // 1. Seleciona o botão pelo ID
const loginBtn = document.getElementById("btn-abrir-login");

if (loginBtn) { // Verificação de segurança: só tenta linkar se o botão existir na página
    loginBtn.addEventListener("click", () => {
    console.log("Redirecionando para a tela de login...");
    window.location.href = "login.html";
});
}

function alternarAuth(event) {
    // Evita que o link '#' recarregue a página
    event.preventDefault();

    const loginSection = document.getElementById('section-login');
    const cadastroSection = document.getElementById('section-cadastro');

    // Se o login estiver aparecendo, esconde ele e mostra o cadastro (e vice-versa)
    if (loginSection.style.display === "none") {
        loginSection.style.display = "block";
        cadastroSection.style.display = "none";
    } else {
        loginSection.style.display = "none";
        cadastroSection.style.display = "block";
    }
}


function fecharCarrinho() {
    document.getElementById("modal-carrinho").classList.remove("aberto");
    document.getElementById("overlay").classList.remove("ativo");
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.innerText = mensagem;
    toast.className = "toast show";
    setTimeout(function() { toast.className = toast.className.replace("show", ""); }, 3000);
}

// INICIA O APP
carregarRestaurantes();