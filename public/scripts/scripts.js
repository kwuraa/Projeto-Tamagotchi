function atualizarStatus() {
  document.getElementById("fome-bar").value = tamagotchiStatus.fome;
  document.getElementById("energia-bar").value = tamagotchiStatus.energia;
  document.getElementById("felicidade-bar").value = tamagotchiStatus.felicidade;
}

function timingStatus() {
  Math.max(tamagotchiStatus.fome - 5, 0);
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

const intervaloStatus = setInterval(timingStatus, 111111000);

function salvarEstado() {
  localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
}

let { tamagotchiStatus, nomeTamagotchi } = inicializarTamagotchi();
atualizarStatus();

let dormindo = false;

function alimentar() {
  if (dormindo === false) {
    tamagotchiStatus.fome = Math.min(tamagotchiStatus.fome + 10, 100);
    tamagotchiStatus.felicidade = Math.min(
      tamagotchiStatus.felicidade + 5,
      100
    );

    document.getElementById("fome-bar").value = tamagotchiStatus.fome;
    document.getElementById("felicidade-bar").value =
      tamagotchiStatus.felicidade;

    salvarEstado();
    atualizarStatus();
  } else {
    alert("O seu Tamagotchi está dormindo, não pode alimentar!");
  }
}

function brincar() {
  if (dormindo === false) {
    tamagotchiStatus.felicidade = Math.min(
      tamagotchiStatus.felicidade + 20,
      100
    );

    if (tamagotchiStatus.energia > 0) {
      tamagotchiStatus.energia = tamagotchiStatus.energia - 10;
    }

    document.getElementById("energia-bar").value = tamagotchiStatus.energia;
    document.getElementById("felicidade-bar").value =
      tamagotchiStatus.felicidade;

    salvarEstado();
    atualizarStatus();
  } else {
    alert("O seu Tamagotchi está dormindo, não pode brincar!");
  }
}

function dormir() {
  if (dormindo !== true) {
    document.getElementById("energia-bar").value = tamagotchiStatus.energia;
    dormindo = true;
    clearInterval(intervaloStatus);
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
