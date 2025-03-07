// Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !e.target.closest(".navbar") &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Random ID Generator
function generateRandomID() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Download Functionality
async function downloadThumbnail() {
  try {
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.classList.add("download-animation");

    setTimeout(() => {
      downloadBtn.classList.remove("download-animation");
    }, 400);

    const thumbnailUrl = document.getElementById("thumbnailPreview").src;
    const quality = document.getElementById("qualitySelect").value;
    const randomID = generateRandomID();

    const response = await fetch(thumbnailUrl);
    if (!response.ok) throw new Error("Failed to fetch thumbnail");

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `@GamerxZ_${randomID}_${quality}.jpg`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    alert(`Download failed: ${error.message}`);
  }
}

// Thumbnail Generation Logic
let currentVideoId = null;

function generateThumbnail() {
  const youtubeUrl = document.getElementById("youtubeUrl").value;
  currentVideoId = getVideoId(youtubeUrl);

  if (currentVideoId) {
    updateThumbnailQuality();
    document.getElementById("thumbnailContainer").classList.remove("hidden");
  } else {
    alert("Invalid YouTube URL! Please try again.");
  }
}

function updateThumbnailQuality() {
  if (!currentVideoId) return;

  const quality = document.getElementById("qualitySelect").value;
  const thumbnailUrl = `https://img.youtube.com/vi/${currentVideoId}/${quality}.jpg`;
  const thumbnailPreview = document.getElementById("thumbnailPreview");

  thumbnailPreview.src = "";
  thumbnailPreview.alt = "Loading...";
  thumbnailPreview.src = thumbnailUrl;

  document.getElementById("selectedQuality").textContent = `Selected Quality: ${
    document.getElementById("qualitySelect").options[
      document.getElementById("qualitySelect").selectedIndex
    ].text
  }`;

  thumbnailPreview.onerror = () => {
    thumbnailPreview.alt = "Thumbnail not available in this quality";
    alert("Thumbnail not available in selected quality! Try another option.");
  };
}

function getVideoId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Add this JavaScript at the end of your existing script
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item");
    const isActive = faqItem.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      faqItem.classList.add("active");
    }

    // Accessibility
    const answer = faqItem.querySelector(".faq-answer");
    answer.setAttribute("aria-expanded", !isActive);
  });
});
