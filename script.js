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
const iconeMusica = document.getElementById("icone-musica");

const fotos = [
  "foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.JPG", "foto6.jpg",
  "foto7.JPG", "foto8.JPG", "foto9.JPG", "foto10.JPG", "foto11.jpg", "foto12.JPG"
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
  musica.pause();
  musica.currentTime = 0;
});

iconeMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    musicaContainer.textContent = "🎵 Tocando...";
  } else {
    musica.pause();
    musicaContainer.textContent = "⏸️ Pausado";
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

window.addEventListener("load", () => {
  musica.play().catch(() => {
    document.addEventListener("click", () => {
      musica.play();
    }, { once: true });
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    musica.pause();
  } else {
    musica.play();
  }
});
