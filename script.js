const languageToggle = document.getElementById("languageToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileNav = document.getElementById("mobileNav");

let currentLanguage = "en";

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "es" : "en";

    document.documentElement.lang = currentLanguage;

    const translatableElements = document.querySelectorAll("[data-en][data-es]");

    translatableElements.forEach((element) => {
      element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });

    languageToggle.textContent = currentLanguage === "en" ? "Español" : "English";
  });
}

if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
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
    text: "Christopher took the time to explain every step of the process and always made himself available when I had questions. I never felt like just another case."
  },
  {
    name: "Michael R., Cypress",
    text: "The communication was clear from the beginning. I always knew what was happening and what the next step would be."
  },
  {
    name: "Daniel P., Houston",
    text: "LeUnes Law Firm handled the insurance company and helped me understand the process after my accident."
  },
  {
    name: "Vanessa G., Katy",
    text: "I appreciated the personal attention and honest guidance. The team was responsive and professional throughout my case."
  },
  {
    name: "Robert T., Texas",
    text: "Christopher gave straightforward advice and helped me feel prepared during a stressful situation."
  },
  {
    name: "Amanda L., Houston",
    text: "The firm was organized, patient, and easy to reach whenever I had questions about my injury claim."
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
    if (textEl) textEl.textContent = review.text;
  });
}

let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");

if (testimonialCards.length) {
  updateTestimonials(testimonialIndex);

  const nextButtons = document.querySelectorAll(".testimonial-next");
  const prevButtons = document.querySelectorAll(".testimonial-prev");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex + 1) % leunesReviews.length;
      updateTestimonials(testimonialIndex);
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex - 1 + leunesReviews.length) % leunesReviews.length;
      updateTestimonials(testimonialIndex);
    });
  });

  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % leunesReviews.length;
    updateTestimonials(testimonialIndex);
  }, 4500);
}

const caseMoreButton = document.getElementById("caseMoreButton");
const extraCaseResults = document.getElementById("extraCaseResults");

if (caseMoreButton && extraCaseResults) {
  caseMoreButton.addEventListener("click", () => {
    const isHidden = extraCaseResults.hasAttribute("hidden");

    if (isHidden) {
      extraCaseResults.removeAttribute("hidden");
      caseMoreButton.textContent = "Show Less ⌃";
    } else {
      extraCaseResults.setAttribute("hidden", "");
      caseMoreButton.textContent = "See More ⌄";
    }
  });
}
