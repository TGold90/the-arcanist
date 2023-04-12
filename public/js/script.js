const cardButton = document.querySelector(".card-button");
const clearCards = document.querySelector(".clear-cards");
const cardContainer = document.querySelector(".card-container");
const deleteCards = document.querySelector(".delete-cards");
const getAvatar = document.querySelector(".get-avatar");
const spinner = document.querySelector(".spinner");
const saveButton = document.querySelector(".save-button");

let currentCards = {
    names: [],
    images: []
};
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
        console.log(card);
        const cardName = card.name;



        const imageData = await generateImageRequest("Tarot card: " + cardName + "in the style of adventure time");
        imageURL = imageData.data;

        currentCards.names.push(cardName);
        currentCards.images.push(imageURL);

        // handle card display
        const cardBody = document.createElement("div");
        const cardHeader = document.createElement("div");
        const cardImage = document.createElement("img");
        const cardDelete = document.createElement("button");
        const cardSave = document.createElement("button");
        const cardTitle = document.createElement("h5");
        const cardText = document.createElement("p");

        cardBody.classList.add("card-body");
        cardDelete.classList.add("card-delete");
        cardTitle.classList.add("card-title");
        cardText.classList.add("card-text");
        cardHeader.classList.add("card-header");
        cardImage.classList.add("card-image");
        cardSave.classList.add("card-save");
        //add card image
        cardImage.src = imageURL;
        // cardImage.src = "IMG_1378.png";


        cardTitle.textContent = cardName;
        cardDelete.textContent = "X";
        cardSave.textContent = "Save";
        // cardText.textContent = card.meaning_up;

        cardContainer.appendChild(cardBody);
        cardBody.appendChild(cardHeader);
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardSave);
        cardHeader.appendChild(cardDelete);
        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardText);

        removeSpinner();
    } catch (error) {
        console.log(error);
        removeSpinner();
    }
    console.log(cardContainer)
}

//save one card and all of its data to local storage
function saveCards() {
    localStorage.setItem("currentCards", JSON.stringify(currentCards));
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

// $(getAvatar).click(async function () {
//     const prompt = 'thomas goldstein';
//     await generateImageRequest(prompt);
// });

$(saveButton).click(saveCards);

