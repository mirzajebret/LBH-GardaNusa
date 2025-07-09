

    // --- Hero Carousel ---
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const upNextData = [ // Data for the "UP NEXT" card, indexed by the CURRENTLY active slide
            { 
                title: "Layanan hukum luas untuk segala kebutuhan.", 
                thumbnail: "https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/hukum-perdata.webp",
            },
            { 
                title: "Garda terdepan dalam membela hak-hak anda.",
                thumbnail: "https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/hukum-bisnis.webp"
            },
            { 
                title: "LBH Garda Nusa: Keadilan untuk Semua.",
                thumbnail: "https://raw.githubusercontent.com/mirzajebret/LBH-GardaNusa/refs/heads/main/img/LBH-Gardanusa.webp"
            }
        ];

        const heroSlides = document.querySelectorAll('#hero-slides .hero-slide');
        const upNextCard = document.getElementById('up-next-card');
        const upNextTitle = document.getElementById('up-next-title');
        const upNextThumbnail = document.getElementById('up-next-thumbnail');
        const progressBars = document.querySelectorAll('#progress-bars .progress-bar');
        
        let currentSlideIndex = 0;
        const slideIntervalTime = 5000;
        let heroInterval;

        function showSlide(newIndex) {
            if (!heroSlides.length || !progressBars.length) return;
            
            const index = (newIndex + heroSlides.length) % heroSlides.length;

            // Deactivate previous slide and progress bar
            heroSlides[currentSlideIndex].style.opacity = '0';
            const prevProgressBar = progressBars[currentSlideIndex];
            prevProgressBar.classList.remove('active');

            // Set new index
            currentSlideIndex = index;
            
            // Activate new slide
            heroSlides[currentSlideIndex].style.opacity = '1';

            // Restart animation on the new progress bar
            const currentProgressBar = progressBars[currentSlideIndex];
            currentProgressBar.classList.remove('active');
            void currentProgressBar.offsetWidth; // Force DOM reflow to restart animation
            currentProgressBar.classList.add('active');
            
            // Update 'Up Next' card
            const upNextInfo = upNextData[currentSlideIndex];
            upNextTitle.textContent = upNextInfo.title;
            upNextThumbnail.src = upNextInfo.thumbnail;
        }

        function startSlideShow() {
            stopSlideShow();
            heroInterval = setInterval(() => {
                showSlide(currentSlideIndex + 1);
            }, slideIntervalTime);
        }

        function stopSlideShow() {
            clearInterval(heroInterval);
        }

        if (heroSlides.length > 0 && upNextCard) {
            // Initial setup
            showSlide(0);
            startSlideShow();

            upNextCard.addEventListener('click', () => {
                showSlide(currentSlideIndex + 1);
                startSlideShow(); // Reset interval
            });
        }
    }


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Do not scroll for hero buttons that just trigger other functionality
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Animated Statistics Counter ---
    const statsSection = document.getElementById('statistics');
    const counters = document.querySelectorAll('.stat-counter');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;
        animated = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || "";
        counter.innerText = '0';

        const updateCounter = () => {
            const current = +counter.innerText.replace(/[^\d]/g, ''); // hilangkan simbol
            const increment = target / 200;

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}${suffix}`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = `${target}${suffix}`;
            }
        };

        updateCounter();
    });
};


    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
    
    // --- Testimonial Carousel ---
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (carousel && prevBtn && nextBtn) {
        const testimonials = carousel.children;
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            updateCarousel();
        });
    }


    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;

            console.log('Form Submitted:', { name, email, message });
            
            alert(`Terima kasih, ${name}! Pesan Anda telah kami terima. Kami akan segera menghubungi Anda melalui email di ${email}.`);
            
            contactForm.reset();
        });
    }

