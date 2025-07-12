document.addEventListener('DOMContentLoaded', () => {
  setProductDetails();
  renderCart();
});

// Obtem produto da URL
function getProductFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('product');
}

// Seta os detalhes do produto
function setProductDetails() {
  const productKey = getProductFromURL();
  const product = productMap[productKey];

  if (product) {
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = `Preço: ${product.price} R$`;
    document.getElementById("product-description").innerText = product.description;
    document.getElementById("product-image").src = product.imagem;
  }
}

// Mapeamento dos produtos
const productMap = {
  "cadeira": { name: "Cadeira", price: 50, description: "Cadeira top", imagem: "images/download.jpeg" },
  "cama": { name: "Cama", price: 1100, description: "Dormir com estilo", imagem: "images/cama.webp" },
  "sala": { name: "Sala de Estar", price: 150, description: "Janta bonita", imagem: "images/mesa-de-jantar-laca-branca-brilhante-quadrada-sala-moderna.jpg" },
};

// Adiciona produto ao carrinho
async function addToCart(event) {
  event.preventDefault();

  const quantity = parseInt(document.getElementById("quantity").value);
  if (quantity < 1) return alert("Quantidade inválida.");

  const productKey = getProductFromURL();
  const product = productMap[productKey];
  if (!product) return alert("Produto inválido.");

  const item = { ...product, quantity };

  // Atualiza localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.name === item.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Envia pro backend
  try {
    const response = await fetch("http://localhost:8080/carrinho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      document.getElementById("success-message").classList.remove("hidden");
      document.getElementById("success-message").innerText = `${item.name} foi adicionado ao carrinho!`;
      setTimeout(() => window.location.href = "cart.html", 2000);
    } else {
      const errorText = await response.text();
      console.error("Erro ao adicionar:", errorText);
      alert("Erro ao adicionar ao carrinho.");
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    alert("Erro com o servidor.");
  }
}

// Renderiza o carrinho
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total").querySelector("span");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>Seu carrinho está vazio.</p>";
    totalSpan.innerText = "Total: 0 R$";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <div class="flex items-center space-x-4 mb-4">
        <img src="${item.imagem}" alt="${item.name}" class="w-20 h-20 rounded-md">
        <div class="flex-1">
          <h3 class="font-semibold">${item.name}</h3>
          <p>Preço: ${item.price} R$</p>
          <div class="flex items-center space-x-2">
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeFromCart(${index})" class="text-red-500">Excluir</button>
          </div>
        </div>
      </div>
    `;
  });

  totalSpan.innerText = `Total: ${total} R$`;
}

function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (newQuantity < 1) return;
  cart[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

async function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const item = cart[index];

  try {
    const response = await fetch(`http://localhost:8080/carrinho/${item.id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error("Falha ao excluir item no servidor");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro ao remover item.");
  }
}

// Finaliza a compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Sua compra foi realizada com sucesso! Total: ${total} R$`);
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});
