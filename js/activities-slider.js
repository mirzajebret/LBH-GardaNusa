  const activityImages = [
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(1).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(2).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(!3).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(4).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(!5).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(6).jpg',
    'https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/Galery/LBH-Gardanusa-Galery(7).jpg',
  ];

  const slider = document.getElementById('activities-slider');
  const dotsContainer = document.getElementById('activity-dots-container');
  const prevButton = document.getElementById('activity-prev-button');
  const nextButton = document.getElementById('activity-next-button');

  let currentIndex = 0;
  let autoplayInterval;
  const autoplayDelay = 3000; // 5 detik

  function renderImages() {
    slider.innerHTML = '';
    activityImages.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Kegiatan ${i + 1}`;
      img.className = 'object-contain w-full flex-shrink-0';
      img.style.width = '100%';
      img.style.flex = '0 0 100%';
      slider.appendChild(img);
    });
  }

  function renderDots() {
    dotsContainer.innerHTML = '';
    activityImages.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500 transition';
      if (i === currentIndex) dot.classList.add('bg-gardanusa-dark-red');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    renderDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % activityImages.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + activityImages.length) % activityImages.length;
    updateSlider();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Navigasi tombol
  prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  // Swipe gesture support (touchscreen)
  let startX = 0;
  let isSwiping = false;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 50) {
      isSwiping = false;
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      resetAutoplay();
    }
  });

  slider.addEventListener('touchend', () => {
    isSwiping = false;
  });

  // Init
  renderImages();
  updateSlider();
  startAutoplay();
