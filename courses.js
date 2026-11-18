
/* ==========================================
   ZERVON CODE ACADEMY
   COURSES PAGE JAVASCRIPT
   Requires app.js loaded first
========================================== */

"use strict";


/* ==========================================
   01. GET HTML ELEMENTS
========================================== */

const allCoursesGrid = document.getElementById("allCoursesGrid");
const courseSearch = document.getElementById("courseSearch");
const courseFilter = document.getElementById("courseFilter");
const noCourses = document.getElementById("noCourses");


/* ==========================================
   02. CHECK COURSE DATABASE
========================================== */

if (typeof courses === "undefined" || !Array.isArray(courses)) {

    console.error("ZERVON: Course database not found. Check app.js.");

} else {


    /* ==========================================
       03. CREATE COURSE CARD
    ========================================== */

    function createCourseCard(course) {

        return `
            <article class="course-card">

                <div class="course-card-top">

                    <span class="course-category">
                        ${course.category}
                    </span>

                    <span class="course-number">
                        ${course.number}
                    </span>

                </div>

                <div class="course-icon">
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
                    aria-label="Start ${course.title}">

                    Start Learning

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </article>
        `;

    }


    /* ==========================================
       04. DISPLAY COURSES
    ========================================== */

    function renderCourses() {

        if (!allCoursesGrid) return;

        const searchValue = courseSearch
            ? courseSearch.value.trim().toLowerCase()
            : "";

        const filterValue = courseFilter
            ? courseFilter.value
            : "all";


        const filteredCourses = courses.filter(course => {

            const matchesSearch =
                course.title.toLowerCase().includes(searchValue) ||
                course.description.toLowerCase().includes(searchValue) ||
                course.category.toLowerCase().includes(searchValue);

            const matchesFilter =
                filterValue === "all" ||
                course.level === filterValue;

            return matchesSearch && matchesFilter;

        });


        /* No results */

        if (filteredCourses.length === 0) {

            allCoursesGrid.innerHTML = "";

            if (noCourses) {
                noCourses.hidden = false;
            }

            return;

        }


        /* Display matching courses */

        if (noCourses) {
            noCourses.hidden = true;
        }

        allCoursesGrid.innerHTML = filteredCourses
            .map(createCourseCard)
            .join("");

    }


    /* ==========================================
       05. SEARCH EVENT
    ========================================== */

    if (courseSearch) {

        courseSearch.addEventListener("input", renderCourses);

    }


    /* ==========================================
       06. FILTER EVENT
    ========================================== */

    if (courseFilter) {

        courseFilter.addEventListener("change", renderCourses);

    }


    /* ==========================================
       07. INITIAL COURSE DISPLAY
    ========================================== */

    renderCourses();


    /* ==========================================
       08. CONSOLE BRANDING
    ========================================== */

    console.log(
        "%c ZERVON COURSE LIBRARY ",
        "background:#d8b477;color:#08090c;padding:8px;font-weight:bold;"
    );

    console.log("All courses loaded successfully.");

}
