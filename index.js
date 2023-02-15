let listaUsuarios = buscarDadosDoLocalStorage("usuarios");

let formCadastro = document.getElementById("formulario-cadastro");
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let userName = document.getElementById("novo_usuario").value;
  let emailUsuario = document.getElementById("email").value;
  let confirmacaoEmail = document.getElementById("confirmacao_email").value;
  let primeiraSenha = document.getElementById("primeira_senha").value;
  let segundaSenha = document.getElementById("segunda_senha").value;

  if (primeiraSenha !== segundaSenha) {
    alert("As senhas devem ser iguais");
    return;
  }

  if (emailUsuario !== confirmacaoEmail) {
    alert("Os emails digitados devem ser iguais");
    return;
  }

  let existe = listaUsuarios.some((valor) => valor.email === emailUsuario);
  if (existe) {
    alert("E-mail já cadastrado");
    formCadastro.reset();
    return;
  }

  let existeUser = listaUsuarios.some(
    (valor) => valor.novo_usuario === userName
  );
  if (existeUser) {
    alert("Esse nome de usuário já existe. Por favor, escolha outro");
    formCadastro.reset();
    return;
  }

  let novoUsuario = {
    usuario: userName,
    email: emailUsuario,
    senha: primeiraSenha,
    recados: [],
  };

  listaUsuarios.push(novoUsuario);
  guardarNoLocalStorage("usuarios", listaUsuarios);
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
  formCadastro.reset();
});

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
