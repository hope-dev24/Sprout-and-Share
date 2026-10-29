console.log("Sprout & share script loaded");

const navToggle = document.querySelector("nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", function () {
    siteNav.classList.toggle("open");
    const isOpen = siteNav.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});
