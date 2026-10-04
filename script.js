document.addEventListener("DOMContentLoaded", () => {

    // ================= BEGIN BUTTON =================

    const beginBtn = document.getElementById("beginBtn");

    beginBtn.addEventListener("click", () => {

        document.querySelector(".intro").scrollIntoView({
            behavior: "smooth"
        });

    });


    // ================= SCROLL REVEAL =================

    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {

        revealElements.forEach((element) => {

            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (position < windowHeight - 100) {
                element.classList.add("show");
            }

        });

    };

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();


    // ================= SCRATCH CARD =================

    const canvas = document.getElementById("scratchCanvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        function setupScratchCanvas() {

            const rect = canvas.getBoundingClientRect();

            const ratio = window.devicePixelRatio || 1;

            canvas.width = rect.width * ratio;
            canvas.height = rect.height * ratio;

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

            // Scratch surface
            ctx.globalCompositeOperation = "source-over";

            ctx.fillStyle = "#b8b8b8";
            ctx.fillRect(0, 0, rect.width, rect.height);

            // Scratch text
            ctx.fillStyle = "#777";
            ctx.font = "bold 18px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "✦  SCRATCH HERE  ✦",
                rect.width / 2,
                rect.height / 2
            );

        }

        setupScratchCanvas();


        // ================= SCRATCHING =================

        let isScratching = false;

        function scratch(event) {

            if (!isScratching) return;

            const rect = canvas.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            ctx.globalCompositeOperation = "destination-out";

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                22,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        // Start scratching
        canvas.addEventListener("pointerdown", (event) => {

            isScratching = true;

            canvas.setPointerCapture(event.pointerId);

            scratch(event);

        });


        // Continue scratching
        canvas.addEventListener("pointermove", scratch);


        // Stop scratching
        canvas.addEventListener("pointerup", (event) => {

            isScratching = false;

            canvas.releasePointerCapture(event.pointerId);

        });


        canvas.addEventListener("pointercancel", () => {

            isScratching = false;

        });

    }


    // ================= SUBJECT HOVER EFFECT =================

    const subjects = document.querySelectorAll(".subjects div");

    subjects.forEach((subject) => {

        subject.addEventListener("mouseenter", () => {

            subject.style.letterSpacing = "3px";

        });

        subject.addEventListener("mouseleave", () => {

            subject.style.letterSpacing = "2px";

        });

    });

});