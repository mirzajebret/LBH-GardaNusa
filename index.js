document.addEventListener('DOMContentLoaded', function() {

    // Generic Slider Initializer
    function initSlider(containerId, slideClass, prevBtnId, nextBtnId, dotsId, dotClass, interval) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const slides = container.querySelectorAll(`.${slideClass}`);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer = dotsId ? document.getElementById(dotsId) : null;
        const dots = dotsContainer ? dotsContainer.querySelectorAll(`.${dotClass}`) : [];
        
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.add('hidden');
                if (i === index) {
                    slide.classList.remove('hidden');
                }
            });
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-white/50');
                    if (i === index) {
                        dot.classList.remove('bg-white/50');
                        dot.classList.add('bg-white');
                    }
                });
            }
            currentSlide = index;
        }

        function nextSlide() {
            const newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }

        function prevSlide() {
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newIndex);
        }
        
        function startSlider() {
            slideInterval = setInterval(nextSlide, interval);
        }
        
        function resetSliderInterval() {
             clearInterval(slideInterval);
             startSlider();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSliderInterval();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSliderInterval();
            });
        }

        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    showSlide(index);
                    resetSliderInterval();
                });
            });
        }
        
        showSlide(0);
        startSlider();
    }
    
    // Generic Tab Initializer
    function initTabs(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tabButtons = container.querySelectorAll('.tab-button');
        const tabContents = container.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.tabTarget;
                
                // Update button styles
                tabButtons.forEach(btn => {
                    btn.classList.remove('bg-[#855B2F]', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-stone-600', 'hover:bg-gray-200');
                });
                button.classList.add('bg-[#855B2F]', 'text-white');
                button.classList.remove('bg-gray-100', 'text-stone-600', 'hover:bg-gray-200');
                
                // Update content visibility
                tabContents.forEach(content => {
                    if (content.dataset.tabContent === targetId) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Hamburger Menu Initializer
    function initHamburgerMenu() {
        const hamburgerButton = document.getElementById('hamburger-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const openIcon = document.getElementById('hamburger-open');
        const closeIcon = document.getElementById('hamburger-close');

        if (hamburgerButton && mobileMenu && openIcon && closeIcon) {
            hamburgerButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                openIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });
        }
    }


    // Initialize all components
    initSlider('hero-slider-container', 'hero-slide', 'hero-prev', 'hero-next', 'hero-dots', 'hero-dot', 5000);
    initSlider('side-slider-container', 'side-slide', 'side-prev', 'side-next', null, null, 4000);
    initTabs('services-reports-section');
    initTabs('gallery-section');
    initTabs('sidebar-section');
    initHamburgerMenu();
    
    // Update copyright year
    const yearSpan = document.querySelector('footer .bg-\\[\\#3e3428\\] .text-stone-400');
    if (yearSpan) {
       yearSpan.innerHTML = `Hak Cipta &copy; ${new Date().getFullYear()} LBH Gardanusa. Semua hak dilindungi.`;
    }

});
