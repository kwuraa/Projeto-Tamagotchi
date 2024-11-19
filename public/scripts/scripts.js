function inicializarTamagotchi() {
  let tamagotchiStatus = localStorage.getItem("tamagotchiStatus");
  let nomeTamagotchi = localStorage.getItem("tamagotchiNome");

  if (
    (tamagotchiStatus === null && nomeTamagotchi === null) ||
    nomeTamagotchi === ""
  ) {
    tamagotchiStatus = {
      fome: 50,
      energia: 80,
      felicidade: 100,
    };
    nomeTamagotchi = prompt("Digite o nome do seu Tamagotchi:");
    localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
    localStorage.setItem("tamagotchiNome", nomeTamagotchi);
  } else {
    tamagotchiStatus = JSON.parse(tamagotchiStatus);
  }
  document.getElementById("tamagotchiNome").textContent = nomeTamagotchi;
  return { tamagotchiStatus, nomeTamagotchi };
}

function atualizarStatus() {
  document.getElementById("fome-bar").value = tamagotchiStatus.fome;
  document.getElementById("energia-bar").value = tamagotchiStatus.energia;
  document.getElementById("felicidade-bar").value = tamagotchiStatus.felicidade;
}

function timingStatus() {
  Math.min((tamagotchiStatus.fome -= 5), 0);
  Math.min((tamagotchiStatus.energia -= 3), 0);
  Math.min((tamagotchiStatus.felicidade -= 2), 0);

  atualizarStatus();
  salvarEstado();
  health();
}

function health() {
  if (tamagotchiStatus.fome < 0 || tamagotchiStatus.energia <= 0) {
    localStorage.clear();
    location.reload();
    alert(`O ${nomeTamagotchi} Morreu!!! clique OK para criar um novo!`);
  }
}

const intervaloStatus = setInterval(timingStatus, 25000);

function salvarEstado() {
  localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
}

let { tamagotchiStatus, nomeTamagotchi } = inicializarTamagotchi();
atualizarStatus();

let dormindo = false;

function alimentar() {
  tamagotchiStatus.fome = Math.min(tamagotchiStatus.fome + 10, 100);
  tamagotchiStatus.felicidade = Math.min(tamagotchiStatus.felicidade + 5, 100);

  document.getElementById("fome-bar").value = tamagotchiStatus.fome;
  document.getElementById("felicidade-bar").value = tamagotchiStatus.felicidade;

  salvarEstado();
  atualizarStatus();
}

function brincar() {
  tamagotchiStatus.felicidade = Math.min(tamagotchiStatus.felicidade + 20, 100);

  if (tamagotchiStatus.energia > 0) {
    tamagotchiStatus.energia = tamagotchiStatus.energia - 10;
  }

  document.getElementById("energia-bar").value = tamagotchiStatus.energia;
  document.getElementById("felicidade-bar").value = tamagotchiStatus.felicidade;

  salvarEstado();
  atualizarStatus();
}

function dormir() {
  if (dormindo !== true) {
    document.getElementById("energia-bar").value = tamagotchiStatus.energia;
    dormindo = true;
    console.log("dormindo ...");

    const intervaloSono = setInterval(() => {
      if (tamagotchiStatus.energia < 100) {
        tamagotchiStatus.energia = Math.min(tamagotchiStatus.energia + 3, 100);
        console.log(`energia: ${tamagotchiStatus.energia}`);
        salvarEstado();
        atualizarStatus();
      } else {
        clearInterval(intervaloSono);
        dormindo = false;
      }
    }, 1000);
  }
}

function limpar() {
  tamagotchi.felicidade += 10;
  salvarEstado();
  atualizarStatus();
}
