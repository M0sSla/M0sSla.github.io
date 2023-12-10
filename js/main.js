const iconMenu = document.querySelector('.menu_icon');
if (iconMenu) {
    const menuBody = document.querySelector('.menu');
    const absoluteBody = document.body;
    iconMenu.addEventListener("click", function(e) {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        absoluteBody.classList.toggle('_lock')
    })
    const navLinks = document.querySelectorAll('.nav_link');
    for (let navLink of navLinks) {
        navLink.addEventListener("click", function(e) {
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
            absoluteBody.classList.remove('_lock')
        })
    }
}