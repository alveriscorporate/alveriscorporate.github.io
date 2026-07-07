document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const menuButton = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-links");
    const backToTop = document.getElementById("backToTop");

    function stickyHeader() {
        if (!header) return;
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    function toggleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    stickyHeader();
    toggleBackToTop();

    window.addEventListener("scroll", stickyHeader);
    window.addEventListener("scroll", toggleBackToTop);

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "index.html" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    const revealElements = document.querySelectorAll(".reveal, .fade-up, .fade-left, .fade-right, .zoom-in");
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

    const counters = document.querySelectorAll("[data-counter]");
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute("data-counter"), 10) || 0;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target.toLocaleString();
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });

    document.querySelectorAll("img").forEach(function (image) {
        if (image.complete) image.classList.add("loaded");
        image.addEventListener("load", function () {
            image.classList.add("loaded");
        });
    });

    const cards = document.querySelectorAll(".service-card, .glass-card, .knowledge-card, .testimonial-card");
    cards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-10px)";
        });
        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });

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
        const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thanks for subscribing!");
            newsletterForm.reset();
        });
    }
});
