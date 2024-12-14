const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id = undefined; // ID do item em edição

// Função para abrir o modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = itens[index].id;
  } else {
    sNome.value = '';
    sFuncao.value = '';
    sSalario.value = '';
    id = undefined;
  }
}

// Função para fechar o modal
function closeModal() {
  modal.classList.remove('active');
}

// Salvar ou editar um item
btnSalvar.addEventListener('click', async (e) => {
  e.preventDefault();

  if (!sNome.value || !sFuncao.value || !sSalario.value) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const novoTrabalho = {
    nome: sNome.value.trim(),
    funcao: sFuncao.value.trim(),
    salario: parseFloat(sSalario.value),
  };

  try {
    let response;

    if (id !== undefined) {
      // Atualizar item existente
      response = await fetch(`http://localhost:8080/trabalho/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoTrabalho),
      });
    } else {
      // Criar novo item
      response = await fetch('http://localhost:8080/trabalho/trabalhadores ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoTrabalho),
      });
    }

    if (!response.ok) {
      throw new Error('Erro ao salvar os dados');
    }

    alert('Item salvo com sucesso!');
    closeModal();
    loadItens(); // Recarregar itens
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    alert('Erro ao salvar os dados. Verifique a conexão com o servidor.');
  }
});

// Carregar itens da API
async function loadItens() {
  try {
    const response = await fetch('http://localhost:8080/trabalho');

    if (!response.ok) {
      throw new Error('Erro ao carregar itens');
    }

    itens = await response.json();
    renderTabela(); // Renderizar tabela com os itens
  } catch (error) {
    console.error('Erro ao carregar itens:', error);
    alert('Erro ao carregar itens. Verifique a conexão com o servidor.');
  }
}

// Renderizar tabela
function renderTabela() {
  tbody.innerHTML = ''; // Limpa a tabela

  itens.forEach((item, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario.toFixed(2)}</td>
      <td class="acao">
        <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Deletar um item
async function deleteItem(index) {
  const trabalho = itens[index];

  try {
    const response = await fetch(`http://localhost:8080/trabalho/${trabalho.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar o item');
    }

    loadItens(); // Recarregar tabela após exclusão
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    alert('Erro ao excluir item. Verifique a conexão com o servidor.');
  }
}

// Inicializa a página carregando os itens
document.addEventListener('DOMContentLoaded', loadItens);
