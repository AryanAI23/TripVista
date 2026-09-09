/* ================= BASIC SELECTORS ================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    [...document.querySelectorAll(selector)];


/* ================= PLANNER VARIABLES ================= */

let step = 1;

const totalSteps = 6;

let selectedType = "family";

let experiences = [];

let romantic = [];

const state = {};


/* ================= TOAST ================= */

function toast(message) {

    const toastBox = $("#toast");

    toastBox.textContent = message;

    toastBox.classList.add("show");

    setTimeout(() => {

        toastBox.classList.remove("show");

    }, 2600);
}


/* ================= PROGRESS BAR ================= */

function updateProgress() {

    const progress = $("#progress");

    progress.innerHTML = "";

    for (let i = 1; i <= totalSteps; i++) {

        const item =
            document.createElement("i");

        item.className =
            i <= step ? "active" : "";

        progress.appendChild(item);
    }
}


/* ================= SHOW STEP ================= */

function showStep(number) {

    step =
        Math.max(
            1,
            Math.min(totalSteps, number)
        );

    $$(".step").forEach((item) => {

        item.classList.toggle(
            "active",
            +item.dataset.step === step
        );

    });


    $("#navBtns").style.display =
        step === totalSteps
            ? "none"
            : "flex";


    if (step === 1) {

        $("#prev").style.visibility =
            "hidden";

    } else {

        $("#prev").style.visibility =
            "visible";
    }


    updateProgress();


    window.scrollTo({

        top:
            $("#planner").offsetTop - 70,

        behavior: "smooth"

    });
}


/* ================= DATE CALCULATION ================= */

function dateInfo() {

    const start =
        $("#start").value;

    const end =
        $("#end").value;


    if (!start || !end) {

        return null;
    }


    const days = Math.round(

        (
            new Date(end) -
            new Date(start)
        ) /
        86400000

    );


    if (days < 1) {

        return null;
    }


    return {

        days: days,

        nights: days

    };
}


/* ================= NEXT BUTTON ================= */

$("#next").onclick = () => {


    if (
        step === 1 &&
        !$("#destination").value.trim()
    ) {

        return toast(
            "Please select a destination."
        );
    }


    if (
        step === 2 &&
        !dateInfo()
    ) {

        return toast(
            "Return date must be after departure date."
        );
    }


    if (
        step === 3 &&
        !selectedType
    ) {

        return toast(
            "Please select a travel type."
        );
    }


    showStep(step + 1);

};


/* ================= BACK BUTTON ================= */

$("#prev").onclick = () =>
    showStep(step - 1);


$("#back").onclick = () =>
    showStep(step - 1);


/* ================= DATE EVENTS ================= */

$("#start").addEventListener(
    "change",
    () => {

        $("#end").min =
            $("#start").value;

        updateDuration();

    }
);


$("#end").addEventListener(
    "change",
    updateDuration
);


/* ================= DURATION ================= */

function updateDuration() {

    const duration =
        dateInfo();


    $("#durationHint").textContent =

        duration

            ? `${duration.days} day(s) · ${duration.nights} night(s)`

            : "Return date must be after departure date.";
}


/* ================= TRAVEL TYPE ================= */

$$(
    "#travelTypes .choice"
).forEach((choice) => {

    choice.onclick = () => {


        $$("#travelTypes .choice")
            .forEach((item) => {

                item.classList.remove(
                    "selected"
                );

            });


        choice.classList.add(
            "selected"
        );


        selectedType =
            choice.dataset.value;


        $("#coupleBox").hidden =
            selectedType !== "couple";

    };

});


/* ================= EXPERIENCES ================= */

$$(
    "#expChoices .choice"
).forEach((choice) => {

    choice.onclick = () => {

        choice.classList.toggle(
            "selected"
        );


        experiences =
            $$("#expChoices .selected")
                .map((item) => ({

                    name:
                        item.dataset.value,

                    cost:
                        +item.dataset.cost

                }));

    };

});


/* ================= ROMANTIC OPTIONS ================= */

$$(
    "#romantics .choice"
).forEach((choice) => {

    choice.onclick = () => {

        choice.classList.toggle(
            "selected"
        );


        romantic =
            $$("#romantics .selected")
                .map(
                    (item) =>
                        item.dataset.value
                );

    };

});


/* ================= FORM SUBMIT ================= */

$("#tripForm").addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        generate();

    }
);


/* ================= MONEY ================= */

function money(number) {

    return new Intl.NumberFormat(
        "en-IN",
        {

            style: "currency",

            currency: "INR",

            maximumFractionDigits: 0

        }
    ).format(
        Math.max(0, number)
    );
}


/* ================= GENERATE TRIP ================= */

