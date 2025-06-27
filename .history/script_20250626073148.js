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
