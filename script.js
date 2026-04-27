// ===================================
// CHATURBHUJ DIGITAL SCHOOL - JAVASCRIPT
// Ultra-Modern Interactive Features
// ===================================

(function() {
    'use strict';
    
    // === DOM ELEMENTS ===
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // === STICKY NAVBAR ON SCROLL ===
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // === BACK TO TOP BUTTON ===
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // === MOBILE MENU TOGGLE ===
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Animate hamburger
            const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
            if (isExpanded) {
                hamburgers[0].style.transform = 'rotate(45deg) translateY(8px)';
                hamburgers[1].style.opacity = '0';
                hamburgers[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                hamburgers[0].style.transform = 'none';
                hamburgers[1].style.opacity = '1';
                hamburgers[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                
                const hamburgers = mobileMenuToggle.querySelectorAll('.hamburger');
                hamburgers[0].style.transform = 'none';
                hamburgers[1].style.opacity = '1';
                hamburgers[2].style.transform = 'none';
            }
        });
    });
    
    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // === INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in-up class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // === ACTIVE NAV LINK ON SCROLL ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // === PARALLAX EFFECT FOR HERO SECTION ===
    function handleParallax() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        }
    }
    
    // === 3D TILT EFFECT ON CARDS ===
    function add3DTiltEffect() {
        const cards = document.querySelectorAll('.glass-card, .academic-card, .facility-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // === DYNAMIC COUNTER ANIMATION ===
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < numericValue) {
                        counter.textContent = Math.ceil(current) + (isPercentage ? '%' : '+');
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                // Only animate when counter is visible
                const counterObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && counter.textContent === target) {
                            counter.textContent = '0';
                            updateCounter();
                            counterObserver.unobserve(counter);
                        }
                    });
                }, { threshold: 0.5 });
                
                counterObserver.observe(counter);
            }
        });
    }
    
    // === GALLERY IMAGE LAZY LOADING ENHANCEMENT ===
    function enhanceGalleryImages() {
        const images = document.querySelectorAll('.gallery-image img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Add click to expand (simple version)
            img.addEventListener('click', function(e) {
                e.preventDefault();
                const overlay = this.closest('.gallery-item').querySelector('.gallery-overlay');
                if (overlay) {
                    overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
                }
            });
        });
    }
    
    // === NOTICE BOARD PAUSE ON HOVER ===
    function enhanceNoticeTicker() {
        const ticker = document.querySelector('.ticker-content');
        
        if (ticker) {
            ticker.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            ticker.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }
    
    // === TYPING EFFECT FOR HERO SUBTITLE ===
    function typeWriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        const speed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }
    
    // === SCROLL PROGRESS INDICATOR ===
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
        
        window.addEventListener('scroll', updateScrollProgress);
    }
    
    // === INITIALIZE ANIMATIONS ON LOAD ===
    function initializeAnimations() {
        // Add stagger animation to cards
        const cardGroups = [
            document.querySelectorAll('.academic-card'),
            document.querySelectorAll('.facility-card'),
            document.querySelectorAll('.why-card'),
            document.querySelectorAll('.gallery-item')
        ];
        
        cardGroups.forEach(cards => {
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
    
    // === ACCESSIBILITY ENHANCEMENTS ===
    function enhanceAccessibility() {
        // Add keyboard navigation for gallery
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const overlay = this.querySelector('.gallery-overlay');
                    if (overlay) {
                        overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
                    }
                }
            });
        });
        
        // Add focus visible styles
        const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #2563eb';
                this.style.outlineOffset = '2px';
            });
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // === PERFORMANCE OPTIMIZATION ===
    let scrollTimeout;
    let resizeTimeout;
    
    function optimizedScrollHandler() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleNavbarScroll();
                handleBackToTop();
                updateActiveNavLink();
                handleParallax();
                scrollTimeout = null;
            }, 10);
        }
    }
    
    function optimizedResizeHandler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                // Re-initialize animations if needed
                initializeAnimations();
                resizeTimeout = null;
            }, 250);
        }
    }
    
    // === EVENT LISTENERS ===
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('resize', optimizedResizeHandler);
    
    // === INITIALIZATION ON DOM CONTENT LOADED ===
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all features
        handleNavbarScroll();
        handleBackToTop();
        updateActiveNavLink();
        add3DTiltEffect();
        animateCounters();
        enhanceGalleryImages();
        enhanceNoticeTicker();
        createScrollProgress();
        initializeAnimations();
        enhanceAccessibility();
        
        // Optional: Add typing effect (commented out by default for performance)
        // typeWriterEffect();
        
        // Add loaded class to body for CSS transitions
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // === PRELOADER (OPTIONAL) ===
    window.addEventListener('load', function() {
        // Hide preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        
        // Add page loaded animation
        const heroGlassBox = document.querySelector('.hero-glass-box');
        if (heroGlassBox) {
            heroGlassBox.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
    
    // === ERROR HANDLING ===
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.message);
    });
    
    // === SERVICE WORKER REGISTRATION (OPTIONAL FOR PWA) ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered:', registration))
            //     .catch(error => console.log('SW registration failed:', error));
        });
    }
    
    // === CUSTOM CURSOR EFFECT (OPTIONAL) ===
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #2563eb;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });
        
        // Enlarge cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
            });
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // Uncomment to enable custom cursor (only on desktop)
    // if (window.innerWidth > 1024) {
    //     createCustomCursor();
    // }
    
    // === EASTER EGG - KONAMI CODE ===
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = 'none';
                    konamiIndex = 0;
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // === CONSOLE GREETING ===
    console.log('%c🎓 Chaturbhuj Digital School', 'font-size: 24px; font-weight: bold; color: #2563eb;');
    console.log('%cWebsite developed with ❤️ for modern education', 'font-size: 14px; color: #06b6d4;');
    console.log('%cVisit us at: Mehsana Maheshganj', 'font-size: 12px; color: #9ca3af;');
    
})();

// === UTILITY FUNCTIONS ===

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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Set cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Generate random ID
function generateId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate phone number (Indian format)
function isValidPhone(phone) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Random number between min and max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array shuffle
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
                         }
