
/* =====================================
   1. ELEMENTS
===================================== */

// HALAMAN
const page0 = document.getElementById("page0");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const pages = [page0, page1, page2];


// TOMBOL NAVIGASI
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");


// TOMBOL TEMA
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");


// MUSIK
const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");


// SLIDESHOW
const memorySlideImage = document.getElementById("memorySlideImage");
const memorySlideCaption = document.getElementById("memorySlideCaption");

const slideCounter = document.getElementById("slideCounter");
const slideProgressFill = document.getElementById("slideProgressFill");

const prevMemoryButton = document.getElementById("prevMemoryButton");
const nextMemoryButton = document.getElementById("nextMemoryButton");

const slideshowWrapper = document.querySelector(".slideshow-wrapper");


/* =====================================
   2. PAGE NAVIGATION
===================================== */

function showPage(pageNumber) {

  // Sembunyikan seluruh halaman
  pages.forEach(page => {
    page.classList.remove("active");
  });


  // Cari halaman yang akan ditampilkan
  const selectedPage = document.getElementById(`page${pageNumber}`);

  if (!selectedPage) return;


  // Tampilkan halaman terpilih
  selectedPage.classList.add("active");


  // Kembali ke posisi paling atas
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  // Atur slideshow berdasarkan halaman aktif
  if (pageNumber === 1) {

    startAutoSlide();

  } else {

    stopAutoSlide();

  }

}


// TOMBOL INTRO
startButton.addEventListener("click", () => {

  // Tampilkan music player
  document.body.classList.add("music-started");

  // Mulai musik melalui interaksi pengguna
  startMusic();

  // Buka halaman ulang tahun
  showPage(1);

});


// TOMBOL HALAMAN 1
nextButton.addEventListener("click", () => {

  showPage(2);

});


// TOMBOL HALAMAN 2
backButton.addEventListener("click", () => {

  showPage(1);

});


/* =====================================
   3. THEME TOGGLE
===================================== */

// Ambil tema yang pernah disimpan
let currentTheme = "dark";

try {

  const savedTheme = localStorage.getItem("birthdayTheme");

  if (savedTheme === "light" || savedTheme === "dark") {

    currentTheme = savedTheme;

  }

} catch (error) {

  console.warn("Penyimpanan tema tidak tersedia.", error);

}


// FUNGSI MENGATUR TEMA
function setTheme(theme) {

  currentTheme = theme;


  // Ubah atribut tema HTML
  document.documentElement.setAttribute(
    "data-theme",
    theme
  );


  // Simpan pilihan tema
  try {

    localStorage.setItem("birthdayTheme", theme);

  } catch (error) {

    console.warn("Tema tidak dapat disimpan.", error);

  }


  // Perbarui tombol tema
  if (theme === "dark") {

    themeIcon.textContent = "☀";
    themeText.textContent = "Tema terang";

  } else {

    themeIcon.textContent = "☾";
    themeText.textContent = "Tema gelap";

  }

}


// Terapkan tema awal
setTheme(currentTheme);


// EVENT TOMBOL TEMA
themeButton.addEventListener("click", () => {

  const newTheme =
    currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);

});


/* =====================================
   4. MUSIC PLAYER
===================================== */

// Volume awal
birthdayMusic.volume = 0.45;


// FORMAT WAKTU MENIT:DETIK
function formatTime(seconds) {

  if (!Number.isFinite(seconds) || seconds < 0) {

    return "00:00";

  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );

}


// UPDATE WAKTU MUSIK
function updateMusicTime() {

  currentTimeDisplay.textContent = formatTime(
    birthdayMusic.currentTime
  );

  durationTimeDisplay.textContent = formatTime(
    birthdayMusic.duration
  );

}


// UPDATE TOMBOL MUSIK
function updateMusicButton() {

  if (birthdayMusic.paused) {

    musicButton.textContent = "▶";

    musicButton.title = "Putar musik";

    musicButton.setAttribute(
      "aria-label",
      "Putar musik"
    );

  } else {

    musicButton.textContent = "Ⅱ";

    musicButton.title = "Jeda musik";

    musicButton.setAttribute(
      "aria-label",
      "Jeda musik"
    );

  }

}


// FUNGSI MEMULAI MUSIK
async function startMusic() {

  try {

    await birthdayMusic.play();

  } catch (error) {

    console.warn(
      "Musik belum dapat diputar:",
      error
    );

  }

  updateMusicButton();

}


