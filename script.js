document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const opening = document.querySelector(".opening-container");
  const main = document.getElementById("main");
  const changetext = document.getElementById("changetext");
  const music = document.getElementById("bgMusic");

  const messages = [
    "Halo Can! 👋",
    "Kamu lagi apaaa",
    "Tau ga sih?",
    "Hari ini lu keliatan...",
    "CANTIK BANGET! 😍",
    "Jangan geer dulu tapi...",
    "Eh tapi emang beneran cantik deng wkwk",
    "Maaf alay dikit!",
    "Bisa ga sih liat kamu skrg",
    "hampir pingsan nih",
    "butuh vitamin U wkwk",
    { type: "image", id: "kucing1" },
    { type: "image", id: "kucing2" },
    { type: "image", id: "kucing3" },
    "See you next time! ❤️",
  ];

  let currentMessage = 0;
  let messageInterval;

  function showNextMessage() {
    // Sembunyikan semua gambar & teks
    document.querySelectorAll(".text-container img").forEach((img) => {
      img.style.display = "none";
    });
    changetext.style.display = "none";

    // Loop logic
    if (currentMessage >= messages.length) {
      currentMessage = 0;
    }

    const current = messages[currentMessage];

    if (typeof current === "string") {
      changetext.style.display = "block";
      changetext.textContent = current;

      // Reset Animasi agar main lagi setiap ganti teks
      changetext.style.animation = "none";
      changetext.offsetHeight; /* trigger reflow */
      changetext.style.animation = "fadeSlideUp 2s ease";
    } else if (current.type === "image") {
      const imageElement = document.getElementById(current.id);
      if (imageElement) {
        imageElement.style.display = "block";
        imageElement.style.animation = "none";
        imageElement.offsetHeight;
        imageElement.style.animation = "zoomFade 2s ease";
      }
    }

    currentMessage = currentMessage + 1;
  }

  startButton.addEventListener("click", () => {
    opening.style.display = "none";
    main.classList.add("show");
    music.play().catch((e) => {
      console.log("Auto-play failed:", e);
    });

    showNextMessage();

    // Lanjutkan otomatis setiap 5 detik
    messageInterval = setInterval(showNextMessage, 5000);

    // Mulai animasi background (Love & Text)
    startBackgroundAnimations();
  });
});

function startBackgroundAnimations() {
  // --- Love Animation ---
  function createLove() {
    const love = document.createElement("img");
    love.src = "./gambar/love.png";
    love.classList.add("love");

    const size = Math.random() * 20 + 20;
    love.style.width = `${size}px`;
    love.style.height = `${size}px`;

    love.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 15;
    love.style.animationDuration = `${duration}s`;

    love.style.opacity = Math.random() * 0.7;

    document.getElementById("love-container").appendChild(love);

    setTimeout(
      () => {
        love.remove();
      },
      duration * 1000 + 2000,
    );
  }

  setInterval(createLove, 1500);

  // --- Improved Floating Text Animation (Bubbling) ---
  const allTexts = Array.from(
    document.querySelectorAll(".layer1 p, .layer2 p, .layer3 p"),
  );

  // Hide all initially
  allTexts.forEach((p) => (p.style.display = "none"));

  // Jalur HORIZONTAL yang tersedia (persentase left)
  // Agar nyebar dari kiri ke kanan: 5%, 20%, 35%, ..., 90%
  const lanes = [5, 20, 35, 50, 65, 80, 95];
  let availableLanes = [...lanes];

  function spawnText() {
    // Kalau semua penuh, tunggu next cycle
    if (availableLanes.length === 0) {
      return;
    }

    const textEl = allTexts[Math.floor(Math.random() * allTexts.length)];

    // Pick lane (posisi X)
    const laneIndex = Math.floor(Math.random() * availableLanes.length);
    const leftPos = availableLanes[laneIndex];

    // Lepas dari pool
    availableLanes.splice(laneIndex, 1);

    // Reset element
    textEl.style.display = "block";
    textEl.style.left = `${leftPos}%`;

    // Set posisi start (bawah layar) via CSS sudah dihandle, tapi kita reset lagi
    textEl.style.bottom = "-10%";
    textEl.style.top = "auto"; // Pastikan top unset agar bottom works

    textEl.style.animation = "none";
    textEl.offsetHeight;

    // Random Duration for Bubble Rise (perlahan)
    const speed = Math.random() * 5 + 10; // 10s - 15s naik ke atas
    textEl.style.animation = `bubbleFloat ${speed}s ease-in forwards`;

    // Free up lane lebih cepat daripada durasi animasi,
    // karena bubble naik jadi lane bawahnya kosong lagi setelah bbrp detik
    setTimeout(() => {
      availableLanes.push(leftPos);
    }, 4000);

    // Hide after animation finishes
    setTimeout(() => {
      textEl.style.display = "none";
    }, speed * 1000);
  }

  // Spawn lebih sering karena bubble biasanya banyak
  setInterval(spawnText, 2500);

  const floatingContainer = document.querySelector(".floating-text-layers");
  if (floatingContainer) {
    floatingContainer.style.display = "block";
  }
}
