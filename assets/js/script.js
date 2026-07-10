/*==================================================
ALVERIS CORPORATE SERVICES
PREMIUM WEBSITE JAVASCRIPT
PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==========================================
      STICKY HEADER
    ==========================================*/

    const header = document.querySelector("header");

    function stickyHeader() {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    stickyHeader();

    window.addEventListener("scroll", stickyHeader);



    /*==========================================
      MOBILE MENU
    ==========================================*/

    const menuButton = document.querySelector(".mobile-toggle");

    const navMenu = document.querySelector(".nav-links");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            this.classList.toggle("active");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuButton.classList.remove("active");

            });

        });

    }



    /*==========================================
      SMOOTH SCROLL
    ==========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });



    /*==========================================
      BACK TO TOP BUTTON
    ==========================================*/

    const backToTop = document.getElementById("backToTop");

    function toggleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    toggleBackToTop();

    window.addEventListener("scroll", toggleBackToTop);

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }



    /*==========================================
      ACTIVE NAVIGATION
    ==========================================*/

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage || (currentPage === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

});

/*==================================================
PART 2
SCROLL REVEAL
COUNTERS
IMAGE ANIMATIONS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==========================================
      SCROLL REVEAL
    ==========================================*/

    const revealElements = document.querySelectorAll(
        ".reveal, .fade-up, .fade-left, .fade-right, .zoom-in"
    );

    const revealObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /*==========================================
      ANIMATED COUNTERS
    ==========================================*/

    const counters = document.querySelectorAll("[data-counter]");

    function animateCounter(counter) {

        const target = parseInt(counter.getAttribute("data-counter"));

        const duration = 2000;

        const increment = target / (duration / 16);

        let current = 0;

        function updateCounter() {

            current += increment;

            if (current >= target) {

                counter.textContent = target.toLocaleString();

                return;

            }

            counter.textContent = Math.floor(current).toLocaleString();

            requestAnimationFrame(updateCounter);

        }

        updateCounter();

    }

    const counterObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });



    /*==========================================
      IMAGE FADE-IN
    ==========================================*/

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("load", function () {

            image.classList.add("loaded");

        });

    });



    /*==========================================
      CARD HOVER EFFECT
    ==========================================*/

    const cards = document.querySelectorAll(

        ".service-card, .glass-card, .knowledge-card, .testimonial-card"

    );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });



    /*==========================================
      SCROLL PROGRESS BAR
    ==========================================*/

    const progressBar = document.createElement("div");

    progressBar.id = "scrollProgress";

    progressBar.style.position = "fixed";

    progressBar.style.top = "0";

    progressBar.style.left = "0";

    progressBar.style.height = "4px";

    progressBar.style.width = "0%";

    progressBar.style.background = "#D4AF37";

    progressBar.style.zIndex = "9999";

    document.body.appendChild(progressBar);

    function updateProgress() {

        const scrollTop = window.scrollY;

        const pageHeight =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const progress = (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

});

