document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function() {
        const frame = document.querySelector('.frame');
        frame.classList.remove('hidden');
        frame.classList.add('visible');
    });
});
