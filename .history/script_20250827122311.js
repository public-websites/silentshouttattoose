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

// Custom form handling
async function sendEmail(data, formType) {
    // Placeholder for email sending - replace with your actual email service
    console.log(`Sending ${formType} email:`, data);
    
    // Simulate email sending
    return new Promise((resolve) => {
        setTimeout(() => {
            alert(`Tack för din ${formType === 'tattoo' ? 'tatueringsförfrågan' : 'konstförfrågan'}! Vi kontaktar dig så snart vi kan.`);
            resolve(true);
        }, 1000);
    });
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

// Functions to show specific forms when header buttons are clicked
function showTattooForm() {
    // Update toggle buttons
    document.querySelector('[data-form="tattoo"]').classList.add('active');
    document.querySelector('[data-form="art"]').classList.remove('active');
    
    // Show tattoo form, hide art form
    document.getElementById('tattooForm').style.display = 'block';
    document.getElementById('artForm').style.display = 'none';
    
    // Update header button states
    document.querySelectorAll('.cta-header-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="showTattooForm()"]').classList.add('active');
}

function showArtForm() {
    // Update toggle buttons
    document.querySelector('[data-form="art"]').classList.add('active');
    document.querySelector('[data-form="tattoo"]').classList.remove('active');
    
    // Show art form, hide tattoo form
    document.getElementById('artForm').style.display = 'block';
    document.getElementById('tattooForm').style.display = 'none';
    
    // Update header button states
    document.querySelectorAll('.cta-header-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="showArtForm()"]').classList.add('active');
}

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
