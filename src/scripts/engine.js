const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),

    },
    fieldCards: {
        player: document.getElementById("player-field-cards"),
        computer: document.getElementById("computer-field-cards"),
    },
    button: {
        button: document.getElementById("next-duel")
    }
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"
}

const pathImages = "src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1]
    }
];

async function getRamdomCardId(){
    const randomIndex = Math.floor(Math.random()* cardData.length); 
    return cardData[randomIndex].id;
}

async function createCardimage(Idcard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${pathImages}card-back.png`);
    cardImage.setAttribute("data-id" , Idcard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1){
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(Idcard)
        });
        cardImage.addEventListener("click", () =>{
        setCardsField (cardImage.getAttribute("data-id"));
    });
    
    }
    return cardImage;
}

async function setCardsField(cardId){

    await removeAllCardsImages();

    let computerCardId = await getRamdomCardId();
    
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResult = await checkDuelResult(cardId, computerCardId); 

    await updateScore();
    await drawButton ();
}

async function removeAllCardsImages(){
    let cards = document.querySelector("#computer-cards");
    let imgElements =  cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove()); 

    cards = document.querySelector("#player-cards");
    imgElements =  cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove()); 
}

async function drawSelectCard(index) {
    
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
    state.cardSprites.avatar.src=cardData[index].img;
}

async function drawCards(cardNumber, fieldSide){
    for (let i=0; i < cardNumber; i++){
        const ramdomIdcard = await getRamdomCardId();
        const cardImage = await createCardimage(ramdomIdcard,fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}


function init() {
    drawCards (5, playerSides.player1);
    drawCards (5, playerSides.computer);
}
init();