const swiper = new Swiper(".swiper", {
    effect: "fade",
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

const button = document.getElementById('first-button');

button.addEventListener('click', function() {
    document.getElementById("first-block").scrollIntoView({ behavior: 'smooth' });
});