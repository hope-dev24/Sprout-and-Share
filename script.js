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

const addButtons = document.querySelectorAll(".add-to-cart");
const orderList = document.querySelector("#order-list");
const  orderTotal = document.querySelector("#order-total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    orderList.innerHTML = "";
    let total = 0;
    cart.forEach(function (item, index) {
        const li = document.createElement("li");
        li.textContent = item.name + " - $" + item.price + " ";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.className = "remove-item";
        removeButton.dataset.index = index;
        li.appendChild(removeButton);

        orderList.appendChild(li);
        total = total + item.price;
    });

    orderTotal.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const  name = button.dataset.name;
        const price = Number(button.dataset.price);
        cart.push({ name: name, price: price });
        renderCart();
    });
});
orderList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        cart.splice(Number(event.target.dataset.index), 1);
        renderCart();
    }
});

const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
const maxPerSlot = 1;

reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const guestName = document.querySelector("#name").value.trim();
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const email = document.querySelector("#email").value;
    const guests = Number(document.querySelector("#guests").value);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosenDate = new Date(date + "T00:00:00");

    if (guestName.length < 2) {
        formMessage.textContent = "Please enter your name.";
        formMessage.className = "error";
        return;
    }

    if (chosenDate < today) {
        formMessage.textContent = "Please choose a date that is not in the past.";
        formMessage.className = "error";
        return;
    }

    const sameSlot = reservations.filter(function (r) {
        return r.date === date && r.time === time;
    });
    
    if (sameSlot.length >= maxPerSlot) {
        formMessage.textContent = "Sorry that time is already booked. Please choose another time.";
        formMessage.className = "error";
        return;
    }

    reservations.push({ name: guestName, email: email, date: date, time: time, guests: guests});
    localStorage.setItem("reservations", JSON.stringify(reservations));

    formMessage.className = "";
    formMessage.textContent = "Thank you! Your table request is received.";
});


const dailySpecial = document.querySelector("#daily-special");
const adminForm = document.querySelector("#admin-form");

function showSpecial(special) {
    dailySpecial.querySelector("h3").textContent = special.name;
    dailySpecial.querySelector("p").textContent = special.description;
    dailySpecial.querySelector(".price").textContent = "$" + special.price;
    if (special.tag) {
        dailySpecial.querySelector("span").textContent = special.tag;
    }
}

const savedSpecial = JSON.parse(localStorage.getItem("special"));
if (savedSpecial) {
    showSpecial(savedSpecial);
}

adminForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const special = {
        name: document.querySelector("#special-name").value.trim(),
        description: document.querySelector("#special-description").value.trim(),
        price: Number(document.querySelector("#special-price").value),
        tag: document.querySelector("#special-tag").value
    };

    showSpecial(special);
    localStorage.setItem("special", JSON.stringify(special));
    adminForm.reset();
});

const newsletterForm = document.querySelector("#newsletter-form");
const  newsletterMessage = document.querySelector("#newsletter-message");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    newsletterMessage.textContent = "Thanks for subscribing!";
    newsletterForm.reset();
});