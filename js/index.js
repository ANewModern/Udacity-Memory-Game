//Fisher–Yates shuffle to randomize every game
const shuffle = (array) => {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//When the user clicks on a card, this code runs
const onCardClick = (cardNumber) => {
    if (completedPairs.indexOf(cardNumber) === -1) { // checks if the card clicked on is already in the array completedPairs
        cards[cardNumber].classList.toggle("flip"); //toggles a class for the flip-container clicked on
        if (cardPairs.indexOf(cardNumber) === -1) { // checks if the card clicked on is in the array cardPairs
            cardPairs.push(cardNumber);
            console.log('Cards Selected: ', cardPairs);
            moveCounter += 1;
            document.querySelector('#moves').innerHTML = moveCounter;
            if (cardPairs.length === 2) { //checks to see if two cards have been clicked on
                if (cardNumbers[cardPairs[0]] === cardNumbers[cardPairs[1]]) { // if they are the same add them to the completed pairs list
                    completedPairs = completedPairs.concat(cardPairs);
                    console.log('Completed Pairs: ', completedPairs);
                    checkCompletion();
                    cards[cardPairs[0]].querySelector('.back').style.background = '#13E2BA';
                    cards[cardPairs[1]].querySelector('.back').style.background = '#13E2BA';
                } else { // else flip the cards to the default position
                    let cardPairOne = cardPairs[0];
                    let cardPairTwo = cardPairs[1];
                    setTimeout(() => { //Waits 1.2 seconds before removing the class and flipping the card.
                        cards[cardPairOne].classList.toggle("flip");
                        cards[cardPairTwo].classList.toggle("flip");
                    }, 800);
                }
                cardPairs = []; // empty the cardPair array
            }
        } else {
            cardPairs = []; // empty the cardPair array
        }
    }
}

// Checks the completion of the game
const checkCompletion = () => {
    const completed = completedPairs.length / 4;
    switch (completed) {
        case 1:
            document.querySelector('.completed').innerHTML = `★☆☆☆ <span id="moves">${moveCounter}</span> Moves`;
            break;
        case 2:
            document.querySelector('.completed').innerHTML = `★★☆☆ <span id="moves">${moveCounter}</span> Moves`;
            break;
        case 3:
            document.querySelector('.completed').innerHTML = `★★★☆ <span id="moves">${moveCounter}</span> Moves`;
            break;
        case 4:
            document.querySelector('.completed').innerHTML = `★★★★ <span id="moves">${moveCounter}</span> Moves`;
            document.querySelector('#winning-dialog').innerHTML = `You won in ${moveCounter} moves!`
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.counter-container').style.display = 'none';
            document.querySelector('.completed-container').style.display = 'flex';
            break;
    }
}

const resetGame = () => { //Resets the game
    cardPairs = [];
    completedPairs = [];
    moveCounter = 0;
    document.querySelector('.completed').innerHTML = `☆☆☆☆ <span id="moves">${moveCounter}</span> Moves`;
    document.querySelector('#moves').innerHTML = 0;
    cardNumbers = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]);
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("flip");
        cards[i].querySelector('.back').style.background = '#12C1DF';
        cards[i].querySelector('.back').innerHTML = cardNumbers[i];
    }
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.counter-container').style.display = 'flex';
    document.querySelector('.completed-container').style.display = 'none';
    console.log('Game Reset');
}

// ★ ☆ stars for using later
let cards = document.querySelectorAll('.flip-container'); //NodeList for all divs with class flip-container
let cardPairs = []; //Stores pairs to check if they are valid
let completedPairs = []; //Completed pairs are stored here
let moveCounter = 0; // Number of moves done
let cardNumbers = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]); //Game array, pairs that each belong to one card
const reset = document.querySelector('.reset').addEventListener('click', () => resetGame());
const resetButton = document.querySelector('.reset-button').addEventListener('click', () => resetGame());

for (let i = 0; i < cards.length; i++) {
    cards[i].querySelector('.back').innerHTML = cardNumbers[i]; //Sets a value for the 'back' of a card using the cardNumbers array
    cards[i].addEventListener('click', (e) => onCardClick(i)); //adds a click event to every item in the cards nodelist
}