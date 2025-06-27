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
