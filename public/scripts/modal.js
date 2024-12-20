//? Refatorado
const modal = document.getElementById("modal");
let tamagotchiCriado = false;
let intervaloStatus;

function SalvarNomeTamagotchi(nomeChar) {
  localStorage.setItem("tamagotchiNome", nomeChar);
}

function resgatarNome() {
  const botaoCriarChar = document.getElementById("criar-char");
  if (!botaoCriarChar) {
    console.error("botão 'criar-Char' não encontrado!");
    return;
  }

  botaoCriarChar.addEventListener("click", () => {
    const nomeCharInput = document.getElementById("nome-char");
    if (!nomeCharInput) {
      console.error("input 'nome-char' não encontrado!");
      return;
    }

    const nomeChar = nomeCharInput.value.trim();
    if (nomeChar === "") {
      alert("Por Favor, insira um nome válido!!");
      return;
    }

    SalvarNomeTamagotchi(nomeChar);
    modal.style.display = "none";
    atualizarInterface(nomeChar);
    tamagotchiCriado = true;
    iniciarTimer();
    location.reload();
  });
}

function atualizarInterface(nomeTamagotchi) {
  const nomeElemento = document.getElementById("tamagotchiNome");
  if (nomeElemento) {
    nomeElemento.textContent = nomeTamagotchi;
  }
}

function inicializarTamagotchi() {
  let tamagotchiStatus = localStorage.getItem("tamagotchiStatus");
  let nomeTamagotchi = localStorage.getItem("tamagotchiNome");

  if (!tamagotchiStatus || !nomeTamagotchi) {
    modal.style.display = "block";
    tamagotchiStatus = {
      fome: 50,
      energia: 80,
      felicidade: 100,
    };

    tamagotchiCriado = false;
    pararTimer();
    resgatarNome();

    localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
  } else {
    tamagotchiStatus = JSON.parse(tamagotchiStatus);
    tamagotchiCriado = true;
    iniciarTimer();
    atualizarInterface(nomeTamagotchi);
  }
  return { tamagotchiStatus, nomeTamagotchi };
}

const buttons = document.querySelectorAll("#select-chars button");

buttons.forEach((botao) => {
  botao.addEventListener("click", (event) => {
    const charSelection = event.currentTarget.dataset.img;

    // Remove a marcação de todos os botões
    buttons.forEach((btn) => btn.classList.remove("marked"));
    // Marca o botão clicado
    botao.classList.add("marked");

    atualizarVisualização(charSelection);
    localStorage.setItem("imagemSelecionada", charSelection);
  });
});

window.onload = inicializarTamagotchi;
