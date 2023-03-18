const cardButton = document.querySelector(".card-button");
const clearCards = document.querySelector(".clear-cards");
const cardContainer = document.querySelector(".card-container");
const deleteCards = document.querySelector(".delete-cards");

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
        });
    console.log(newGenPrompt);
    return newGenPrompt;
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


$(cardButton).click(getCards);
$(clearCards).click(function () {
    cardContainer.innerHTML = "";
});

$(cardContainer).click(function (event) {
    if (event.target.classList.contains("card-delete") === true) {
        deleteCard(event);
    }
});