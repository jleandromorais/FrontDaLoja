function getProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product');
}

function setProductDetails() {
    const product = getProductFromURL();
    const productDetails = {
        "cadeira": {
            name: "Cadeira",
            price: 50,
            description: "Elegant and comfortable furniture for your living space.",
            imagem: "images/download.jpeg",
            id: 10
        },
        "cama": {
            name: "Cama",
            price: 1100,
            description: "Peaceful and stylish bedroom furniture.",
            imagem: "images/cama.webp",
            id: 20
        },
        "sala": {
            name: "Sala de Estar",
            price: 150,
            description: "Beautiful dining sets for memorable meals.",
            imagem: "images/mesa-de-jantar-laca-branca-brilhante-quadrada-sala-moderna.jpg",
            id: 30
        }
    };

    const productInfo = productDetails[product];

    if (productInfo) {
        document.getElementById("product-name").innerText = productInfo.name;
        document.getElementById("product-price").innerText = "Preço: " + productInfo.price + " R$";
        document.getElementById("product-description").innerText = productInfo.description;
        document.getElementById("product-image").src = productInfo.imagem;
    } else {
        console.error("Produto não encontrado!");
    }
}

async function addToCart(event) {
    event.preventDefault();

    const product = getProductFromURL();
    const quantity = parseInt(document.getElementById("quantity").value);

    // Garantir que a quantidade seja maior que 0
    if (quantity < 1) {
        alert("A quantidade deve ser maior que 0.");
        return;
    }

    const productDetails = {
        "cadeira": {
            name: "Cadeira",
            price: 50,
            imagem: "images/download.jpeg",
            quantity: quantity,
            id: 10 // Gerar ID aleatório
        },
        "cama": {
            name: "Cama",
            price: 1100,
            imagem: "images/cama.webp",
            quantity: quantity,
            id: 20 // Gerar ID aleatório
        },
        "sala": {
            name: "Sala de Estar",
            price: 150,
            imagem: "images/mesa-de-jantar-laca-branca-brilhante-quadrada-sala-moderna.jpg",
            quantity: quantity,
            id: 30 // Gerar ID aleatório
        }
    };

    const productInfo = productDetails[product];
    if (!productInfo) {
        alert("Erro: Produto inválido!");
        return;
    }

    // Adicionar ao carrinho no localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(item => item.name === productInfo.name);

    if (existingProductIndex >= 0) {
        // Produto já existe no carrinho, atualize a quantidade
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Produto não existe no carrinho, adicione como novo
        cart.push(productInfo);
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Agora, enviar o produto para o backend usando fetch
    try {
        const response = await fetch('http://localhost:8080/carrinho', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productInfo),
        });

        if (response.ok) {
            document.getElementById("success-message").classList.remove("hidden");
            document.getElementById("success-message").innerText = `${productInfo.name} foi adicionado ao carrinho!`;

            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = "cart.html";  // Ajuste o caminho conforme necessário
            }, 2000);
        } else {
            const errorMessage = await response.text();
            console.error("Erro ao adicionar ao carrinho:", errorMessage);
            alert("Erro ao adicionar ao carrinho. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao tentar se conectar ao servidor:", error);
        alert("Erro com o servidor. Verifique a conexão.");
    }
}

window.onload = setProductDetails;