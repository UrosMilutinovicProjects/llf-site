const languageToggle = document.getElementById("languageToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileNav = document.getElementById("mobileNav");

let currentLanguage = window.localStorage.getItem("leunesLanguage") || "en";

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = currentLanguage;

  const translatableElements = document.querySelectorAll("[data-en][data-es]");

  translatableElements.forEach((element) => {
    element.textContent = element.getAttribute(`data-${currentLanguage}`);
  });

  const translatablePlaceholders = document.querySelectorAll("[data-en-placeholder][data-es-placeholder]");

  translatablePlaceholders.forEach((element) => {
    element.placeholder = element.getAttribute(`data-${currentLanguage}-placeholder`);
  });

  if (languageToggle) {
    languageToggle.textContent = currentLanguage === "en" ? "Español" : "English";
  }
}

applyLanguage(currentLanguage);

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    window.localStorage.setItem("leunesLanguage", currentLanguage === "en" ? "es" : "en");
    applyLanguage(currentLanguage === "en" ? "es" : "en");

    if (typeof updateTestimonials === "function" && typeof testimonialIndex !== "undefined") {
      updateTestimonials(testimonialIndex);
    }

    if (caseMoreButton && extraCaseResults) {
      caseMoreButton.textContent = extraCaseResults.hasAttribute("hidden")
        ? (currentLanguage === "en" ? "See More ⌄" : "Ver Más ⌄")
        : (currentLanguage === "en" ? "Show Less ⌃" : "Ver Menos ⌃");
    }
  });
}

if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

const practiceAccordionItems = document.querySelectorAll(".pi-accordion-item");

practiceAccordionItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      practiceAccordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    }
  });
});

/* =========================
   Testimonials Carousel + Case Results Reveal
========================= */

const leunesReviews = [
  {
    name: "Sarah M., Houston",
    text: "Christopher took the time to explain every step of the process and always made himself available when I had questions. I never felt like just another case.",
    textEs: "Christopher se tomó el tiempo de explicar cada paso del proceso y siempre estuvo disponible cuando tuve preguntas. Nunca sentí que era solo un caso más."
  },
  {
    name: "Michael R., Cypress",
    text: "The communication was clear from the beginning. I always knew what was happening and what the next step would be.",
    textEs: "La comunicación fue clara desde el principio. Siempre supe qué estaba pasando y cuál sería el siguiente paso."
  },
  {
    name: "Daniel P., Houston",
    text: "LeUnes Law Firm handled the insurance company and helped me understand the process after my accident.",
    textEs: "LeUnes Law Firm se encargó de la aseguradora y me ayudó a entender el proceso después de mi accidente."
  },
  {
    name: "Vanessa G., Katy",
    text: "I appreciated the personal attention and honest guidance. The team was responsive and professional throughout my case.",
    textEs: "Aprecié la atención personal y la orientación honesta. El equipo fue receptivo y profesional durante todo mi caso."
  },
  {
    name: "Robert T., Texas",
    text: "Christopher gave straightforward advice and helped me feel prepared during a stressful situation.",
    textEs: "Christopher me dio consejos claros y me ayudó a sentirme preparado durante una situación estresante."
  },
  {
    name: "Amanda L., Houston",
    text: "The firm was organized, patient, and easy to reach whenever I had questions about my injury claim.",
    textEs: "La firma fue organizada, paciente y fácil de contactar cada vez que tuve preguntas sobre mi reclamo por lesiones."
  }
];

function updateTestimonials(startIndex = 0) {
  const cards = document.querySelectorAll(".testimonial-card");
  if (!cards.length) return;

  cards.forEach((card, position) => {
    const review = leunesReviews[(startIndex + position) % leunesReviews.length];
    const nameEl = card.querySelector(".testimonial-name");
    const textEl = card.querySelector("p:last-child");
    const starsEl = card.querySelector(".testimonial-stars");

    if (nameEl) nameEl.textContent = review.name;
    if (starsEl) starsEl.textContent = "★★★★★";
    if (textEl) textEl.textContent = currentLanguage === "es" ? review.textEs : review.text;
  });
}

let testimonialIndex = 0;
let testimonialTimer = null;
const testimonialCards = document.querySelectorAll(".testimonial-card");

function moveTestimonials(nextIndex) {
  if (!testimonialCards.length) return;

  testimonialCards.forEach((card) => card.classList.add("is-changing"));

  window.setTimeout(() => {
    testimonialIndex = (nextIndex + leunesReviews.length) % leunesReviews.length;
    updateTestimonials(testimonialIndex);
    testimonialCards.forEach((card) => card.classList.remove("is-changing"));
  }, 220);
}

function resetTestimonialTimer() {
  if (testimonialTimer) window.clearInterval(testimonialTimer);
  testimonialTimer = window.setInterval(() => {
    moveTestimonials(testimonialIndex + 1);
  }, 5200);
}

if (testimonialCards.length) {
  updateTestimonials(testimonialIndex);

  const nextButtons = document.querySelectorAll(".testimonial-next");
  const prevButtons = document.querySelectorAll(".testimonial-prev");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveTestimonials(testimonialIndex + 1);
      resetTestimonialTimer();
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveTestimonials(testimonialIndex - 1);
      resetTestimonialTimer();
    });
  });

  resetTestimonialTimer();
}

const caseMoreButton = document.getElementById("caseMoreButton");
const extraCaseResults = document.getElementById("extraCaseResults");

if (caseMoreButton && extraCaseResults) {
  caseMoreButton.addEventListener("click", () => {
    const isHidden = extraCaseResults.hasAttribute("hidden");

    if (isHidden) {
      extraCaseResults.removeAttribute("hidden");
      caseMoreButton.textContent = currentLanguage === "en" ? "Show Less ⌃" : "Ver Menos ⌃";
    } else {
      extraCaseResults.setAttribute("hidden", "");
      caseMoreButton.textContent = currentLanguage === "en" ? "See More ⌄" : "Ver Más ⌄";
    }
  });
}
