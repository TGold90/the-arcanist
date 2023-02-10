const cardButton = document.querySelector(".card-button");
const clearCards = document.querySelector(".clear-cards");
const cardContainer = document.querySelector(".card-container");

function getCards() {
    fetch("https://tarot-api.onrender.com/api/v1/cards/random?n=1")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // handle random card
            console.log(response);
            const card = response.cards[0];
            console.log(card);

            // if (cardContainer.hasChildNodes()) {
            //     cardContainer.removeChild(cardContainer.firstChild);
            // }

            const cardBody = document.createElement("div");
            const cardTitle = document.createElement("h5");
            const cardText = document.createElement("p");

            cardBody.classList.add("card-body");
            cardTitle.classList.add("card-title");
            cardText.classList.add("card-text");

            cardTitle.textContent = card.name;
            cardText.textContent = card.meaning_up;

            cardContainer.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

        })
        .catch(function (error) {
            // handle what went wrong
            console.log(error);
        });
}



$(cardButton).click(getCards);
$(clearCards).click(function () {
    cardContainer.innerHTML = "";
});