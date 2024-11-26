function carregarImagemSelecionada() {
  const imagemSelecionada = localStorage.getItem("imagemSelecionada");
  if (imagemSelecionada) {
    atualizarVisualização(imagemSelecionada);
  }
}

function atualizarVisualização(charSelection) {
  const preview = document.getElementById("avatar");

  preview.src = charSelection;
  preview.style.display = "block";
}

carregarImagemSelecionada();
