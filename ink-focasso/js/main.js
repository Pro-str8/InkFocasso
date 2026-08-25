/* =========================================================
   INK_FOCASSO — Site behavior
   Sections:
   1. Mobile nav toggle
   2. Toast proximity message (runs only on index.html)
   3. Gallery render + lightbox   (runs only on index.html)
   4. Booking checklist gate      (runs only on booking.html)
   5. Copy booking template       (runs only on booking.html)
  ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* 1. Mobile nav toggle --------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

/* 2. Toast proximity message --------------------------------- */
const toast = document.getElementById("proximity-toast");
const toastClose = document.getElementById("toast-close");

if (toast) {
  setTimeout(function () {
    toast.classList.add("is-visible");
  }, 1200);
}
if (toastClose) {
  toastClose.addEventListener("click", function () {
    toast.classList.remove("is-visible");
  });
}

  /* 3. Gallery render + lightbox -------------------------------- */
  const galleryEl = document.getElementById("gallery");

  if (galleryEl && typeof galleryItems !== "undefined" && galleryItems.length > 0) {
    const emptyMsg = document.getElementById("gallery-empty");
    if (emptyMsg) emptyMsg.remove();

    galleryItems.forEach(function (item) {
      const button = document.createElement("button");
      button.className = "gallery-item";
      button.type = "button";
      button.setAttribute("aria-label", "Open: " + item.alt);

      let mediaEl;
      if (item.type === "video") {
        mediaEl = document.createElement("video");
        mediaEl.src = item.file;
        mediaEl.muted = true;
        mediaEl.playsInline = true;
        mediaEl.loop = true;
        mediaEl.addEventListener("mouseenter", function () { mediaEl.play(); });
        mediaEl.addEventListener("mouseleave", function () { mediaEl.pause(); });
      } else {
        mediaEl = document.createElement("img");
        mediaEl.src = item.file;
        mediaEl.alt = item.alt;
        mediaEl.loading = "lazy";
      }

      button.appendChild(mediaEl);

      if (item.type === "video") {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = "Video";
        button.appendChild(badge);
      }

      button.addEventListener("click", function () {
        openLightbox(item);
      });

      galleryEl.appendChild(button);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(item) {
    if (!lightbox || !lightboxContent) return;
    lightboxContent.innerHTML = "";

    let mediaEl;
    if (item.type === "video") {
      mediaEl = document.createElement("video");
      mediaEl.src = item.file;
      mediaEl.controls = true;
      mediaEl.autoplay = true;
    } else {
      mediaEl = document.createElement("img");
      mediaEl.src = item.file;
      mediaEl.alt = item.alt;
    }
    lightboxContent.appendChild(mediaEl);
    lightbox.hidden = false;
  }

  function closeLightbox() {
    if (!lightbox || !lightboxContent) return;
    lightbox.hidden = true;
    lightboxContent.innerHTML = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* 4. Booking checklist gate -------------------------------------- */
  const ruleInputs = document.querySelectorAll("[data-rule]");
  const checklistStatus = document.getElementById("checklist-status");
  const dmButton = document.getElementById("dm-button");

  if (ruleInputs.length > 0 && dmButton) {
    // Start locked.
    dmButton.setAttribute("aria-disabled", "true");
    dmButton.addEventListener("click", function (e) {
      if (dmButton.getAttribute("aria-disabled") === "true") {
        e.preventDefault();
      }
    });

    function updateChecklistState() {
      const allChecked = Array.from(ruleInputs).every(function (input) {
        return input.checked;
      });

      if (allChecked) {
        dmButton.removeAttribute("aria-disabled");
        if (checklistStatus) {
          checklistStatus.textContent = "All set. The Instagram link below is unlocked.";
          checklistStatus.classList.add("is-complete");
        }
      } else {
        dmButton.setAttribute("aria-disabled", "true");
        if (checklistStatus) {
          checklistStatus.textContent = "Check every box to unlock the booking link below.";
          checklistStatus.classList.remove("is-complete");
        }
      }
    }

    ruleInputs.forEach(function (input) {
      input.addEventListener("change", updateChecklistState);
    });
  }

  /* 5. Copy booking template ----------------------------------------- */
  const copyButton = document.getElementById("copy-template");
  const templateEl = document.getElementById("dm-template");
  const copyStatus = document.getElementById("copy-status");

  if (copyButton && templateEl) {
    copyButton.addEventListener("click", function () {
      const text = templateEl.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (copyStatus) copyStatus.textContent = "Copied.";
        }).catch(function () {
          if (copyStatus) copyStatus.textContent = "Couldn't copy. Select the text manually.";
        });
      } else {
        if (copyStatus) copyStatus.textContent = "Copy isn't supported here. Select the text manually.";
      }

      setTimeout(function () {
        if (copyStatus) copyStatus.textContent = "";
      }, 3000);
    });
  }
});