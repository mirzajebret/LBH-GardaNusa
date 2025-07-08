
document.addEventListener('DOMContentLoaded', () => {

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
            counter.innerText = '0';

            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 200; // Animation speed

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
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

});
