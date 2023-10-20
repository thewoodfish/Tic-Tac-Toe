
const textContainer = document.getElementById("text-container");
const showButton = document.getElementById("show-button");
const paragraphs = document.querySelectorAll(".animation-text");
let currentIndex = 0;

function showNextParagraph() {
    if (currentIndex < paragraphs.length) {
        const paragraph = paragraphs[currentIndex];
        console.log(paragraph);

        setTimeout(() => {
            paragraph.style.opacity = "1";
            paragraph.style.transform = "translateY(0)";
        }, 500);

        currentIndex++;

        if (currentIndex === paragraphs.length) {
                setTimeout(() => {
                    showButton.style.opacity = "1";
                    showButton.style.transform = "translateY(0)";
                }, 1500);
        } else {
            setTimeout(showNextParagraph, 1000);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(showNextParagraph, 1500);
});
