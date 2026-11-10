import {textNodes} from "./textNodes.js";

const titleElement = document.getElementById("title");
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

// Toggle button visibility
function hideButtons(hide) {
    const buttons = document.querySelectorAll(".choice");
    for (let button of buttons) {
        button.hidden = hide;
    }
}

// Justify buttons
function justifyButtons() {
    const buttons = document.querySelectorAll(".choice");
    if (buttons.length === 1) {
        choicesElement.style.justifyContent = "center";
    }
    else {
        choicesElement.style.justifyContent = "space-between";
    }
}

// Display text node's content
function showTextNode(textNodeIndex) {
    if (window.animationInterval) {
        clearInterval(window.animationInterval);
    }

    const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
    titleElement.innerText = textNode.title;
    storyElement.textContent = "";

    const bgElement = document.getElementById("background");
    bgElement.style.backgroundImage = 'url("' + textNode.img + '")';
    bgElement.style.backgroundSize = "cover";
    bgElement.style.backgroundPosition = "center";

    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }

    // Add clickable buttons for each choice in the text node
    textNode.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("choice");
        button.addEventListener("click", () => selectOption(option));
        choicesElement.appendChild(button);
    });

    // Splits words into chars
    const word = textNode.text.split("");
    let index = 0;

    // Hide buttons
    hideButtons(true);

    // Animate text showing up char by char
    window.animationInterval = setInterval(() => {
        if (index < word.length) {
            storyElement.textContent += word[index++];
        }
        else {
            // Reveal buttons when all text content has been displayed
            clearInterval(window.animationInterval);
            hideButtons(false);
            justifyButtons();
        }
    }, 1);
}

// Display content based on selected option
function selectOption(option) {
    if (option.action === "link") {
        window.open(option.linkUrl, "_blank");
        return;
    }
    const nextTextNodeId = option.nextText;
    showTextNode(nextTextNodeId);
}

window.onload = () => showTextNode(1);