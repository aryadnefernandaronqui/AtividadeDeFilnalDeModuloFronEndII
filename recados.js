const modalEditar = new bootstrap.Modal("#modal-editar");

const usuarioLogado = buscarDadosDoLocalStorage("usuarioLogado");

/* document.addEventListener("DOMContentLoaded", () => {
  if (!usuarioLogado.email) {
    window.location.href = "./login.html";
  } else {
    tarefaNoHTML();
  }
});
 */
const tbody = document.getElementById("tabela-tarefa");
const formularioHTML = document.getElementById("formulario-tarefa");

formularioHTML.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tarefa = document.getElementById("tarefa").value;
  const descricao = document.getElementById("descricao").value;

  const novaTarefa = {
    tarefa: tarefa,
    descricao: descricao,
  };

  usuarioLogado.recados.push(novaTarefa);

  guardarNoLocalStorage("usuarioLogado", usuarioLogado);

  formularioHTML.reset();
  tarefaNoHTML();
});

function tarefaNoHTML() {
  tbody.innerHTML = "";

  usuarioLogado.recados.forEach((valor, index) => {
    tbody.innerHTML += `
        <tr id="${index}">
        <td>${index + 1} </td>
        <td>${valor.tarefa}</td>
        <td>${valor.descricao}</td>
        <td>
        <button
         id="botao-editar" class="botao-acao" type="button" onclick="prepararEdicaoTarefa(${index})" 
         data-bs-toggle="modal" data-bs-target="#modal-editar">
        <i class="bi bi-pen-fill"></i>
        
      </button>
        <button id="botao-excluir" class="botao-acao" onclick="apagarTarefa(${index})"> <i class="bi bi-trash-fill"></i></button>
          </td>
      </tr>
        `;
  });
}
function guardarNoLocalStorage(chave, valor) {
  const valorJSON = JSON.stringify(valor);
  localStorage.setItem(chave, valorJSON);
}

function buscarDadosDoLocalStorage(chave) {
  const dadoJSON = localStorage.getItem(chave);

  if (dadoJSON) {
    const listaDados = JSON.parse(dadoJSON);
    return listaDados;
  } else {
    return [];
  }
}

function prepararEdicaoTarefa(indice) {
  const editandoTarefa = document.getElementById("editar-tarefa");
  const editandoDescricao = document.getElementById("editar-descricao");

  editandoTarefa.value = usuarioLogado.recados[indice].tarefa;
  editandoDescricao.value = usuarioLogado.recados[indice].descricao;

  const botaoSalvar = document.getElementById("btn-salvar-edicao");
  botaoSalvar.setAttribute("onclick", `salvarEdicao(${indice})`);
}

function salvarEdicao(indice) {
  const editandoTarefa = document.getElementById("editar-tarefa").value;
  const editandoDescricao = document.getElementById("editar-descricao").value;

  usuarioLogado.recados[indice].tarefa = editandoTarefa;
  usuarioLogado.recados[indice].descricao = editandoDescricao;

  guardarNoLocalStorage("usuarioLogado", usuarioLogado);

  tarefaNoHTML();
  modalEditar.hide();
}

function sairDaAplicacao() {
  salvarTarefa();
  localStorage.removeItem("usuarioLogado");
  window.location.href = "./login.html";
}

function salvarTarefa() {
  const listaUsuarios = buscarDadosDoLocalStorage("usuarios");

  const acharUsuario = listaUsuarios.findIndex(
    (valor) => valor.email === usuarioLogado.email
  );
  listaUsuarios[acharUsuario].recados = usuarioLogado.recados;

  guardarNoLocalStorage("usuarios", listaUsuarios);
}

function apagarTarefa(indice) {
  let confirma = window.confirm("deseja excluir?");
  if (confirma) {
    usuarioLogado.recados.splice(indice, 1);
    guardarNoLocalStorage("usuarioLogado", usuarioLogado);
    const tr = document.getElementById(indice);
    tr.remove;

    tarefaNoHTML();
  }
}
