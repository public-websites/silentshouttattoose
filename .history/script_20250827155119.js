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
        // Prepare email parameters
        const templateParams = {
            from_name: data.name || 'Ingen namn angiven',
            from_email: data.email || 'Ingen e-post angiven',
            phone: data.phone || 'Ingen telefon angiven',
            message: data.message || 'Inget meddelande',
            form_type: formType === 'tattoo' ? 'Tatueringsförfrågan' : 'Konstförfrågan',
            to_email: 'silentshouttattoo@gmail.com' // Din Gmail-adress
        };

        // Välj rätt template baserat på formulärtyp
        const templateId = formType === 'tattoo' ? 'template_qwxplyf' : 'template_gxs76jx';

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_fxu5ad2',    // Din EmailJS service ID
            templateId,           // Rätt template ID beroende på formulärtyp
            templateParams
        );

        console.log('Email sent successfully:', response);
        alert(`Tack för din ${formType === 'tattoo' ? 'tatueringsförfrågan' : 'konstförfrågan'}! Vi kontaktar dig så snart vi kan.`);
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
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.type = 'art';
    await sendEmail(data, 'art');
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
