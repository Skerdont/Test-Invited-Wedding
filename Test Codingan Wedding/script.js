// 1. Ambil Nama Tamu dari Parameter URL (?to=Nama+Tamu)
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
const guestDisplay = document.getElementById('guest-display');
const guestInput = document.getElementById('guest-name');

if (guestName) {
    guestDisplay.textContent = guestName;
    // Otomatis isi kolom nama pada form RSVP
    if (guestInput) guestInput.value = guestName;
}

// 2. Buka Undangan & Putar Musik Otomatis
const openBtn = document.getElementById('open-btn');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

openBtn.addEventListener('click', () => {
    mainContent.classList.remove('hidden');
    musicToggle.classList.remove('hidden');
    mainContent.scrollIntoView({ behavior: 'smooth' });

    // Browser mengizinkan autoplay setelah user mengklik tombol
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
    }).catch((err) => {
        console.log("Audio gagal diputar otomatis:", err);
    });
});

// Kontrol Tombol Musik Melayang
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔇';
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎵';
    }
    isPlaying = !isPlaying;
});

// 3. Hitung Mundur (Countdown)
const weddingDate = new Date("Dec 12, 2026 10:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Acara Sedang Berlangsung";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = 
        `${days} Hari : ${hours} Jam : ${minutes} Menit`;
}, 1000);

// 4. Form Ucapan Sederhana
const rsvpForm = document.getElementById('rsvp-form');
const wishesList = document.getElementById('wishes-list');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guest-name').value;
    const status = document.getElementById('attendance').value;
    const wish = document.getElementById('wishes').value;

    const item = document.createElement('div');
    item.classList.add('wish-item');
    item.innerHTML = `<strong>${name}</strong> (${status})<p>${wish}</p>`;
    
    wishesList.prepend(item);
    rsvpForm.reset();
});