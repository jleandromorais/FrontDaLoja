document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById('loginButton'); // Botão de Enviar
    const cancelButton = document.getElementById('cancelButton'); // Botão de Cancelar
    const modal = document.querySelector('.modal-container');
    
    // Evento de clique para o botão de login (enviar)
    loginButton.addEventListener('click', async () => {
        const login = document.getElementById('login').value; // Captura o valor do campo de login
        const senha = document.getElementById('senha').value; // Captura o valor do campo de senha

        // Exibir alerta caso os campos estejam vazios
        if (!login || !senha) {
            alert("Por favor, preencha todos os campos.");
            return; // Interrompe a execução
        }

        try {
            // Faz uma requisição PUT para enviar os dados de login
            const putResponse = await fetch('http://localhost:8080/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, senha }), // Envia os dados no corpo da requisição
            });

            // Verifica se o servidor respondeu com um código de erro
            if (!putResponse.ok) {
                throw new Error("Erro ao enviar os dados para a API (PUT).");
            }

            // Converte a resposta do PUT em JSON
            const putData = await putResponse.json();
            console.log('PUT Response:', putData);

            // Verifica a resposta da API para determinar o sucesso do login
            if (putData.success) {
                alert("Login realizado com sucesso!");
                // Pode redirecionar para outra página ou salvar o token aqui
                window.location.href = "pagina_principal.html"; // Exemplo de redirecionamento
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }

        } catch (error) {
            // Captura e exibe erros
            console.error('Erro:', error);
            alert("Erro ao conectar ao servidor ou ao banco de dados. Verifique sua conexão e tente novamente.");
        }
    });

    // Evento de clique para o botão de cancelar
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Fecha o modal
        window.location.href = "index.html"; // Redireciona para a página inicial ou outra página
    });
});