function generate() {

    const duration =
        dateInfo();


    if (!duration) {

        return toast(
            "Please enter valid travel dates."
        );

    }


    const destination =
        $("#destination").value.trim();


    const people =
        Math.max(
            1,
            +$("#travelers").value || 1
        );


    const budget =
        Math.max(
            0,
            +$("#budget").value || 0
        );


    const nightly =
        +$("#stay").value;


    const transport =
        +$("#transport").value;


    /* FOOD */

    let food =
        900 *
        duration.days *
        people;


    /* ACCOMMODATION */

    const accommodation =
        nightly *
        duration.nights;


    /* TRANSPORT */

    const transportCost =
        transport *
        people;


    /* ACTIVITIES */

    let activity =
        experiences.reduce(
            (sum, item) =>
                sum + item.cost,
            0
        ) *
        Math.max(
            1,
            Math.ceil(people / 2)
        );


    /* TRAVEL TYPE ADJUSTMENTS */

    if (selectedType === "family") {

        food *= 0.9;

    }


    if (selectedType === "solo") {

        food *= 0.85;

    }


    if (selectedType === "couple") {

        activity +=
            romantic.length * 1200;

    }


    /* SIGHTSEEING */

    const sightseeing =
        700 *
        duration.days *
        people;


    /* BUFFER */

    const buffer =
        (
            accommodation +
            food +
            transportCost +
            activity +
            sightseeing
        ) * 0.08;


    /* TOTAL */

    const total =
        accommodation +
        food +
        transportCost +
        activity +
        sightseeing +
        buffer;


    /* OVER BUDGET */

    const over =
        Math.max(
            0,
            total - budget
        );


    /* THEME */

    const theme =
        selectedType === "couple"
            ? "romantic"

            : selectedType === "family"
                ? "family"

                : selectedType === "friends"
                    ? "friends"

                    : "solo";


    /* ACTIVITIES */

    const activities =

        selectedType === "couple"

            ? [

                "Sunrise breakfast",

                "Local sightseeing",

                ...(romantic.length

                    ? romantic.map(
                        item =>
                            item
                                .charAt(0)
                                .toUpperCase() +
                            item.slice(1)
                    )

                    : [
                        "Romantic beach walk",
                        "Sunset view"
                    ])

            ]

            : selectedType === "family"

                ? [

                    "Family breakfast",

                    "Kid-friendly sightseeing",

                    "Nature experience",

                    "Relaxed evening"

                ]

                : selectedType === "friends"

                    ? [

                        "Group breakfast",

                        "Adventure activity",

                        "Local food tour",

                        "Sunset hangout"

                    ]

                    : [

                        "Local breakfast",

                        "Top attraction",

                        "Nature walk",

                        "Free evening"

                    ];


    /* DAILY ITINERARY */

    let days = "";


    for (
        let i = 1;
        i <= duration.days;
        i++
    ) {


        const activitiesForDay = [

            activities[
                (i - 1) %
                activities.length
            ],

            activities[
                i %
                activities.length
            ],

            activities[
                (i + 1) %
                activities.length
            ]

        ];


        days += `

            <div class="day">

                <h4>
                    DAY ${i}
                </h4>

                <p>
                    <b>Morning:</b>
                    ${activitiesForDay[0]}
                </p>

                <p>
                    <b>Afternoon:</b>
                    ${activitiesForDay[1]}
                </p>

                <p>
                    <b>Evening:</b>
                    ${activitiesForDay[2]}
                </p>

                <p class="muted">
                    Route:
                    Hotel → nearby attraction
                    → experience → Hotel
                </p>

            </div>

        `;
    }


    /* SAVE STATE */

    state.plan = {

        dest: destination,

        d: duration,

        people: people,

        budget: budget,

        total: total

    };


    /* DISPLAY SUMMARY */

    $("#summary").classList.add(
        "show"
    );


    $("#summary").innerHTML = `

        <h2>
            ✨ Your TripVista Plan
        </h2>

        <p class="muted">

            ${destination}
            ·
            ${duration.days} days /
            ${duration.nights} nights
            ·
            ${selectedType}

        </p>


        <div class="summary-grid">


            <div class="metric">

                <span class="muted">
                    Estimated total
                </span>

                <strong>
                    ${money(total)}
                </strong>

            </div>


            <div class="metric">

                <span class="muted">
                    Per person
                </span>

                <strong>
                    ${money(total / people)}
                </strong>

            </div>


            <div class="metric">

                <span class="muted">
                    Per day
                </span>

                <strong>
                    ${money(total / duration.days)}
                </strong>

            </div>


            <div class="metric">

                <span class="muted">
                    Accommodation
                </span>

                <strong>
                    ${money(accommodation)}
                </strong>

            </div>


            <div class="metric">

                <span class="muted">
                    Transport
                </span>

                <strong>
                    ${money(transportCost)}
                </strong>

            </div>


            <div class="metric">

                <span class="muted">
                    Activities
                </span>

                <strong>
                    ${money(activity)}
                </strong>

            </div>

        </div>


        <h3>
            Budget Status
        </h3>


        <div class="costbar">

            <span
                style="
                    width:
                    ${Math.min(
                        100,
                        budget
                            ? total / budget * 100
                            : 100
                    )}%;
                "
            ></span>

        </div>


        ${
            over

                ? `

                    <p>
                        ⚠️ Your current plan is approximately
                        <b>
                            ${money(over)}
                        </b>
                        over budget.
                    </p>

                    <button
                        class="btn"
                        id="optimize"
                    >
                        Optimize Budget
                    </button>

                `

                : `

                    <p>
                        ✅ Your plan is within
                        the selected budget.
                    </p>

                `
        }


        <h3 style="margin-top:25px">
            Return Journey
        </h3>


        <p class="muted">

            Return from
            ${destination}
            to your starting point by
            your selected transport.

            Estimated return cost:
            ${money(transportCost)}.

        </p>


        <h3 style="margin-top:25px">
            Daily Itinerary
        </h3>


        <div class="timeline">

            ${days}

        </div>


        <div
            style="
                display:flex;
                gap:10px;
                flex-wrap:wrap;
                margin-top:22px;
            "
        >

            <button
                class="btn primary"
                id="save"
            >
                Save Trip
            </button>


            <button
                class="btn"
                id="share"
            >
                Share Trip
            </button>


            <button
                class="btn"
                id="download"
            >
                Download Plan
            </button>


            <button
                class="btn"
                id="new"
            >
                Start New Trip
            </button>

        </div>

    `;


    /* SAVE */

    $("#save").onclick = () => {

        localStorage.setItem(
            "tripvistaPlan",
            JSON.stringify(state.plan)
        );

        toast(
            "Trip saved locally ✓"
        );

    };


    /* SHARE */

    $("#share").onclick = () => {

        if (navigator.share) {

            navigator.share({

                title:
                    "My TripVista Plan",

                text:
                    `${destination} — ${duration.days} days, estimated ${money(total)}`

            }).catch(() => {});

        } else {

            $("#shareModal")
                .classList.add("show");

        }

    };


    /* DOWNLOAD */

    $("#download").onclick =
        () => downloadPlan();


    /* NEW TRIP */

    $("#new").onclick = () => {

        localStorage.removeItem(
            "tripvistaPlan"
        );

        location.reload();

    };


    /* OPTIMIZE */

    const optimize =
        $("#optimize");


    if (optimize) {

        optimize.onclick = () => {

            $("#stay").value =
                "1200";

            toast(
                "Budget optimization applied. Generate the trip again to recalculate."
            );

        };

    }


    /* SCROLL TO SUMMARY */

    $("#summary").scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ================= DOWNLOAD PLAN ================= */

function downloadPlan() {

    if (!state.plan) {

        return;
    }


    const plan =
        state.plan;


    const text = `

TRIPVISTA TRAVEL PLAN

Destination:
${plan.dest}

Duration:
${plan.d.days} days /
${plan.d.nights} nights

Travelers:
${plan.people}

Estimated total:
${money(plan.total)}

Per person:
${money(
    plan.total /
    plan.people
)}

Generated by TripVista

`;


    const file =
        new Blob(
            [text],
            {
                type:
                    "text/plain"
            }
        );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(file);


    link.download =
        "tripvista-plan.txt";


    link.click();


    URL.revokeObjectURL(
        link.href
    );

}


/* ================= MODAL ================= */

function closeModal() {

    $("#shareModal")
        .classList
        .remove("show");

}


window.closeModal =
    closeModal;


/* ================= SHARE ================= */

$("#shareNow").onclick = () => {

    navigator.clipboard
        ?.writeText(location.href);

    toast(
        "Plan link copied"
    );

    closeModal();

};


/* ================= THEME ================= */

$("#theme").onclick = () => {

    const dark =
        document.documentElement
            .dataset
            .theme !== "light";


    document.documentElement
        .dataset
        .theme =
        dark
            ? "light"
            : "dark";


    localStorage.setItem(
        "tripvistaTheme",
        document.documentElement
            .dataset
            .theme
    );


    $("#theme").textContent =
        dark
            ? "🌙"
            : "☀️";

};


/* ================= LOAD THEME ================= */

if (
    localStorage.getItem(
        "tripvistaTheme"
    )
) {

    document.documentElement
        .dataset
        .theme =
        localStorage.getItem(
            "tripvistaTheme"
        );


    $("#theme").textContent =
        document.documentElement
            .dataset
            .theme === "light"
            ? "🌙"
            : "☀️";

}


/* ================= MOBILE MENU ================= */

$("#hamb").onclick = () => {

    const nav =
        $("#nav");


    nav.style.display =
        nav.style.display === "flex"
            ? "none"
            : "flex";


    if (innerWidth < 800) {

        Object.assign(
            nav.style,
            {

                position:
                    "absolute",

                top:
                    "70px",

                left:
                    "4%",

                right:
                    "4%",

                padding:
                    "20px",

                background:
                    "rgba(5,15,28,.96)",

                borderRadius:
                    "18px",

                flexDirection:
                    "column"

            }
        );

    }

};


/* ================= CONTACT FORM ================= */

$("#contactForm").onsubmit =
    (event) => {

        event.preventDefault();

        event.target.reset();

        toast(
            "Thanks! Your message was submitted in this demo."
        );

    };


/* ================= HEADER SCROLL ================= */

addEventListener(
    "scroll",
    () => {

        $("#header")
            .classList
            .toggle(
                "scrolled",
                scrollY > 30
            );

    }
);


/* ================= START ================= */

showStep(1);