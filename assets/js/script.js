/* =========================================================
   ALVERIS - PREMIUM INTERACTIONS UPGRADE
========================================================= */

/* ===============================
   MOBILE MENU (IMPROVED)
=============================== */

const mobileToggle = document.querySelector(".mobile-toggle");
const navbar = document.querySelector(".navbar");

if (mobileToggle && navbar) {
    mobileToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        mobileToggle.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });
}

/* Close menu when clicking link (mobile UX fix) */
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        mobileToggle.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

/* ===============================
   HEADER SCROLL EFFECT (SMOOTHER)
=============================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ===============================
   SMOOTH REVEAL ON SCROLL
=============================== */

const revealElements = document.querySelectorAll(
    ".section-title, .service-card, .why-item, .step, .stat, .knowledge-card, .testimonial"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

/* ===============================
   COUNTER ANIMATION (SMOOTH + PREMIUM)
=============================== */

const animateCounter = (counter) => {
    const targetText = counter.innerText;
    const target = parseInt(targetText.replace(/[^\d]/g, ""));
    const suffix = targetText.replace(/[0-9]/g, "");

    let current = 0;
    const duration = 1500;
    const stepTime = 16;
    const increment = target / (duration / stepTime);

    const update = () => {
        current += increment;

        if (current < target) {
            counter.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(update);
        } else {
            counter.innerText = target + suffix;
        }
    };

    update();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector("h3");

            if (counter && !counter.classList.contains("done")) {
                animateCounter(counter);
                counter.classList.add("done");
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".stat").forEach(stat => {
    statObserver.observe(stat);
});

/* ===============================
   BACK TO TOP (SMOOTH + FADE)
=============================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ===============================
   PRELOADER (FADE OUT CLEAN)
=============================== */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {
            preloader.remove();
        }, 600);
    }
});

/* ===============================
   ACTIVE NAV ON SCROLL (FIXED)
=============================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