// TOMBOL PLAY / PAUSE
musicButton.addEventListener("click", () => {

  if (birthdayMusic.paused) {

    startMusic();

  } else {

    birthdayMusic.pause();

  }

});


// EVENT AUDIO
birthdayMusic.addEventListener("play", updateMusicButton);

birthdayMusic.addEventListener("pause", updateMusicButton);

birthdayMusic.addEventListener("timeupdate", updateMusicTime);

birthdayMusic.addEventListener("loadedmetadata", updateMusicTime);

birthdayMusic.addEventListener("durationchange", updateMusicTime);


// SINKRONKAN TOMBOL KETIKA WEBSITE DIMUAT
updateMusicButton();

updateMusicTime();


/* =====================================
   5. MEMORY SLIDESHOW
===================================== */

// DAFTAR FOTO DAN TANGGAL
// Urutan: foto-1, foto-19, foto-18, ... foto-2

const memorySlides = [

  {
    src: "assets/images/foto-1.jpg",
    caption: "3 November 2026 - A SPECIAL DAY"
  },

  {
    src: "assets/images/foto-19.jpg",
    caption: "28 Oktober 2026 - MEMORY / 18"
  },

  {
    src: "assets/images/foto-18.jpg",
    caption: "27 Oktober 2026 - MEMORY / 17"
  },

  {
    src: "assets/images/foto-17.jpg",
    caption: "14 Oktober 2026 - MEMORY / 16"
  },

  {
    src: "assets/images/foto-16.jpg",
    caption: "25 Agustus 2026 - MEMORY / 15"
  },

  {
    src: "assets/images/foto-15.jpg",
    caption: "10 Agustus 2026 - MEMORY / 14"
  },

  {
    src: "assets/images/foto-14.jpg",
    caption: "20 Juni 2026 - MEMORY / 13"
  },

  {
    src: "assets/images/foto-13.jpg",
    caption: "30 April 2026 - MEMORY / 12"
  },

  {
    src: "assets/images/foto-12.jpg",
    caption: "15 April 2026 - MEMORY / 11"
  },

  {
    src: "assets/images/foto-11.jpg",
    caption: "09 April 2026 - MEMORY / 10"
  },

  {
    src: "assets/images/foto-10.jpg",
    caption: "12 Maret 2026 - MEMORY / 09"
  },

  {
    src: "assets/images/foto-9.jpg",
    caption: "10 Februari 2026 - MEMORY / 08"
  },

  {
    src: "assets/images/foto-8.jpg",
    caption: "1 Desember 2025 - MEMORY / 07"
  },

  {
    src: "assets/images/foto-7.jpg",
    caption: "10 Desember 2025 - MEMORY / 06"
  },

  {
    src: "assets/images/foto-6.jpg",
    caption: "10 Desember 2025 - MEMORY / 05"
  },

  {
    src: "assets/images/foto-5.jpg",
    caption: "02 Desember 2025 - MEMORY / 04"
  },

  {
    src: "assets/images/foto-4.jpg",
    caption: "05 Oktober 2025 - MEMORY / 03"
  },

  {
    src: "assets/images/foto-3.jpg",
    caption: "24 September 2025 - MEMORY / 02"
  },

  {
    src: "assets/images/foto-2.jpg",
    caption: "02 Januari 2025 - MEMORY / 01"
  }

];


/* =====================================
   6. SLIDESHOW SETTINGS
===================================== */

// Interval pergantian foto
// 3000 = 3 detik
// 4000 = 4 detik

const SLIDE_INTERVAL = 3000;


// Posisi foto saat ini
let currentMemoryIndex = 0;


// Mencegah hasil preload foto lama menimpa foto baru
let renderRequest = 0;


// Timer slideshow
let slideTimer = null;


/* =====================================
   7. RENDER SLIDE
===================================== */

function renderMemorySlide() {

  const memory = memorySlides[currentMemoryIndex];

  const requestId = ++renderRequest;


  // Efek pergantian foto
  memorySlideImage.classList.add("is-changing");


  // Preload foto berikutnya
  const preloader = new Image();


  preloader.onload = () => {

    // Abaikan hasil foto lama
    if (requestId !== renderRequest) return;


    // Ganti gambar
    memorySlideImage.src = memory.src;

    memorySlideImage.alt =
      `Foto kenangan ${currentMemoryIndex + 1}`;


    // Hilangkan efek transparan
    memorySlideImage.classList.remove("is-changing");

  };


  preloader.onerror = () => {

    if (requestId !== renderRequest) return;

    console.error(
      "Foto tidak ditemukan:",
      memory.src
    );

    memorySlideImage.classList.remove("is-changing");

  };


  preloader.src = memory.src;


  // UPDATE CAPTION
  memorySlideCaption.textContent = memory.caption;


  // UPDATE COUNTER
  const currentNumber = String(
    currentMemoryIndex + 1
  ).padStart(2, "0");

  const totalNumber = String(
    memorySlides.length
  ).padStart(2, "0");

  slideCounter.textContent =
    `${currentNumber} / ${totalNumber}`;


  // UPDATE PROGRESS BAR
  const progress =
    ((currentMemoryIndex + 1) / memorySlides.length) * 100;

  slideProgressFill.style.width = `${progress}%`;

}


