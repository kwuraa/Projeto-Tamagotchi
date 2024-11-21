const modal = document.getElementById("modal");

function resgatarNome() {
  document.getElementById("criar-char").addEventListener("click", () => {
    localStorage.getItem("tamagotchiNome");
    const nomeChar = document.getElementById("nome-char").value;
    localStorage.setItem("tamagotchiNome", nomeChar);

    modal.style.display = "none";

    location.reload();
  });
}

function inicializarTamagotchi() {
  let tamagotchiStatus = localStorage.getItem("tamagotchiStatus");
  let nomeTamagotchi = localStorage.getItem("tamagotchiNome");

  if (
    (tamagotchiStatus === null && nomeTamagotchi === null) ||
    nomeTamagotchi === ""
  ) {
    modal.style.display = "block";
    tamagotchiStatus = {
      fome: 50,
      energia: 80,
      felicidade: 100,
    };
    // nomeTamagotchi = prompt("Digite o nome do seu Tamagotchi:");
    resgatarNome();
    localStorage.setItem("tamagotchiStatus", JSON.stringify(tamagotchiStatus));
  } else {
    tamagotchiStatus = JSON.parse(tamagotchiStatus);
  }
  document.getElementById("tamagotchiNome").textContent = nomeTamagotchi;
  return { tamagotchiStatus, nomeTamagotchi };
}
