//? Refatorado
const morte = document.getElementById("modal-morte");
const mortemsg = document.getElementById("msg-morte");
const mortebtn = document.getElementById("btn-morte");

function atualizarBarra(elementoId, valor) {
  const barra = document.getElementById(elementoId);
  if (barra) barra.value = valor;
}

function atualizarStatus() {
  atualizarBarra("fome-bar", tamagotchiStatus.fome);
  atualizarBarra("energia-bar", tamagotchiStatus.energia);
  atualizarBarra("felicidade-bar", tamagotchiStatus.felicidade);
}

function timingStatus() {
  tamagotchiStatus.fome = Math.max(tamagotchiStatus.fome - 2, 0);
  tamagotchiStatus.energia = Math.max(tamagotchiStatus.energia - 1.5, 0);
  tamagotchiStatus.felicidade = Math.max(tamagotchiStatus.felicidade - 0.5, 0);

  atualizarStatus();
  salvarEstado();
  verificarSaude();
}

function verificarSaude() {
  if (tamagotchiStatus.fome <= 0 || tamagotchiStatus.energia <= 0) {
    morte.style.display = "block";
    mortemsg.innerText = `${nomeTamagotchi} Morreu!!`;
  }
}

function criarNovo() {
  localStorage.clear();
  location.reload();
}

function iniciarTimer() {
  if (!intervaloStatus) {
    setInterval(() => {
      if (tamagotchiCriado) {
        timingStatus();
      }
    }, 200);
  }
}

function pararTimer() {
  if (intervaloStatus) {
    clearInterval(intervaloStatus);
    intervaloStatus = null;
  }
}

function salvarEstado() {
  localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
}

let { tamagotchiStatus, nomeTamagotchi } = inicializarTamagotchi();
atualizarStatus();

let dormindo = false;

function alimentar() {
  if (dormindo) {
    alert(`${nomeTamagotchi} está dormindo ele não pode se alimentar agora!`);
    return;
  }
  tamagotchiStatus.fome = Math.min(tamagotchiStatus.fome + 10, 100);
  tamagotchiStatus.felicidade = Math.min(tamagotchiStatus.felicidade + 5, 100);

  salvarEstado();
  atualizarStatus();
}

function brincar() {
  if (dormindo) {
    alert(`${nomeTamagotchi} esta dormindo não pode brincar!`);
    return;
  }
  tamagotchiStatus.felicidade = Math.min(tamagotchiStatus.felicidade + 20, 100);
  tamagotchiStatus.energia = Math.max(tamagotchiStatus.energia - 10, 0);
  tamagotchiStatus.fome = Math.max(tamagotchiStatus.fome - 5, 0);

  salvarEstado();
  atualizarStatus();
}

function dormir() {
  if (!dormindo) {
    dormindo = true;
    clearInterval(intervaloStatus);

    const intervaloSono = setInterval(() => {
      if (tamagotchiStatus.energia < 100) {
        tamagotchiStatus.energia = Math.min(tamagotchiStatus.energia + 3, 100);
        tamagotchiStatus.fome = Math.max(tamagotchiStatus.fome - 0.5, 0);

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

function reset() {
  localStorage.clear();
  location.reload();
}
