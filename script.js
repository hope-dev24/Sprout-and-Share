const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", function () {
    siteNav.classList.toggle("open");
    const isOpen = siteNav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

const filterButtons = document.querySelectorAll(".filter-buttons button");
const menuItems = document.querySelectorAll("#menu .menu-item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;

        menuItems.forEach(function (item) {
            if (filter === "all" || item.dataset.category === filter) {
                item.hidden = false;
            }else {
                item.hidden = true;
            }
        });
    });
});
