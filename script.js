/* =========================================
   DYNAMIC EXPERIENCE
========================================= */

function calculateExperience() {

    // Career started on 29 November 2021
    const careerStartDate = new Date(2021, 10, 29);

    const today = new Date();


    let years =
        today.getFullYear() -
        careerStartDate.getFullYear();


    let months =
        today.getMonth() -
        careerStartDate.getMonth();


    let days =
        today.getDate() -
        careerStartDate.getDate();


    if (days < 0) {

        months--;

    }


    if (months < 0) {

        years--;

        months += 12;

    }


    const heroExperience =
        document.getElementById("experienceYears");


    if (heroExperience) {

        heroExperience.textContent =
            `${years}+`;

    }


    const aboutExperience =
        document.getElementById("aboutExperienceYears");


    if (aboutExperience) {

        aboutExperience.textContent =
            `${years}+ years`;

    }

}


/* =========================================
   DATA STACK CATEGORY SWITCHING
========================================= */

const categoryButtons =
    document.querySelectorAll(".stack-category");


const techCategories =
    document.querySelectorAll(".tech-category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.category;


        categoryButtons.forEach(item => {

            item.classList.remove("active");

        });


        button.classList.add("active");


        techCategories.forEach(category => {

            category.classList.remove("active");

        });


        const targetCategory =
            document.querySelector(
                `[data-tech-group="${selectedCategory}"]`
            );


        if (targetCategory) {

            targetCategory.classList.add("active");

        }

    });

});


/* =========================================
   EXPERIENCE DATA
========================================= */

const projectData = {

    ebay: {

        name: "eBay",

        description:
            "Incremental pipelines, Spark SQL optimization, data quality and monitoring."

    },

    "mars-petnutrition": {

        name: "MARS PetNutrition",

        description:
            "Azure ingestion and Databricks transformation pipelines across 70+ retailers and 50+ markets."

    },

    "mars-pno": {

        name: "MARS PnO",

        description:
            "Scalable PySpark data pipelines with Azure Data Factory, Logic Apps and DevOps."

    },

    jollibee: {

        name: "Jollibee Foods Corporation",

        description:
            "Snowflake, dbt and Matillion based ELT platform with reusable transformation models."

    },

    globe: {

        name: "Globe Telecom",

        description:
            "Large-scale Snowflake and AWS data platform with 500TB+ migration and SCD Type 2."

    }

};


/* =========================================
   TECHNOLOGY SELECTION
========================================= */

const techNodes =
    document.querySelectorAll(".tech-node");


const experienceCards =
    document.querySelectorAll(".experience-card");


const traceTitle =
    document.getElementById("traceTitle");


const traceContent =
    document.getElementById("traceContent");


techNodes.forEach(node => {

    node.addEventListener("click", () => {

        const selectedTech =
            node.dataset.tech;


        const alreadySelected =
            node.classList.contains("selected");


        // Remove previous node selections
        techNodes.forEach(item => {

            item.classList.remove("selected");

        });


        // Remove previous card states
        experienceCards.forEach(card => {

            card.classList.remove("dimmed");

            card.classList.remove("highlighted");

        });


        // Remove badge states
        document
            .querySelectorAll("[data-tech-badge]")
            .forEach(badge => {

                badge.classList.remove("active");

            });


        // If clicking selected technology again,
        // reset everything
        if (alreadySelected) {

            resetTrace();

            return;

        }


        node.classList.add("selected");


        const matchingProjects = [];


        experienceCards.forEach(card => {

            const techList =
                card.dataset.techs
                    .split(",")
                    .map(item => item.trim());


            if (techList.includes(selectedTech)) {

                card.classList.add("highlighted");

                matchingProjects.push(
                    card.dataset.project
                );


                const badges =
                    card.querySelectorAll(
                        `[data-tech-badge="${selectedTech}"]`
                    );


                badges.forEach(badge => {

                    badge.classList.add("active");

                });

            } else {

                card.classList.add("dimmed");

            }

        });


        updateTrace(
            node.textContent.trim(),
            matchingProjects
        );

    });

});


/* =========================================
   TRACE PANEL UPDATE
========================================= */

function updateTrace(
    technology,
    matchingProjects
) {

    traceTitle.textContent =
        technology;


    if (!matchingProjects.length) {

        traceContent.innerHTML = `

            <div class="trace-empty">

                <span class="trace-icon">
                    !
                </span>

                <p>
                    No mapped projects found
                    for this technology.
                </p>

            </div>

        `;

        return;

    }


    let html = `
        <div class="trace-results">
    `;


    matchingProjects.forEach(
        projectKey => {

            const project =
                projectData[projectKey];


            if (!project) return;


            html += `

                <div class="trace-result">

                    <span>
                        PROJECT
                    </span>

                    <h4>
                        ${project.name}
                    </h4>

                    <p>
                        ${project.description}
                    </p>

                </div>

            `;

        }
    );


    html += `
        </div>
    `;


    traceContent.innerHTML = html;

}


/* =========================================
   RESET TRACE
========================================= */

const resetButton =
    document.getElementById("resetTrace");


function resetTrace() {

    techNodes.forEach(node => {

        node.classList.remove("selected");

    });


    experienceCards.forEach(card => {

        card.classList.remove("dimmed");

        card.classList.remove("highlighted");

    });


    document
        .querySelectorAll("[data-tech-badge]")
        .forEach(badge => {

            badge.classList.remove("active");

        });


    traceTitle.textContent =
        "Select a technology";


    traceContent.innerHTML = `

        <div class="trace-empty">

            <span class="trace-icon">
                +
            </span>

            <p>
                Select a technology above to see
                where it appears in my experience.
            </p>

        </div>

    `;

}


if (resetButton) {

    resetButton.addEventListener(
        "click",
        resetTrace
    );

}


/* =========================================
   NAVBAR ACTIVE LINK
========================================= */

const sections =
    document.querySelectorAll("section[id]");


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================================
   NAV LINK ACTIVE CSS SUPPORT
========================================= */

const navStyle =
    document.createElement("style");


navStyle.textContent = `

    .nav-links a.active {
        color: #39ff14;
    }

`;


document.head.appendChild(navStyle);


/* =========================================
   INITIALIZE
========================================= */

calculateExperience();
