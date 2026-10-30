const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", function () {
    siteNav.classList.toggle("open");
    const isOpen = siteNav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const filterButtons = document.querySelectorAll(".filter-buttons button");
const menuItems = document.querySelectorAll("#menu .menu-item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        menuItems.forEach(function (item) {
            if (filter === "all" || item.dataset.category === filter) {
                item.hidden = false;
            }else {
                item.hidden = true;
            }
        });
    });
});

const openStatus = document.querySelector("#open-status");

const hours = {
    0: { open: 12, close: 21 },
    1: { open: 11, close: 22 },
    2: { open: 11, close: 22 },
    3: { open: 11, close: 22 },
    4: { open: 11, close: 22 },
    5: { open: 11, close: 23 },
    6: { open: 11, close: 23 },
}

function updateOpenStatus() {
    const now = new Date();
    const today = hours[now.getDay()];
    const currentTime = now.getHours() + now.getMinutes() / 60;

    if (currentTime >= today.open && currentTime < today.close) {
        openStatus.textContent = "We're open now";
    } else {
        openStatus.textContent = "We're closed right now";
    }
}

updateOpenStatus();