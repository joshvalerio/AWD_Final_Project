document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('[data-slider-container]');
    let slides = sliderContainer.querySelectorAll('.slider-item');
    const nextButton = document.querySelector('[data-slider-next]');
    const prevButton = document.querySelector('[data-slider-prev]');
  
    // Function to disable transition temporarily
    function disableTransition() {
      sliderContainer.style.transition = 'none';
    }
  
    // Function to enable transition for smooth sliding
    function enableTransition() {
      sliderContainer.style.transition = 'transform 0.5s ease';
    }
  
    function moveToNextSlide() {
      disableTransition(); // Disable transition for immediate effect
      const firstSlide = slides[0];
      sliderContainer.appendChild(firstSlide); // Move the first slide to the end
      slides = sliderContainer.querySelectorAll('.slider-item'); // Update slides NodeList
  
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        enableTransition(); // Re-enable transition for smooth sliding
        sliderContainer.style.transform = `translateX(-${firstSlide.offsetWidth}px)`; // Move to the next slide
      }) ;
    }
  
    function moveToPrevSlide() {
      disableTransition(); // Disable transition for immediate effect
      const lastSlide = slides[slides.length - 1];
      sliderContainer.insertBefore(lastSlide, slides[0]); // Move the last slide to the beginning
      slides = sliderContainer.querySelectorAll('.slider-item'); // Update slides NodeList
  
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        enableTransition(); // Re-enable transition for smooth sliding
        sliderContainer.style.transform = `translateX(${lastSlide.offsetWidth}px)`; // Move to the previous slide
      });
    }
  
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
  });
  