'use strict';

document.getElementById("registerBtn").addEventListener("click", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Validate email format
  var emailInput = document.getElementById("emailInput").value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput)) {
      alert("Please enter a valid email address.");
      return; // Stop further execution
  }
  
  // Redirect to home.html if email format is valid
  window.location.href = "home.html";
});

/**
 * HEADER & BACK TOP BTN
 * header and back top btn visible when window scroll down to 200px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * SLIDER
 */

const sliderContainer = currentSlider.querySelector("[data-slider-container]");

const moveSliderItem = function () {
  const slideWidth = sliderContainer.clientWidth; // Width of each slide
  sliderContainer.scrollLeft = currentSlidePos * slideWidth; // Scroll to the position of the current slide
}

const totalSliderVisibleItems = 1; // Show one item per slide

let currentSlidePos = 0;

/**
 * NEXT SLIDE
 */
const slideNext = function () {
  currentSlidePos++;
  if (currentSlidePos >= totalSliderItems) {
    currentSlidePos = 0; // Reset to the first slide if reached the end
  }
  moveSliderItem();
}

/**
 * PREVIOUS SLIDE
 */
const slidePrev = function () {
  currentSlidePos--;
  if (currentSlidePos < 0) {
    currentSlidePos = totalSliderItems - 1; // Go to the last slide if reached the beginning
  }
  moveSliderItem();
}

/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion;

const accordionInit = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  accordionBtn.addEventListener("click", function () {

    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      currentAccordion.classList.add("active");
    }

    lastActiveAccordion = currentAccordion;

  });

}

for (let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }