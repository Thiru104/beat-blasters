// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '1rem 0';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enquiry form handling
    const enquiryForm = document.getElementById('enquiryForm');
    const enquiryMessage = document.getElementById('enquiryMessage');
    const enquiryCategory = document.getElementById('enquiryCategory');
    const enquiryProgram = document.getElementById('enquiryProgram');
    
    // Program options for each category
    const programOptions = {
        dance: [
            'Western Dance',
            'Bollywood',
            'Hip Hop',
            'B-Boying',
            'Popping & Locking',
            'Folk Dance',
            'Bharatanatyam'
        ],
        art: [
            'Sketching',
            'Abacus',
            'Painting',
            'Water Colouring'
        ],
        fitness: [
            'Aerobics',
            'Zumba',
            'Martial Art',
            'Artistic Yoga'
        ],
        services: [
            'Movie Choreography',
            'Ad Shoot',
            'Corporate Choreography',
            'Dance Event',
            'Wedding & Sangeeth',
            'Dance Concerts',
            'YouTube Choreography'
        ]
    };
    
    // Populate program options based on category selection
    if (enquiryCategory) {
        enquiryCategory.addEventListener('change', function() {
            const selectedCategory = this.value;
            const programSelect = document.getElementById('enquiryProgram');
            
            // Clear existing options
            programSelect.innerHTML = '<option value="">Select Program</option>';
            
            if (selectedCategory && programOptions[selectedCategory]) {
                programOptions[selectedCategory].forEach(program => {
                    const option = document.createElement('option');
                    option.value = program.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = program;
                    programSelect.appendChild(option);
                });
            }
        });
    }
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Form validation
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const category = formData.get('category');
            
            // Clear previous messages
            enquiryMessage.innerHTML = '';
            enquiryMessage.className = '';
            
            // Validation
            if (!name || !email || !phone || !category) {
                showEnquiryMessage('Please fill in all required fields.', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showEnquiryMessage('Please enter a valid email address.', 'danger');
                return;
            }
            
            if (!isValidPhone(phone)) {
                showEnquiryMessage('Please enter a valid phone number.', 'danger');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Send form data
            fetch('php/enquiry.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showEnquiryMessage('Thank you! Your enquiry has been submitted successfully. We will contact you soon.', 'success');
                    enquiryForm.reset();
                    // Reset program options
                    if (enquiryProgram) {
                        enquiryProgram.innerHTML = '<option value="">Select Program</option>';
                    }
                } else {
                    showEnquiryMessage(data.message || 'Sorry, there was an error submitting your enquiry. Please try again.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showEnquiryMessage('Sorry, there was an error submitting your enquiry. Please try again.', 'danger');
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Form validation
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Clear previous messages
            formMessage.innerHTML = '';
            formMessage.className = '';
            
            // Validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'danger');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Send form data
            fetch('php/sendmail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showMessage(data.message || 'Sorry, there was an error sending your message. Please try again.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Sorry, there was an error sending your message. Please try again.', 'danger');
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            });
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation function
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Show message function for contact form
    function showMessage(message, type) {
        formMessage.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const alert = formMessage.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }
    }

    // Show message function for enquiry form
    function showEnquiryMessage(message, type) {
        enquiryMessage.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const alert = enquiryMessage.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }
    }

    // Add scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopButton);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to program and service cards
    const cards = document.querySelectorAll('.program-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const silhouettes = document.querySelectorAll('.silhouette');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            silhouettes.forEach((silhouette, index) => {
                silhouette.style.transform = `translateY(${rate + (index * 20)}px)`;
            });
        }
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add smooth reveal animations for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could be used for navigation
                console.log('Swiped left');
            } else {
                // Swipe right - could be used for navigation
                console.log('Swiped right');
            }
        }
    }

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll events
    const optimizedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 16);

    window.addEventListener('scroll', optimizedScrollHandler);
});

// === GSAP Advanced Animations ===
window.addEventListener('DOMContentLoaded', function() {
    // HERO TEXT BOUNCE IN
    if (window.gsap) {
        const heroHeading = document.querySelector('.hero-section h1');
        const heroLead = document.querySelector('.hero-section .lead');
        const heroBtns = document.querySelectorAll('.hero-section .hero-btn-anim');
        if (heroHeading && heroLead && heroBtns.length) {
            gsap.set([heroHeading, heroLead, heroBtns], {opacity: 0, y: 40});
            gsap.timeline({delay: 0.2})
                .to(heroHeading, {opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out'})
                .to(heroLead, {opacity: 1, y: 0, duration: 0.7, ease: 'power2.out'}, '-=0.4')
                .to(heroBtns, {opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)'}, '-=0.3');
        }
    }

    // CARDS CASCADING IN (Programs, Art, Fitness, Services)
    function gsapCascadeCards(sectionSelector, cardSelector) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;
        const cards = section.querySelectorAll(cardSelector);
        if (!cards.length) return;
        // Set initial state
        gsap.set(cards, {opacity: 0, y: 60, scale: 0.96});
        // Observer to trigger animation
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(cards, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                    observer.disconnect();
                }
            });
        }, {threshold: 0.15});
        observer.observe(section);
    }
    // Programs
    gsapCascadeCards('#programs', '.program-card');
    // Services
    gsapCascadeCards('#services', '.service-card');
});

// WhatsApp chatbot functionality
function openWhatsApp() {
    const phoneNumber = '7483283045'; // Replace with your actual WhatsApp number
    const message = 'Hi! I\'m interested in learning more about Beat Busters Dance Center programs. Can you provide me with more information?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Global function for WhatsApp (accessible from HTML)
window.openWhatsApp = openWhatsApp;

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e63946 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style); 