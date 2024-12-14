window.onload = function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    let total = 0;

    cartItemsContainer.innerHTML = ""; // Limpar antes de adicionar os itens

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='text-gray-500'>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemHTML = `
                <div class="flex items-center space-x-4 mb-4">
                    <img src="${item.imagem}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md">
                    <div class="flex-1">
                        <h3 class="font-semibold text-[#A020F0]">${item.name}</h3>
                        <p class="text-gray-600">Preço: ${item.price} R$</p>
                        <div class="flex items-center space-x-2">
                            <input type="number" value="${item.quantity}" min="1" id="quantity-${index}" class="w-16 p-2 border border-gray-300 rounded-md" onchange="updateQuantity(${index})">
                            <span class="text-gray-600">Quantidade</span>
                            <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });

        totalContainer.querySelector("span").innerText = `Total: ${total} R$`;
    }
};


function updateQuantity(index) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newQuantity = parseInt(document.getElementById(`quantity-${index}`).value);

    if (newQuantity < 1) {
        return; // Impede que a quantidade seja menor que 1
    }

    const item = cart[index];
    item.quantity = newQuantity;

    // Atualizar localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Recarregar a página para refletir as mudanças
    window.onload();
}

// Função para remover um item do carrinho
async function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const itemToRemove = cart[index];

    try {
        // Fazendo a requisição DELETE para remover o item do servidor
        console.log("Tentando remover o item com ID:", itemToRemove.id);

        const response = await fetch(`http://localhost:8080/carrinho/${itemToRemove.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar o item');
        }

        // Caso a exclusão seja bem-sucedida, remove o item do carrinho local
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Atualizar a página para refletir a exclusão
        window.onload();
    } catch (error) {
        console.error('Erro ao excluir item:', error);
        alert('Erro ao excluir item. Verifique a conexão com o servidor.');
    }
}
// Função para exibir mensagem de sucesso
document.getElementById('finalizar-compra').addEventListener('click', function (event) {
    event.preventDefault(); // Impede a navegação para a página de checkout

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // Calculando o total da compra
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Exibindo a mensagem de sucesso
    alert(`Sua compra foi realizada com sucesso! No valor de ${total} R$`);

    // Opcional: após a exibição da mensagem, você pode limpar o carrinho
    localStorage.removeItem("cart");

    // Redirecionar para uma página de confirmação de compra ou para a home
    window.location.href = "index.html"; // Exemplo de redirecionamento
});

// Inicializa a página com os itens ao carregar
document.addEventListener('DOMContentLoaded', window.onload);