/* =====================================
   8. AUTO SLIDESHOW
===================================== */

// MEMULAI SLIDESHOW OTOMATIS
function startAutoSlide() {

  // Hapus timer sebelumnya
  stopAutoSlide();


  // Jangan berjalan ketika halaman lain aktif
  if (!page1.classList.contains("active")) {

    return;

  }


  // Jangan berjalan ketika tab browser tersembunyi
  if (document.hidden) {

    return;

  }


  // Ganti foto secara otomatis
  slideTimer = setInterval(() => {

    changeMemorySlide(1, false);

  }, SLIDE_INTERVAL);

}


// MENGHENTIKAN SLIDESHOW
function stopAutoSlide() {

  if (slideTimer !== null) {

    clearInterval(slideTimer);

    slideTimer = null;

  }

}


/* =====================================
   9. CHANGE SLIDE
===================================== */

function changeMemorySlide(direction, resetTimer = true) {

  // Geser indeks foto
  currentMemoryIndex += direction;


  // Jika melewati foto terakhir
  if (currentMemoryIndex >= memorySlides.length) {

    currentMemoryIndex = 0;

  }


  // Jika mundur melewati foto pertama
  if (currentMemoryIndex < 0) {

    currentMemoryIndex = memorySlides.length - 1;

  }


  // Tampilkan foto baru
  renderMemorySlide();


  // Reset interval setelah interaksi manual
  if (resetTimer) {

    startAutoSlide();

  }

}


/* =====================================
   10. SLIDESHOW BUTTONS
===================================== */

// FOTO BERIKUTNYA
nextMemoryButton.addEventListener("click", () => {

  changeMemorySlide(1);

});


// FOTO SEBELUMNYA
prevMemoryButton.addEventListener("click", () => {

  changeMemorySlide(-1);

});


/* =====================================
   11. SWIPE SUPPORT
===================================== */

let touchStartX = 0;

let touchStartY = 0;


// Mencatat posisi awal sentuhan
slideshowWrapper.addEventListener("touchstart", (event) => {

  touchStartX = event.changedTouches[0].screenX;

  touchStartY = event.changedTouches[0].screenY;

}, { passive: true });


// Mendeteksi arah geseran
slideshowWrapper.addEventListener("touchend", (event) => {

  const touchEndX = event.changedTouches[0].screenX;

  const touchEndY = event.changedTouches[0].screenY;


  const differenceX = touchEndX - touchStartX;

  const differenceY = touchEndY - touchStartY;


  // Abaikan sentuhan pendek dan gerakan vertikal
  if (Math.abs(differenceX) < 50) return;

  if (Math.abs(differenceX) < Math.abs(differenceY)) return;


  if (differenceX < 0) {

    // Geser kiri = foto berikutnya
    changeMemorySlide(1);

  } else {

    // Geser kanan = foto sebelumnya
    changeMemorySlide(-1);

  }

}, { passive: true });


/* =====================================
   12. KEYBOARD NAVIGATION
===================================== */

document.addEventListener("keydown", (event) => {

  // Slideshow hanya aktif di halaman pertama
  if (!page1.classList.contains("active")) {

    return;

  }


  if (event.key === "ArrowRight") {

    changeMemorySlide(1);

  }


  if (event.key === "ArrowLeft") {

    changeMemorySlide(-1);

  }

});


/* =====================================
   13. BROWSER VISIBILITY
===================================== */

document.addEventListener("visibilitychange", () => {

  if (document.hidden) {

    // Hentikan slideshow ketika tab tidak terlihat
    stopAutoSlide();

  } else {

    // Jalankan kembali jika halaman pertama aktif
    if (page1.classList.contains("active")) {

      startAutoSlide();

    }

  }

});


/* =====================================
   14. INITIALIZE SLIDESHOW
===================================== */

// Tampilkan foto pertama
renderMemorySlide();
