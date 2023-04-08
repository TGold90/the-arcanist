const cardButton = document.querySelector(".card-button");
const clearCards = document.querySelector(".clear-cards");
const cardContainer = document.querySelector(".card-container");
const deleteCards = document.querySelector(".delete-cards");
const getAvatar = document.querySelector(".get-avatar");
const spinner = document.querySelector(".spinner");

let currentCards = [];
let imageURL;

function showSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("show");
}

function removeSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
}

async function generateImageRequest(prompt) {
    try {

        const response = await fetch('/openai/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

async function getCards() {

    try {
        showSpinner();

        const response = await fetch("https://tarot-api.onrender.com/api/v1/cards/random?n=1");
        const data = await response.json();
        const card = data.cards[0];
        const cardName = card.name;
        currentCards.push(cardName);

        const imageData = await generateImageRequest("Tarot card: " + cardName + "in the style of the Thoth Deck");
        imageURL = imageData.data;
        // handle card display
        const cardBody = document.createElement("div");
        const cardImage = document.createElement("img");
        const cardDelete = document.createElement("button");
        const cardTitle = document.createElement("h5");
        const cardText = document.createElement("p");

        cardBody.classList.add("card-body");
        cardDelete.classList.add("card-delete");
        cardTitle.classList.add("card-title");
        cardText.classList.add("card-text");
        //add card image
        cardImage.src = imageURL;


        cardTitle.textContent = cardName;
        cardDelete.textContent = "X";
        // cardText.textContent = card.meaning_up;

        cardContainer.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardDelete);

        removeSpinner();
    } catch (error) {
        console.log(error);
        removeSpinner();
    }
}

function deleteCard(event) {
    const card = event.target.parentNode;
    const cardIndex = Array.from(cardContainer.children).indexOf(card);
    currentCards.splice(cardIndex, 1);
    card.remove();
    // cardContainer.removeChild(cardTarget);
    // currentCards.splice(cardTarget, 1);
    // console.log(currentCards);
}

$(cardButton).click(getCards);
$(clearCards).click(function () {
    cardContainer.innerHTML = "";
});
$(cardContainer).click(function (event) {
    if (event.target.classList.contains("card-delete") === true) {
        deleteCard(event);
    }
});

$(getAvatar).click(async function () {
    const prompt = 'thomas goldstein';
    await generateImageRequest(prompt);
});