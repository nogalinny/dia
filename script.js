const envelope = document.getElementById("envelope");
const carta = document.getElementById("carta");
const fechar = document.getElementById("fechar");
const musica = document.getElementById("musica");
const musicaContainer = document.getElementById("musica-container");
const carrossel = document.getElementById("carrossel");
const foto = document.getElementById("foto");
const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");
const voltar = document.getElementById("voltar");

const fotos = [
  "foto1.jpeg", "foto2.jpeg", "foto3.jpeg", "foto4.jpg", "foto5.jpg", "foto6.jpg",
  "foto7.jpg", "foto8.jpg", "foto9.jpg", "foto10.jpg", "foto11.jpg", "foto12.jpg"
];
let indice = 0;

envelope.addEventListener("click", () => {
  carta.classList.remove("hidden");
  musica.play();
  musicaContainer.classList.remove("hidden");
  envelope.classList.add("hidden");
});

fechar.addEventListener("click", () => {
  carta.classList.add("hidden");
  musicaContainer.classList.add("hidden");
  carrossel.classList.remove("hidden");
  foto.src = fotos[indice];
});

proximo.addEventListener("click", () => {
  if (indice < fotos.length - 1) {
    indice++;
    foto.src = fotos[indice];
    if (indice === fotos.length - 1) {
      voltar.classList.remove("hidden");
    }
  }
});

anterior.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    foto.src = fotos[indice];
    voltar.classList.add("hidden");
  }
});

voltar.addEventListener("click", () => {
  carrossel.classList.add("hidden");
  envelope.classList.remove("hidden");
  indice = 0;
  voltar.classList.add("hidden");
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

// Cria corações a cada 800ms, até no máximo 5 por vez para manter leve
setInterval(() => {
  if (document.querySelectorAll(".heart").length < 5) {
    criarCoracao();
  }
}, 800);


window.addEventListener("load", () => {
  const musica = document.getElementById("musica");

  musica.play().catch(() => {
    document.addEventListener("click", () => {
      musica.play();
    }, { once: true });
  });
});
function voltarParaInicio() {
  carrossel.classList.add("hidden");
  carta.classList.add("hidden");
  musicaContainer.classList.add("hidden");
  envelope.classList.remove("hidden");
  indice = 0;
  foto.src = fotos[indice];
  musica.pause();
  musica.currentTime = 0;
}
