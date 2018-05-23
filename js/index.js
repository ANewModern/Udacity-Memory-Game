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
            console.log(cardPairs);
            if (cardPairs.length === 2) { //checks to see if two cards have been clicked on
                if (cardNumbers[cardPairs[0]] === cardNumbers[cardPairs[1]]) { // if they are the same add them to the completed pairs list
                    completedPairs = completedPairs.concat(cardPairs);
                    console.log('Completed Pairs: ', completedPairs);
                    cards[cardPairs[0]].querySelector('.back').style.background = 'yellow';
                    cards[cardPairs[1]].querySelector('.back').style.background = 'yellow';
                } else { // else flip the cards to the default position
                    cards[cardPairs[0]].classList.toggle("flip");
                    cards[cardPairs[1]].classList.toggle("flip");
                }
                cardPairs = []; // empty the cardPair array
            }
        } else {
            cardPairs = []; // empty the cardPair array
        }
    }
}

let cards = document.querySelectorAll('.flip-container'); //NodeList for all divs with class flip-container
let cardPairs = []; //Stores pairs to check if they are valid
let completedPairs = []; //Completed pairs are stored here
const cardNumbers = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]); //Game array, pairs that each belong to one card

for (let i = 0; i < cards.length; i++) {
    cards[i].querySelector('.back').innerHTML = cardNumbers[i]; //Sets a value for the 'back' of a card using the cardNumbers array
    cards[i].addEventListener('click', (e) => onCardClick(i)); //adds a click event to every item in the cards nodelist
}