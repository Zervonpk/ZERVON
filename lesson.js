/* ==========================================
   ZERVON CODE ACADEMY
   LESSON PAGES JAVASCRIPT
   Requires js/app.js (loaded first) for the
   global `courses` array.
   Each lesson page sets <body data-course="id">
========================================== */

(function () {
    "use strict";

    const currentId = document.body.dataset.course;
    const hasCourses = typeof courses !== "undefined" && Array.isArray(courses);


    /* ------------------------------------------
       01. READING PROGRESS BAR
    ------------------------------------------ */

    const progressBar = document.getElementById("readingProgress");

    function updateProgress() {

        if (!progressBar) return;

        const root = document.documentElement;
        const max = root.scrollHeight - root.clientHeight;

        const percent = max > 0
            ? Math.min(100, (root.scrollTop / max) * 100)
            : 0;

        progressBar.style.width = percent + "%";

    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();


    /* ------------------------------------------
       02. SIDEBAR MODULE LIST + PREV / NEXT
    ------------------------------------------ */

    const moduleList = document.getElementById("moduleList");
    const lessonNav = document.getElementById("lessonNav");

    if (hasCourses) {

        const index = courses.findIndex(course => course.id === currentId);

        if (moduleList) {

            moduleList.innerHTML = courses.map(course => {

                const isActive = course.id === currentId;

                return `
                    <li>
                        <a href="../${course.link}"
                           class="${isActive ? "active" : ""}"
                           ${isActive ? 'aria-current="page"' : ""}>
                            <span class="num">${course.number}</span>
                            ${course.title}
                        </a>
                    </li>
                `;

            }).join("");

        }

        if (lessonNav && index !== -1) {

            const prev = courses[index - 1];
            const next = courses[index + 1];

            const prevCard = prev
                ? `<a href="../${prev.link}" class="lesson-nav-card prev">
                       <small><i class="fa-solid fa-arrow-left"></i> PREVIOUS</small>
                       <strong>${prev.title}</strong>
                   </a>`
                : "<span></span>";

            const nextCard = next
                ? `<a href="../${next.link}" class="lesson-nav-card next">
                       <small>NEXT <i class="fa-solid fa-arrow-right"></i></small>
                       <strong>${next.title}</strong>
                   </a>`
                : `<a href="../courses.html" class="lesson-nav-card next">
                       <small>COMPLETED <i class="fa-solid fa-flag-checkered"></i></small>
                       <strong>Back to All Courses</strong>
                   </a>`;

            lessonNav.innerHTML = prevCard + nextCard;

        }

    }


    /* ------------------------------------------
       03. TABLE OF CONTENTS + ACTIVE SECTION
    ------------------------------------------ */

    const tocList = document.getElementById("tocList");
    const blocks = document.querySelectorAll(".lesson-block[id]");

    if (tocList && blocks.length) {

        tocList.innerHTML = Array.from(blocks).map((block, i) => {

            const title = block.querySelector("h2").textContent;

            return `
                <li>
                    <a href="#${block.id}">
                        <span class="num">${String(i + 1).padStart(2, "0")}</span>
                        ${title}
                    </a>
                </li>
            `;

        }).join("");

        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    tocList.querySelectorAll("a").forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );

                    });

                });

            }, { rootMargin: "-20% 0px -70% 0px" });

            blocks.forEach(block => observer.observe(block));

        }

    }


    /* ------------------------------------------
       04. COPY BUTTONS FOR CODE BLOCKS
    ------------------------------------------ */

    function fallbackCopy(text) {

        const area = document.createElement("textarea");

        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";

        document.body.appendChild(area);
        area.select();

        try {
            document.execCommand("copy");
        } finally {
            document.body.removeChild(area);
        }

    }

    document.querySelectorAll(".code-block").forEach(block => {

        const button = block.querySelector(".copy-btn");
        const code = block.querySelector("pre code");

        if (!button || !code) return;

        const label = button.querySelector("span");

        button.addEventListener("click", async () => {

            const text = code.textContent;

            try {
                await navigator.clipboard.writeText(text);
            } catch (error) {
                fallbackCopy(text);
            }

            button.classList.add("copied");
            if (label) label.textContent = "Copied!";

            setTimeout(() => {
                button.classList.remove("copied");
                if (label) label.textContent = "Copy";
            }, 2000);

        });

    });

})();