const envelope = document.getElementById("envelope");
const carta = document.getElementById("carta");
const musica = document.getElementById("musica");
const musicaContainer = document.getElementById("musica-container");
const carrossel = document.getElementById("carrossel");
const foto = document.getElementById("foto");
const voltar = document.getElementById("voltar");
const tituloInicial = document.getElementById("titulo-inicial");
const tituloSubstituto = document.getElementById("titulo-substituto");
const voltarInicio = document.getElementById("voltar-inicio");
const btnPlayPause = document.getElementById("btn-play-pause");

const fotos = [
  "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.JPG", "foto6.jpg",
  "foto7.JPG", "foto8.JPG", "foto9.JPG", "foto10.JPG", "foto11.jpg", "foto12.JPG"
];
let indice = 0;
let intervaloCarrossel;
let inicioX = null;
function mostrarFoto(i) {
  foto.src = fotos[i];
}
// Função para avançar uma foto
function proximaFoto() {
  indice = (indice + 1) % fotos.length;
  mostrarFoto(indice);
}
// Swipe handlers
carrossel.addEventListener("touchstart", (e) => {
  inicioX = e.touches[0].clientX;
});

carrossel.addEventListener("touchmove", (e) => {
  if (!inicioX) return;
  let movimentoX = e.touches[0].clientX;
  let diferenca = inicioX - movimentoX;

  // Se movimento maior que 50px para esquerda ou direita
  if (diferenca > 50) {
    proximaFoto();
    inicioX = null;
  } else if (diferenca < -50) {
    indice = (indice - 1 + fotos.length) % fotos.length;
    mostrarFoto(indice);
    inicioX = null;
  }
});

envelope.addEventListener("click", () => {
  carta.classList.remove("hidden");
  carrossel.classList.remove("hidden");
  envelope.classList.add("hidden");
  tituloInicial.classList.add("hidden");
  tituloSubstituto.classList.remove("hidden");
  document.getElementById("voltar-inicio").classList.remove("hidden");// <<< AQUI
  document.getElementById("compartilhando").classList.remove("hidden");
  document.getElementById("foto-versiculo").classList.remove("hidden");
  mostrarFoto(indice);
  musica.play();
  musicaContainer.classList.remove("hidden");
  document.getElementById("versiculo").classList.remove("hidden");

  intervaloCarrossel = setInterval(proximaFoto, 1500);
});

btnPlayPause.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    btnPlayPause.textContent = "⏸️";
  } else {
    musica.pause();
    btnPlayPause.textContent = "▶️";
  }
});

function criarCoracao() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

setInterval(() => {
  if (document.querySelectorAll(".heart").length < 5) {
    criarCoracao();
  }
}, 800);

document.addEventListener("click", () => {
  if (musica.paused) musica.play();
}, { once: true });

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    musica.pause();
  } else {
    musica.play();
  }
});

document.addEventListener("DOMContentLoaded", () => {


  voltarInicio.addEventListener("click", () => {
    carta.classList.add("hidden");
    carrossel.classList.add("hidden");
    envelope.classList.remove("hidden");
    tituloInicial.classList.remove("hidden");
    tituloSubstituto.classList.add("hidden");
    voltarInicio.classList.add("hidden");
    musica.pause();
    musica.currentTime = 0;
    musicaContainer.classList.add("hidden");
    document.getElementById("versiculo").classList.add("hidden");
    document.getElementById("compartilhando").classList.add("hidden");
    document.getElementById("foto-versiculo").classList.add("hidden");
    clearInterval(intervaloCarrossel);
  });
});