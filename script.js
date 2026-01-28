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
    "Nih ada hadiah buat lu",
    "Semoga suka ya manis! 🍬",
     { type: "image", id: "kucing1" },
      { type: "image", id: "kucing2" },
       { type: "image", id: "kucing3" },
       { type: "jumpscare" } // The END
  ];

  let currentMessage = 0;
  let messageInterval; // Store interval ID

   function showNextMessage() {
    // Sembunyikan semua gambar & teks
    document.querySelectorAll(".text-container img").forEach(img => {
      img.style.display = "none";
    });
    changetext.style.display = "none";

    // Jika sudah mencapai akhir playlist (jumpscare)
    if (currentMessage >= messages.length) {
        return; 
    }

    const current = messages[currentMessage];

    if (typeof current === "string") {
      changetext.style.display = "block";
      changetext.textContent = current;
    } else if (current.type === "image") {
      const imageElement = document.getElementById(current.id);
      if (imageElement) {
        imageElement.style.display = "block";
      }
    } else if (current.type === "jumpscare") {
        triggerJumpscare();
        return; // Stop looping
    }

    currentMessage = (currentMessage + 1);
  }

  function triggerJumpscare() {
      clearInterval(messageInterval); // Hentikan loop
      music.pause(); // Stop musik romantis
      
      const scream = document.getElementById("screamSound");
      const kagetImg = document.getElementById("kagetImg");

      // Play jumpscare
      if(scream) scream.play();
      if(kagetImg) kagetImg.style.display = "block";

      // Vibrasi kalo di HP
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

      // Tampilkan "Sorry" setelah 3 detik
      setTimeout(() => {
          if(kagetImg) kagetImg.style.display = "none";
          document.getElementById("apology-container").style.display = "flex";
      }, 3000);
  }


  startButton.addEventListener("click", () => {
    opening.style.display = "none";
    main.classList.add("show");
    music.play().catch((e) => {
        console.log("Auto-play failed:", e);
  });
    // Ganti teks pertama langsung
    showNextMessage();

    // Lanjutkan otomatis setiap 3 detik
    messageInterval = setInterval(showNextMessage, 3000);

    // Mulai animasi background (Love & Text)
    startBackgroundAnimations();
  });

  // Tombol Ulangi
  document.getElementById("restartBtn").addEventListener("click", () => {
      location.reload();
  });

  // Tombol Keluar (Tutup tab / redirect)
  document.getElementById("exitBtn").addEventListener("click", () => {
      window.close(); // Hanya jalan kalo dibuka via script
      // Alternatif redirect kalo window.close ga jalan
      window.location.href = "about:blank"; 
  });
});

function startBackgroundAnimations() {
  // --- Love Animation ---
  function createLove() {
    const love = document.createElement("img");
    love.src = "./gambar/love.png"; // Ganti dengan path gambar love kamu
    love.classList.add("love");

    const size = Math.random() * 20 + 20;
    love.style.width = `${size}px`;
    love.style.height = `${size}px`;

    love.style.left = `${Math.random() * 100}%`;

    // 💡 Durasi animasi diperpanjang: 10–20 detik
    const duration = Math.random() * 10 + 10; // 10s–20s
    love.style.animationDuration = `${duration}s`;

    love.style.opacity = Math.random();

    document.getElementById("love-container").appendChild(love);

    // 💡 Hapus setelah durasi + buffer
    setTimeout(() => {
      love.remove();
    }, duration * 1000 + 2000);
  }

  // 💡 Interval lebih lambat agar tidak terlalu padat
  setInterval(createLove, 1000);

  // --- Floating Text Animation ---
  const allTexts = Array.from(document.querySelectorAll(".layer1 p, .layer2 p, .layer3 p"));
  const lanes = [
    { top: '10%', leftRange: [10, 90] },  // atas
    { top: '30%', leftRange: [10, 90] },  // tengah atas
    { top: '50%', leftRange: [10, 90] },  // tengah
    { top: '70%', leftRange: [10, 90] },  // tengah bawah
    { top: '90%', leftRange: [10, 90] },  // bawah
  ];

  function getRandomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showRandomText() {
    const textEl = getRandomFrom(allTexts);
    const lane = getRandomFrom(lanes);

    // Reset style dulu
    textEl.style.display = "block";

    // Random left di dalam rentang lane
    const left = Math.random() * (lane.leftRange[1] - lane.leftRange[0]) + lane.leftRange[0];

    textEl.style.top = lane.top;
    textEl.style.left = `${left}%`;

    // Trigger ulang animasi
    textEl.style.animation = "none";
    void textEl.offsetWidth; // trigger reflow
    textEl.style.animation = "";
  }

  setInterval(showRandomText, 2000);
  
  // Tampilkan container text floating yang sebelumnya di-hide
  const floatingContainer = document.querySelector('.floating-text-layers');
  if(floatingContainer) {
      floatingContainer.style.display = "block";
  }
}