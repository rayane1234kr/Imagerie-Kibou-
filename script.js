// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add page transition class
    document.body.classList.add('page-transition');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formFields = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                examType: formData.get('examType'),
                preferredDate: formData.get('preferredDate'),
                message: formData.get('message')
            };

            // Basic validation
            if (!formFields.firstName || !formFields.lastName || !formFields.phone || 
                !formFields.email || !formFields.message) {
                showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formFields.email)) {
                showFormMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Phone validation (basic French phone number)
            const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
            if (!phoneRegex.test(formFields.phone.replace(/\s/g, ''))) {
                showFormMessage('Veuillez entrer un numéro de téléphone valide.', 'error');
                return;
            }

            // Simulate form submission
            simulateFormSubmission(formFields);
        });
    }

    // Smooth scrolling for internal links and page transitions
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Page transition effects for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                document.body.style.opacity = '0.7';
                document.body.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });

    // Initialize Google Maps (placeholder)
    initializeMap();

    // Add animation on scroll
    addScrollAnimations();
});

/**
 * Display form message
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

/**
 * Simulate form submission
 * @param {Object} formData - The form data
 */
function simulateFormSubmission(formData) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormMessage(
            'Votre demande a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.',
            'success'
        );
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Log form data (for development)
        console.log('Form submitted with data:', formData);
    }, 2000);
}

/**
 * Initialize Google Maps (placeholder implementation)
 */
function initializeMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // This is a placeholder. In a real implementation, you would:
        // 1. Load the Google Maps API
        // 2. Initialize the map with the clinic's coordinates
        // 3. Add a marker for the clinic location
        
        // For now, we'll just add a click handler to the placeholder
        mapElement.addEventListener('click', function() {
            alert('Google Maps integration would be implemented here with the clinic\'s actual address.');
        });
    }
}

/**
 * Add scroll animations
 */
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const fadeElements = document.querySelectorAll(
        '.service-card, .equipment-card, .expertise-card, .about-text, .about-image, .contact-item, .hours-item'
    );

    const slideElements = document.querySelectorAll(
        '.service-item, .emergency-item, .philosophy-item, .cabinet-content'
    );

    // Apply fade-in animation
    fadeElements.forEach((element, index) => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Apply slide-up animation
    slideElements.forEach((element, index) => {
        element.classList.add('slide-up');
        observer.observe(element);
    });

    // Animate section headers with delay
    const headers = document.querySelectorAll('h2, .hero-content h1');
    headers.forEach((header, index) => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
}

/**
 * Handle form field validation on blur
 */
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(field);
        });
    });
});

/**
 * Validate individual form field
 * @param {HTMLElement} field - The form field to validate
 */
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate required fields
    if (field.hasAttribute('required') && !fieldValue) {
        field.classList.add('error');
        return false;
    }
    
    // Validate email
    if (fieldName === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Validate phone
    if (fieldName === 'phone' && fieldValue) {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(fieldValue.replace(/\s/g, ''))) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

/**
 * Add error styling to CSS
 */
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
`;
document.head.appendChild(style);

/**
 * Handle page visibility for performance
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any heavy operations
        console.log('Page hidden - pausing operations');
    } else {
        // Page is visible, resume operations
        console.log('Page visible - resuming operations');
    }
});

/**
 * Utility function to format phone numbers
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number
 */
function formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as French phone number
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    
    return phoneNumber;
}

/**
 * Add phone number formatting to phone input
 */
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    }
});
