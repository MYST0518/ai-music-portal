// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Basic Fade-in effect for dynamic elements if needed
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});
