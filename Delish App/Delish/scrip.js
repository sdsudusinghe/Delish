// HERO SLIDER
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let sliderInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (dots[i]) dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  if (slides.length > 0) {
    sliderInterval = setInterval(nextSlide, 4000);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 4000);
      });
    });
    showSlide(0);
  }

  // ANIMATED STATS COUNTER
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsStarted = false;

  function animateStats() {
    statNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 60);
      function update() {
        count += increment;
        if (count > target) count = target;
        num.textContent = count;
        if (count < target) {
          requestAnimationFrame(update);
        }
      }
      update();
    });
  }

  function isStatsVisible() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return false;
    const rect = statsSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }

  window.addEventListener('scroll', function() {
    if (!statsStarted && isStatsVisible()) {
      animateStats();
      statsStarted = true;
    }
  });

  // If stats are visible on load
  if (!statsStarted && isStatsVisible()) {
    animateStats();
    statsStarted = true;
  }

  // GALLERY LIGHTBOX
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox ? lightbox.querySelector('.close') : null;

  if (galleryImgs.length && lightbox && lightboxImg && closeBtn) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      });
    });
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
      }
    });
  }

  // BASIC FORM VALIDATION (Reservation & Contact)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  });
});