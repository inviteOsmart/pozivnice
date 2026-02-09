/* =========================
AOS
========================= */
AOS.init({
  once: true,
  duration: 900,
  easing: 'ease-out-cubic'
});

/* =========================
COUNTDOWN (podesi datum/vreme ovde)
========================= */
/* 22.10.2026. u 20:00 */
const target = new Date("2026-10-22T20:00:00").getTime();

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function tickCountdown(){
  const diff = target - Date.now();
  if (diff <= 0) {
    dEl.textContent = "0";
    hEl.textContent = "0";
    mEl.textContent = "0";
    sEl.textContent = "0";
    return;
  }
  dEl.textContent = Math.floor(diff / 86400000);
  hEl.textContent = Math.floor(diff / 3600000) % 24;
  mEl.textContent = Math.floor(diff / 60000) % 60;
  sEl.textContent = Math.floor(diff / 1000) % 60;
}
tickCountdown();
setInterval(tickCountdown, 1000);

/* =========================
TYPING LOOP
========================= */
const texts = ["Miljana Savić", "18. rođendan"];
const el = document.getElementById("typedText");
let t = 0, c = 0, del = false;

function typing() {
  const txt = texts[t];

  if (!del) {
    el.textContent = txt.slice(0, ++c);
    if (c === txt.length) setTimeout(() => del = true, 1600);
  } else {
    el.textContent = txt.slice(0, --c);
    if (c === 0) {
      del = false;
      t = (t + 1) % texts.length;
    }
  }

  setTimeout(typing, del ? 80 : 180);
}
typing();

/* =========================
MUSIC PLAYER
========================= */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const musicUI = document.getElementById("musicUI");

function fmt(sec) {
  if (!isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = fmt(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = fmt(audio.currentTime);
});

progress.addEventListener("input", () => {
  if (isFinite(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

function setPlayState(isPlaying){
  if (isPlaying) {
    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    musicUI.classList.remove("paused");
  } else {
    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    musicUI.classList.add("paused");
  }
}

playBtn.addEventListener("click", async () => {
  try{
    if (audio.paused) {
      await audio.play();
      setPlayState(true);
    } else {
      audio.pause();
      setPlayState(false);
    }
  }catch(e){
    // autoplay/permission blocked – ignore
  }
});

/* Autoplay pokušaj (muted), pa korisnik klikom može da uključi zvuk */
window.addEventListener("load", async () => {
  audio.muted = false;
  try{
    await audio.play();
    setPlayState(true);
  }catch(e){
    setPlayState(false);
  }
});

/* =========================
MUTE / UNMUTE BUTTON (fixed)
========================= */
const muteBtn = document.createElement("button");
muteBtn.type = "button";
muteBtn.id = "muteToggle";
muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>';
document.body.appendChild(muteBtn);

function refreshMuteIcon(){
  muteBtn.innerHTML = audio.muted
    ? '<i class="bi bi-volume-mute"></i>'
    : '<i class="bi bi-volume-up"></i>';
}
refreshMuteIcon();

muteBtn.addEventListener("click", async () => {
  audio.muted = !audio.muted;
  refreshMuteIcon();
  if (!audio.muted && audio.paused) {
    try { await audio.play(); setPlayState(true); } catch(e) {}
  }
});

/* =========================
RSVP (demo submit)
========================= */
// const rsvpForm = document.getElementById("rsvpForm");
// const rsvpMsg = document.getElementById("rsvpMsg");

// rsvpForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   rsvpMsg.style.display = "block";
//   setTimeout(() => { rsvpMsg.style.display = "none"; }, 3500);
// });

/* =========================
BACK TO TOP
========================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 320) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// (function(){
//   emailjs.init("PUBLIC_KEY"); // ← samo ovo menjaš
// })();

// const form = document.getElementById("rsvpForm");
// const msg  = document.getElementById("rsvpMsg");

// form.addEventListener("submit", function(e){
//   e.preventDefault();

//   emailjs.send("service_morbzl6", "TEMPLATE_ID", {
//     name: form.name.value,
//     attendance: form.attendance.value,
//     guests: form.guests.value,
//     guest_names: form.guest_names.value,
//     invitation: "Soft Glow",
//     date: "22.10.2026.",
//     time: "20:00",
//     location: "Event Centar X, Beograd"
//   })
//   .then(() => {
//     msg.innerHTML = "💖 Hvala! Tvoja potvrda je uspešno poslata.";
//     msg.style.opacity = "1";
//     form.reset();
//   })
//   .catch(() => {
//     msg.innerHTML = "❌ Greška pri slanju. Pokušaj ponovo.";
//     msg.style.opacity = "1";
//   });
// });

/* =========================
FOTO ZID (Premium) + Lightbox + Like (LocalStorage)
========================= */
(function(){
  const wall = document.getElementById('photoWall');
  if (!wall) return;

  const toggleBtn = document.getElementById('toggleWall');
  const cards = Array.from(wall.querySelectorAll('.photo-card'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  // collapsed default
  wall.classList.add('collapsed');

  // polaroid random rotate
  cards.forEach((c, i) => {
    const rot = (Math.random() * 3 - 1.5).toFixed(2); // -1.5..+1.5
    c.style.setProperty('--rot', rot + 'deg');
  });

  // Like storage

  wall.addEventListener('click', (e) => {
  
    const card = e.target.closest('.photo-card');
    if (!card) return;

    // open lightbox
    currentIndex = cards.indexOf(card);
    openLightbox(currentIndex);
  });

  // toggle show more
  toggleBtn && toggleBtn.addEventListener('click', () => {
    const collapsed = wall.classList.toggle('collapsed');
    toggleBtn.textContent = collapsed ? 'Prikaži još' : 'Sakrij';
    if (!collapsed) wall.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  let currentIndex = 0;

  function openLightbox(idx){
    currentIndex = idx;
    const full = cards[currentIndex].getAttribute('data-full');
    lbImg.src = full;
    lightbox.classList.remove('d-none');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.add('d-none');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  function nav(delta){
    currentIndex = (currentIndex + delta + cards.length) % cards.length;
    const full = cards[currentIndex].getAttribute('data-full');
    lbImg.src = full;
  }

  lbClose && lbClose.addEventListener('click', closeLightbox);
  lbPrev && lbPrev.addEventListener('click', () => nav(-1));
  lbNext && lbNext.addEventListener('click', () => nav(+1));

  // close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('d-none')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(+1);
  });
})();

