// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form loading - removed Google Forms functionality

// Smooth scrolling for any internal links
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

// Initialize EmailJS
(function() {
    // Ersätt med din EmailJS public key från dashboard
    emailjs.init("WsHBts0w-GfnSxrE3"); 
})();

// Custom form handling
async function sendEmail(data, formType) {
    try {
        // Kontrollera formulärtypen explicit
        const isTattoo = formType === 'tattoo';
        const isArt = formType === 'art';
        
        // Prepare email parameters
        const templateParams = {
            from_name: data.name || 'Ingen namn angiven',
            from_email: data.email || 'Ingen e-post angiven',
            phone: data.phone || 'Ingen telefon angiven',
            message: data.message || 'Inget meddelande',
            form_type: isTattoo ? 'Tatueringsförfrågan' : 'Konstförfrågan',
            to_email: isTattoo ? 'tatuering@silentshouttattoo.se' : 'konst@silentshouttattoo.se' // Specifik e-postadress beroende på formulärtyp
        };

        // Välj rätt template baserat på formulärtyp
        const templateId = isTattoo ? 'template_qwxplyf' : 'template_gxs76jx'; // Tattoo eller Art

        console.log('Sending email with template:', templateId, 'to:', templateParams.to_email);
        
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_fdwjoza',    // Ditt korrekta EmailJS service ID
            templateId,           // Rätt template ID beroende på formulärtyp
            templateParams
        );

        console.log('Email sent successfully:', response);
        alert(`Tack för din ${isTattoo ? 'tatueringsförfrågan' : 'konstförfrågan'}! Vi kontaktar dig så snart vi kan.`);
        return true;
        
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Något gick fel när meddelandet skulle skickas. Försök igen eller kontakta oss direkt.');
        return false;
    }
}

// Handle tattoo form submission
document.getElementById('tattooForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.type = 'tattoo';
    await sendEmail(data, 'tattoo');
    event.target.reset(); // Clear form after submission
});

// Handle art form submission
document.getElementById('artForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Art form submitted');
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.type = 'art'; // Sätt typen till 'art'
    console.log('Sending art form data:', data);
    await sendEmail(data, 'art'); // Använd 'art' som formType för konstförfrågan
    event.target.reset(); // Clear form after submission
});

// Form toggle functionality
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const formType = this.getAttribute('data-form');
        
        // Update active button
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Get forms
        const tattooForm = document.getElementById('tattooForm');
        const artForm = document.getElementById('artForm');
        
        // Show/hide forms
        if (formType === 'tattoo') {
            tattooForm.style.display = 'block';
            artForm.style.display = 'none';
        } else if (formType === 'art') {
            tattooForm.style.display = 'none';
            artForm.style.display = 'block';
        }
    });
});

// Scroll to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button based on scroll position
    function toggleScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) { // Show button after scrolling 300px from top
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Check if button is over dark sections and adjust color
        checkButtonBackground();
    }
    
    // Check if button is over dark background sections
    function checkButtonBackground() {
        const footer = document.querySelector('.social-footer');
        const philosophy = document.querySelector('.philosophy-section');
        
        if (footer || philosophy) {
            const footerRect = footer ? footer.getBoundingClientRect() : null;
            const philosophyRect = philosophy ? philosophy.getBoundingClientRect() : null;
            const buttonRect = scrollToTopBtn.getBoundingClientRect();
            
            const isOverDarkSection = 
                (footerRect && buttonRect.bottom > footerRect.top && buttonRect.top < footerRect.bottom) ||
                (philosophyRect && buttonRect.bottom > philosophyRect.top && buttonRect.top < philosophyRect.bottom);
            
            if (isOverDarkSection) {
                scrollToTopBtn.classList.add('light');
            } else {
                scrollToTopBtn.classList.remove('light');
            }
        }
    }
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Check scroll position on page load and scroll events
    toggleScrollButton();
    window.addEventListener('scroll', toggleScrollButton);
});

// Reviews Slider Functionality
// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerButton = document.getElementById('hamburgerButton');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburgerButton && mobileNav) {
        hamburgerButton.addEventListener('click', function() {
            hamburgerButton.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking navigation links
        const mobileNavLinks = document.querySelectorAll('#mobileNav .mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerButton.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    console.log('DOM loaded, initializing slider...');
    
    const reviewsTrack = document.querySelector('.reviews-track');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Reviews track:', reviewsTrack);
    console.log('Dots found:', dots.length);
    
    if (!reviewsTrack || dots.length === 0) {
        console.error('Slider elements not found!');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    const autoSlideInterval = 5000; // 5 seconds
    let autoSlideTimer;

    // Function to go to specific slide
    function goToSlide(slideIndex) {
        console.log('Going to slide:', slideIndex);
        currentSlide = slideIndex;
        const translateX = -(slideIndex * 10); // 10% per slide since each slide is 10% wide (100%/10)
        console.log('Translate X:', translateX + '%');
        reviewsTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('Dot clicked:', index);
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
    });

    // Pause auto-slide when hovering over the slider
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        reviewsSlider.addEventListener('mouseenter', stopAutoSlide);
        reviewsSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-slide
    console.log('Starting auto-slide...');
    startAutoSlide();
});

// Pricing Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const pricingToggle = document.getElementById('pricingToggle');
    const pricingToggleBottom = document.getElementById('pricingToggleBottom');
    const pricingContent = document.getElementById('pricingContent');
    
    function togglePricing() {
        const isActive = pricingContent.classList.contains('active');
        
        if (isActive) {
            // Close
            pricingContent.classList.remove('active');
            pricingToggle.classList.remove('active');
            pricingToggle.querySelector('span').textContent = 'Se prislista';
        } else {
            // Open
            pricingContent.classList.add('active');
            pricingToggle.classList.add('active');
            pricingToggle.querySelector('span').textContent = 'Dölj prislista';
        }
    }
    
    // Event listener för top-knappen
    if (pricingToggle && pricingContent) {
        pricingToggle.addEventListener('click', togglePricing);
    }
    
    // Event listener för bottom-knappen (collapse)
    if (pricingToggleBottom && pricingContent) {
        pricingToggleBottom.addEventListener('click', function() {
            // Endast stäng när bottom-knappen klickas
            pricingContent.classList.remove('active');
            pricingToggle.classList.remove('active');
            pricingToggle.querySelector('span').textContent = 'Se prislista';
        });
    }
});

// Mailto backup function - copy email to clipboard if mailto fails
function handleEmailClick(event) {
    // Get the email from the link's href attribute
    const emailLink = event.currentTarget.getAttribute('href');
    const email = emailLink.replace('mailto:', '');
    
    // Try to open mailto first
    setTimeout(() => {
        // If user is still on page after 100ms, mailto probably didn't work
        // Offer to copy email to clipboard instead
        if (navigator.clipboard) {
            if (confirm('E-postprogrammet kunde inte öppnas. Vill du kopiera e-postadressen till urklipp istället?')) {
                navigator.clipboard.writeText(email).then(() => {
                    alert('E-postadressen har kopierats till urklipp: ' + email);
                }).catch(() => {
                    prompt('Kopiera denna e-postadress:', email);
                });
            }
        } else {
            // Fallback for older browsers
            prompt('Kopiera denna e-postadress:', email);
        }
    }, 100);
}

// Add event listeners to all mailto links
document.addEventListener('DOMContentLoaded', function() {
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailtoLinks.forEach(link => {
        link.addEventListener('click', handleEmailClick);
    });
});
