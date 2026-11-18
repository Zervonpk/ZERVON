
/* ==========================================
   ZERVON CODE ACADEMY
   PROFESSIONAL JAVASCRIPT
========================================== */


/* ==========================================
   01. COURSE DATABASE
========================================== */

const courses = [

    {
        id: "coding",
        number: "01",
        title: "Introduction to Coding",
        category: "FOUNDATION",
        description: "Programming kya hai, computers instructions ko kaise samajhte hain, programming languages, algorithms aur coding ki complete foundation seekho.",
        icon: "fa-solid fa-lightbulb",
        duration: "2 Hours",
        level: "Beginner",
        link: "coding.html"
    },

    {
        id: "vscode",
        number: "02",
        title: "Visual Studio Code",
        category: "DEVELOPMENT TOOLS",
        description: "VS Code installation, extensions, themes, settings, terminal aur professional coding environment configure karna seekho.",
        icon: "fa-solid fa-laptop-code",
        duration: "2 Hours",
        level: "Beginner",
        link: "vscode.html"
    },

    {
        id: "html",
        number: "03",
        title: "HTML Mastery",
        category: "WEB DEVELOPMENT",
        description: "HTML document structure, elements, attributes, headings, paragraphs, links, images, tables, forms aur semantic HTML detail mein seekho.",
        icon: "fa-brands fa-html5",
        duration: "8 Hours",
        level: "Beginner",
        link: "html.html"
    },

    {
        id: "css",
        number: "04",
        title: "CSS Mastery",
        category: "WEB DESIGN",
        description: "Selectors, colors, typography, box model, Flexbox, Grid, animations, transitions aur responsive web design seekho.",
        icon: "fa-brands fa-css3-alt",
        duration: "10 Hours",
        level: "Beginner",
        link: "css.html"
    },

    {
        id: "javascript",
        number: "05",
        title: "JavaScript Fundamentals",
        category: "PROGRAMMING",
        description: "Variables, data types, operators, conditions, loops, functions, arrays, objects aur DOM manipulation detail mein seekho.",
        icon: "fa-brands fa-js",
        duration: "12 Hours",
        level: "Beginner",
        link: "javascript.html"
    },

    {
        id: "projects",
        number: "06",
        title: "Real World Projects",
        category: "PRACTICAL LEARNING",
        description: "Landing pages, portfolios, calculators aur complete responsive websites real coding projects ke through banao.",
        icon: "fa-solid fa-code",
        duration: "8 Hours",
        level: "Intermediate",
        link: "project.html"
    },

    {
        id: "github",
        number: "07",
        title: "Git & GitHub",
        category: "VERSION CONTROL",
        description: "Git installation, repositories, commits, branches, GitHub account, code upload aur version control detail mein seekho.",
        icon: "fa-brands fa-github",
        duration: "4 Hours",
        level: "Beginner",
        link: "github.html"
    },

    {
        id: "deployment",
        number: "08",
        title: "Website Deployment",
        category: "PUBLISHING",
        description: "GitHub Pages par website publish karna, live URL hasil karna aur apne projects duniya ke saath share karna seekho.",
        icon: "fa-solid fa-rocket",
        duration: "3 Hours",
        level: "Beginner",
        link: "deployment.html"
    }

];


/* ==========================================
   02. MOBILE NAVIGATION
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


function closeMobileMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


function toggleMobileMenu() {

    if (!menuToggle || !navLinks) return;

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

}


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", toggleMobileMenu);

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMobileMenu);

    });


    // Menu ke bahar click karne par close hoga

    document.addEventListener("click", event => {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeMobileMenu();

        }

    });


    // Escape key par menu close hoga

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    // Desktop screen par menu state reset hogi

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {

            closeMobileMenu();

        }

    });

}


/* ==========================================
   03. COURSE CARD GENERATOR
========================================== */

const featuredGrid = document.getElementById("featuredGrid");


function createCourseCard(course) {

    return `

        <article class="featured-card">

            <div class="featured-card-top">

                <span class="course-category">
                    ${course.category}
                </span>

                <span class="course-number">
                    ${course.number}
                </span>

            </div>


            <div class="featured-icon">

                <i class="${course.icon}" aria-hidden="true"></i>

            </div>


            <h3>${course.title}</h3>

            <p>${course.description}</p>


            <div class="course-meta">

                <span>
                    <i class="fa-regular fa-clock"></i>
                    ${course.duration}
                </span>

                <span>
                    <i class="fa-solid fa-signal"></i>
                    ${course.level}
                </span>

            </div>


            <a
                href="${course.link}"
                class="course-explore"
                aria-label="Explore ${course.title}">

                Explore Course

                <i class="fa-solid fa-arrow-right"></i>

            </a>

        </article>

    `;

}


/* ==========================================
   04. DISPLAY FEATURED COURSES
========================================== */

function renderFeaturedCourses() {

    if (!featuredGrid) return;

    // Homepage par 4 featured courses show honge

    const featuredCourses = courses.slice(0, 4);

    featuredGrid.innerHTML = featuredCourses
        .map(createCourseCard)
        .join("");

}


renderFeaturedCourses();


/* ==========================================
   05. CURRENT YEAR
========================================== */

const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {

    const year = new Date().getFullYear();

    footerYear.textContent =
        `© ${year} ZERVON CODE ACADEMY. All Rights Reserved.`;

}


/* ==========================================
   06. CONSOLE BRANDING
========================================== */

console.log(
    "%c ZERVON CODE ACADEMY ",
    "background:#d8b477;color:#08090c;padding:10px;font-size:16px;font-weight:bold;"
);

console.log(
    "Welcome to ZERVON. Learn today. Build tomorrow."
);
