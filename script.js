const generateAvatar = require('./openaiController');


const cardButton = document.querySelector(".card-button");
const clearCards = document.querySelector(".clear-cards");
const cardContainer = document.querySelector(".card-container");
const deleteCards = document.querySelector(".delete-cards");
const getAvatar = document.querySelector(".get-avatar");

let newGenPrompt = [];


function getCards() {

    fetch("https://tarot-api.onrender.com/api/v1/cards/random?n=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // handle random card   
            const card = response.cards[0];
            const cardName = card.name;
            newGenPrompt.push(cardName);

            // if (cardContainer.hasChildNodes()) {
            //     cardContainer.removeChild(cardContainer.firstChild);
            // }

            const cardBody = document.createElement("div");
            const cardDelete = document.createElement("button");
            const cardTitle = document.createElement("h5");
            const cardText = document.createElement("p");

            cardBody.classList.add("card-body");
            cardDelete.classList.add("card-delete");
            cardTitle.classList.add("card-title");
            cardText.classList.add("card-text");

            cardTitle.textContent = cardName;
            cardDelete.textContent = "X";
            // cardText.textContent = card.meaning_up;

            cardContainer.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardDelete);

        })
        .catch(function (error) {
            // handle what went wrong
            console.log(error);
        })
        .then(() => {
            console.log(newGenPrompt);
            return newGenPrompt
        });
}

function deleteCard(event) {
    const card = event.target.parentNode;
    const cardIndex = Array.from(cardContainer.children).indexOf(card);
    newGenPrompt.splice(cardIndex, 1);
    card.remove();
    // cardContainer.removeChild(cardTarget);
    // newGenPrompt.splice(cardTarget, 1);
    // console.log(newGenPrompt);
}

// OPEN AI IMAGE GENERATOR
// https://beta.openai.com/docs/api-reference/images

// function generateAvatar(apiKey, arr) {
//     function promptString() {
//         console.log(arr);
//         const prompt = "Create an avatar that combines the elements of the following cards: " + arr.join(", ") + " in the style of Alestair Crowley's Thoth Tarot Deck."
//         return prompt;
//     }
//     const prompt = promptString();

//     function imageGenerator(apiKey, imageUrl, prompt, model = "image-alpha-001", numImages = 1, size = "1024x1024", responseFormat = "url") {
//         return fetch("https://api.openai.com/v1/images/generations", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify({
//                 model,
//                 prompt,
//                 num_images: numImages,
//                 size,
//                 response_format: responseFormat,
//                 image_url: imageUrl,
//             }),
//         })
//             .then((response) => {
//                 console.log(response);
//                 response.json()
//             })
//             .then((data) => data.data[0].url)
//             .catch((error) => console.log(error));
//     }

//     imageGenerator(apiKey, "", prompt, "image-alpha-001", 1, "1024x1024", "url").then((url) => console.log(url))
//         .catch((error) => console.log(error));

// };


$(cardButton).click(getCards);
$(clearCards).click(function () {
    cardContainer.innerHTML = "";
});
$(cardContainer).click(function (event) {
    if (event.target.classList.contains("card-delete") === true) {
        deleteCard(event);
    }
});

// Call the function with newGenPrompt as an argument
$(getAvatar).click(function () {
    generateAvatar(apiKey, newGenPrompt);
});
