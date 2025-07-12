# 🪑 FrontDaLoja

**FrontDaLoja** é o front-end de uma loja de móveis online. A aplicação foi desenvolvida com foco na experiência do cliente e na praticidade de administração. O sistema possui funcionalidades para **clientes** e **administradores**, como visualização de produtos, carrinho de compras e cadastro de funcionários.

---

## ✨ Funcionalidades

### 👤 Para Clientes

- 🛋️ **Visualização de Produtos**
  - Lista de produtos na página inicial.
  - Detalhamento individual dos produtos.

- 🛒 **Carrinho de Compras**
  - Adicionar, remover e ajustar quantidades de itens.
  - Dados persistidos no `localStorage`.

- 📝 **Registro de Usuário**
  - Interface para novos clientes criarem conta.

---

### 🛠️ Para Administradores

- 🔐 **Login Seguro**
  - Acesso exclusivo via e-mail corporativo (`@empresa.frontal`).

- 👥 **Gestão de Funcionários**
  - Cadastro, edição e exclusão de funcionários após o login.

---

## ⚙️ Tecnologias Utilizadas

- ✅ **HTML5**
- 🎨 **CSS3** com **Tailwind CSS**
- ⚙️ **JavaScript (Vanilla)**

---

## 📁 Estrutura do Projeto

| Arquivo / Pasta        | Função                                                                 |
|------------------------|------------------------------------------------------------------------|
| `index.html`           | Página inicial com listagem de produtos.                              |
| `product.html`         | Página de detalhes do produto.                                        |
| `product.js`           | Lógica de exibição dos detalhes e adição ao carrinho.                 |
| `cart.html`            | Interface do carrinho de compras.                                     |
| `jsdocart.js`          | Manipulação de quantidades, remoções e persistência do carrinho.      |
| `AdminLogin.html`      | Tela de login exclusiva para administradores.                         |
| `js.js`                | Lógica de autenticação do administrador.                              |
| `Cadastro.html`        | Página para gestão de funcionários.                                   |
| `script.js`            | Operações de CRUD para funcionários.                                  |
| `Register.html`        | Tela de registro para novos usuários/clientes.                        |
| `style.css`            | Estilos personalizados do projeto.                                    |

---

## 🚀 Como Executar o Projeto

### 📌 Requisitos

- Um servidor backend rodando localmente na URL: `http://localhost:8080`.

### ▶️ Passos

1. Certifique-se de que o backend esteja em execução.

2. Para usar como **cliente**:
   - Abra o arquivo `index.html` no navegador.

3. Para usar como **administrador**:
   - Acesse o arquivo `AdminLogin.html` e entre com um e-mail corporativo válido.

---

## 📬 Contribuição

Sinta-se à vontade para contribuir com melhorias no código, organização ou novas funcionalidades. Pull Requests são bem-vindos!

---

## 🪪 Licença

Este projeto é de uso acadêmico/didático e está disponível sob a licença MIT.

