/* =========================
AOS
========================= */
AOS.init({
    once: true,
    duration: 900,
    easing: 'ease-out-cubic'
});

/* =========================
COUNTDOWN
========================= */
const target = new Date("2026-07-20T20:00:00").getTime();

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

setInterval(() => {
const diff = target - Date.now();
if (diff > 0) {
    dEl.textContent = Math.floor(diff / 86400000);
    hEl.textContent = Math.floor(diff / 3600000) % 24;
    mEl.textContent = Math.floor(diff / 60000) % 60;
    sEl.textContent = Math.floor(diff / 1000) % 60;
}
}, 1000);

/* =========================
TYPING LOOP
========================= */
const texts = ["Bogdan Milojević", "18. rođendan"];
const el = document.getElementById("typedText");

let t = 0, c = 0, del = false;

function typing() {
const txt = texts[t];

if (!del) {
    el.textContent = txt.slice(0, ++c);
    if (c === txt.length) setTimeout(() => del = true, 1800);
} else {
    el.textContent = txt.slice(0, --c);
    if (c === 0) {
    del = false;
    t = (t + 1) % texts.length;
    }
}

setTimeout(typing, del ? 90 : 220);
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

/* format time */
function fmt(t) {
const m = Math.floor(t / 60);
const s = Math.floor(t % 60).toString().padStart(2, "0");
return `${m}:${s}`;
}

/* metadata */
audio.addEventListener("loadedmetadata", () => {
durationEl.textContent = fmt(audio.duration);
});

/* time update */
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = fmt(audio.currentTime);
});

/* seek */
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

playBtn.textContent = "❚❚";

const musicUI = document.getElementById("musicUI");

playBtn.onclick = () => {
if(audio.paused){
    audio.play();
    playBtn.textContent = "❚❚";
    musicUI.classList.remove("paused");
}else{
    audio.pause();
    playBtn.textContent = "▶";
    musicUI.classList.add("paused");
}
};

/* =========================
AUTOPLAY ON LOAD (MUTED)
========================= */
window.addEventListener("load", () => {
    audio.muted = false;
    audio.play().catch(() => {});
});

/* =========================
MUTE / UNMUTE BUTTON
========================= */
const muteBtn = document.createElement("button");
muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>';
muteBtn.id = "muteToggle";

document.body.appendChild(muteBtn);

/* toggle mute */
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;

    if (!audio.muted) {
        audio.play();
        muteBtn.innerHTML = '<i class="bi bi-volume-up"></i>';
    } else {
        muteBtn.innerHTML = '<i class="bi bi-volume-mute"></i>';
    }
});