// ================================
// MÚSICA DE FUNDO AUTOMÁTICA
// ================================

const bgMusic = document.getElementById("bgMusic");

// Autoplay (respeitando bloqueio do navegador)
window.addEventListener("load", () => {
  bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {
    document.body.addEventListener(
      "click",
      () => {
        bgMusic.play();
      },
      { once: true }
    );
  });
});

// ================================
// CONTROLE DO VÍDEO
// ================================

const assistirBtn = document.getElementById("assistirBtn");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");

// Abrir vídeo
assistirBtn.addEventListener("click", () => {
  bgMusic.pause();

  videoContainer.style.display = "flex";
  video.currentTime = 0;
  video.play();

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
});

// Fechar vídeo
function fecharVideo() {
  video.pause();
  video.currentTime = 0;
  videoContainer.style.display = "none";

  bgMusic.play().catch(() => {});
}

// Ao terminar o vídeo
video.addEventListener("ended", fecharVideo);

// Ao sair do fullscreen
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fecharVideo();
  }
});

// Ao trocar de aba
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    bgMusic.pause();
  } else {
    bgMusic.play().catch(() => {});
  }
});
