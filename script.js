console.log("Sprout & share script loaded");

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", function () {
    siteNav.classList.toggle("open");
    const isOpen = siteNav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

const filterButtons = document.querySelectorAll(".filterbuttons buttons");
const menuItems = document.querySelectorAll("#menu .menu-items");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;

        menuItems.forEach(function () {
            if (filter === "all" || menuItems.dataset.category === filter) {
                item.hidden = false;
            }else {
                item.hidden = true;
            }
        });
    });
});
