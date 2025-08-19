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

// Form loading
function hideLoading() {
    document.getElementById('formLoading').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'block';
}

// Fallback for form loading
setTimeout(() => {
    if (document.getElementById('formLoading').style.display !== 'none') {
        document.getElementById('formLoading').innerHTML = 
            '<p>om formuläret inte visas, <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5F3VtygnRylmXwHNeTswBMIdDoRpoEf7FgPYu2_uIHeA4zQ/viewform" target="_blank" style="color: #2c2c2c; text-decoration: underline;">klicka här</a></p>';
    }
}, 10000);

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
async function sendEmail(data) {
    const response = await fetch('https://api.sendlayer.com/v1/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            to: 'silentshouttattoo@gmail.com',
            subject: `Ny förfrågan från ${data.name}`,
            text: `Namn: ${data.name}\nE-post: ${data.email}\nTelefon: ${data.phone}\nMeddelande: ${data.message}`
        })
    });

    if (response.ok) {
        alert('E-post skickad!');
    } else {
        alert('Ett fel uppstod vid skickandet av e-post.');
    }
}

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await sendEmail(data);
});

// Form toggle functionality
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const formType = this.getAttribute('data-form');
        
        // Update active button
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide forms
        const customForm = document.querySelector('.custom-form');
        const googleFormContainer = document.querySelector('.google-form-container');
        
        if (formType === 'custom') {
            customForm.style.display = 'block';
            googleFormContainer.style.display = 'none';
        } else {
            customForm.style.display = 'none';
            googleFormContainer.style.display = 'block';
            
            // Show Google Forms iframe if not already shown
            const iframe = document.getElementById('bookingForm');
            if (iframe.style.display === 'none') {
                document.getElementById('formLoading').style.display = 'block';
            }
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
