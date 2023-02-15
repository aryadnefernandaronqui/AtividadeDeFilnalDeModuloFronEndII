let listaUsuarios = buscarDadosDoLocalStorage("usuarios");

let formLogin = document.getElementById("formulario-login");

formLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const usuario = document.getElementById("novo_usuario").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("primeira_senha").value;

  const usuarioEncontrado = listaUsuarios.find(
    (valor) =>
      valor.usuario === usuario &&
      valor.email === email &&
      valor.senha === senha
  );

  console.log(usuarioEncontrado);

  if (!usuarioEncontrado) {
    alert("Usuário, e-mail ou senha inválidos");
    return;
  } else {
    guardarNoLocalStorage("usuarioLogado", usuarioEncontrado);
    setTimeout(() => {
      window.location.href = "./recados.html";
    }, 2000);
  }
});

function guardarNoLocalStorage(chave, valor) {
  const valorJSON = JSON.stringify(valor);

  localStorage.setItem(chave, valorJSON);
  console.log(chave);
  console.log(valor);
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