/*==================================================
PART 3
FAQ
FORMS
BUTTONS
PAGE EFFECTS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==========================================
      FAQ ACCORDION
    ==========================================*/

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector("h3");

        const answer = item.querySelector("p");

        if (!question || !answer) return;

        answer.style.display = "none";

        question.style.cursor = "pointer";

        question.addEventListener("click", function () {

            faqItems.forEach(function (faq) {

                if (faq !== item) {

                    const otherAnswer = faq.querySelector("p");

                    if (otherAnswer) {

                        otherAnswer.style.display = "none";

                    }

                    faq.classList.remove("active");

                }

            });

            if (answer.style.display === "block") {

                answer.style.display = "none";

                item.classList.remove("active");

            } else {

                answer.style.display = "block";

                item.classList.add("active");

            }

        });

    });



    /*==========================================
      CONTACT FORM VALIDATION
    ==========================================*/

    const contactForm = document.querySelector("form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const requiredFields = contactForm.querySelectorAll("[required]");

            let valid = true;

            requiredFields.forEach(function (field) {

                field.classList.remove("error");

                if (field.value.trim() === "") {

                    valid = false;

                    field.classList.add("error");

                }

            });

            if (!valid) {

                event.preventDefault();

                alert("Please complete all required fields before submitting.");

            }

        });

    }



    /*==========================================
      NEWSLETTER VALIDATION
    ==========================================*/

    const newsletterForms = document.querySelectorAll(".newsletter-form");

    newsletterForms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = form.querySelector("input[type='email']");

            if (!email) return;

            const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

            if (!pattern.test(email.value.trim())) {

                alert("Please enter a valid email address.");

                email.focus();

                return;

            }

            alert("Thank you for subscribing to the Alveris Knowledge Centre.");

            form.reset();

        });

    });



    /*==========================================
      BUTTON LOADING EFFECT
    ==========================================*/

    const buttons = document.querySelectorAll(".btn-primary");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (button.closest("form")) return;

            const originalText = button.innerHTML;

            button.innerHTML =

                '<i class="fa-solid fa-spinner fa-spin"></i> Loading';

            setTimeout(function () {

                button.innerHTML = originalText;

            }, 1200);

        });

    });



    /*==========================================
      PAGE FADE-IN
    ==========================================*/

    document.body.classList.add("loaded");



    /*==========================================
      CURRENT YEAR
    ==========================================*/

    const year = new Date().getFullYear();

    document.querySelectorAll(".current-year").forEach(function (element) {

        element.textContent = year;

    });

});

/*==================================================
PART 4
PERFORMANCE
ACCESSIBILITY
FINAL INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==========================================
      LAZY IMAGE ANIMATION
    ==========================================*/

    const lazyImages = document.querySelectorAll("img");

    if ("IntersectionObserver" in window) {

        const imageObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in-view");

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.1

        });

        lazyImages.forEach(function (image) {

            imageObserver.observe(image);

        });

    }



    /*==========================================
      EXTERNAL LINKS
    ==========================================*/

    document.querySelectorAll("a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (

            href &&

            href.startsWith("http") &&

            !href.includes(window.location.hostname)

        ) {

            link.setAttribute("target", "_blank");

            link.setAttribute("rel", "noopener noreferrer");

        }

    });



    /*==========================================
      KEYBOARD ACCESSIBILITY
    ==========================================*/

    document.addEventListener("keyup", function (event) {

        if (event.key === "Escape") {

            const nav = document.querySelector(".nav-links");

            const toggle = document.querySelector(".mobile-toggle");

            if (nav) nav.classList.remove("active");

            if (toggle) toggle.classList.remove("active");

        }

    });



    /*==========================================
      REMOVE EMPTY LINKS
    ==========================================*/

    document.querySelectorAll("a[href='#']").forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });



    /*==========================================
      PREVENT DOUBLE FORM SUBMISSION
    ==========================================*/

    document.querySelectorAll("form").forEach(function (form) {

        form.addEventListener("submit", function () {

            const submitButton = form.querySelector(

                "button[type='submit'], input[type='submit']"

            );

            if (!submitButton) return;

            submitButton.disabled = true;

            setTimeout(function () {

                submitButton.disabled = false;

            }, 3000);

        });

    });



    /*==========================================
      CONSOLE BRANDING
    ==========================================*/

    console.log("%cAlveris Corporate Services",

        "font-size:22px;font-weight:bold;color:#D4AF37;");

    console.log("%cPremium website developed for Alveris Corporate Services.",

        "font-size:13px;color:#666;");



    /*==========================================
      FINAL INITIALIZATION
    ==========================================*/

    document.body.classList.add("site-ready");

});





window.addEventListener("load", function () {
    const loader=document.querySelector(".loader");
    if(!loader) return;
    setTimeout(()=>{
      loader.style.transition="opacity .5s ease, visibility .5s ease";
      loader.style.opacity="0";
      loader.style.visibility="hidden";
      loader.style.pointerEvents="none";
      setTimeout(()=>loader.remove(),500);
    },500);
});
