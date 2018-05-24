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
//Converts milliseconds to minutes and seconds
function millisToMinutesAndSeconds(ms) {
	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);

	let minuteStr = minutes.toString(10);
    if (minuteStr.length === 1) {
		return `0${minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
	} else {
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
	
}
//When the user clicks on a card, this code runs
const onCardClick = (cardNumber) => {
	if (completedPairs.indexOf(cardNumber) === -1) { // checks if the card clicked on is already in the array completedPairs
		cards[cardNumber].classList.toggle("flip"); //toggles a class for the flip-container clicked on
		if (timerStart) { // Timer starts as soon as the cards is click on
			timerStart = false;
			timer = setInterval(() => {
				ms += 1000;
				document.querySelector('.timer').innerHTML = millisToMinutesAndSeconds(ms);
			}, 1000);
		}
		if (cardPairs.indexOf(cardNumber) === -1) { // checks if the card clicked on is in the array cardPairs
			cardPairs.push(cardNumber);
			console.log('Cards Selected: ', cardPairs);
			if (cardPairs.length === 2) { //checks to see if two cards have been clicked on
				moveCounter += 1;
				document.querySelector('#moves').innerHTML = moveCounter;
				checkRating();
				if (cardNumbers[cardPairs[0]] === cardNumbers[cardPairs[1]]) { // if they are the same add them to the completed pairs list
					completedPairs = completedPairs.concat(cardPairs);
					console.log('Completed Pairs: ', completedPairs);
					checkCompletion();
					cards[cardPairs[0]].querySelector('.back').style.background = '#13E2BA';
					cards[cardPairs[1]].querySelector('.back').style.background = '#13E2BA';
				} else { // else flip the cards to the default position
					let cardPairOne = cardPairs[0];
					let cardPairTwo = cardPairs[1];
					cards[cardPairs[0]].querySelector('.back').style.background = '#F95B3C';
					cards[cardPairs[1]].querySelector('.back').style.background = '#F95B3C';
					setTimeout(() => { //Waits .5 seconds before removing the class and flipping the card.
						cards[cardPairOne].classList.toggle("flip");
						cards[cardPairTwo].classList.toggle("flip");
					}, 500);
					setTimeout(() => {
						cards[cardPairOne].querySelector('.back').style.background = '#12C1DF';
						cards[cardPairOne].querySelector('.back').style.background = '#12C1DF';
					}, 800);
				}
				cardPairs = []; // empty the cardPair array
			}
		} else {
			cardPairs = []; // empty the cardPair array
		}
	}
}
// Checks how many moves have been done and rates the progress
const checkRating = () => {
	if (moveCounter > 15) {
		rating = '★☆☆';
		document.querySelector('.completed').innerHTML = `${rating} <span id="moves">${moveCounter}</span> Moves`;
	} else if (moveCounter > 10) {
		rating = '★★☆';
		document.querySelector('.completed').innerHTML = `${rating} <span id="moves">${moveCounter}</span> Moves`;
	}
}
// Checks the completion of the game
const checkCompletion = () => {
	const completed = completedPairs.length;
	if (completed === 16) {
		clearInterval(timer);
		setTimeout(() => {
			document.querySelector('#winning-dialog').innerHTML = `You won in ${moveCounter} moves and ${millisToMinutesAndSeconds(ms)} minutes with a rating of ${rating} stars!`
			document.querySelector('.container').style.display = 'none';
			document.querySelector('.counter-container').style.display = 'none';
			document.querySelector('.completed-container').style.display = 'flex';
		}, 1500);
	}
}
const resetGame = () => { //Resets the game
	cardPairs = [];
	completedPairs = [];
	moveCounter = 0;
	rating = '★★★';
	document.querySelector('.completed').innerHTML = `${rating} <span id="moves">${moveCounter}</span> Moves`;
	document.querySelector('#moves').innerHTML = 0;
	cardNumbers = shuffle(icons.concat(icons));
	for (let i = 0; i < cards.length; i++) {
		cards[i].classList.remove("flip");
	}
	setTimeout(() => { //this is seperate so the card backs changes after the card flip animation finishes
		for (let i = 0; i < cards.length; i++) {
			cards[i].querySelector('.back').style.background = '#12C1DF';
			cards[i].querySelector('.back').innerHTML = cardNumbers[i];
		}
	}, 500);
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
let rating = '★★★'; // Star ratings
let ms = 0; // Amount of milliseconds that have passed
let timerStart = true; // starts the timer
let timer; // timer variable, later set when the player clicks on a card
const icons = ['☎', '📷', '🎮', '🎬', '⚓', '🕮', '⌚', '🗑']; //icons used in game
let cardNumbers = shuffle(icons.concat(icons)); //Game array, pairs that each belong to one card
const reset = document.querySelector('.reset').addEventListener('click', () => resetGame());
const resetButton = document.querySelector('.reset-button').addEventListener('click', () => resetGame());
for (let i = 0; i < cards.length; i++) {
	cards[i].querySelector('.back').innerHTML = cardNumbers[i]; //Sets a value for the 'back' of a card using the cardNumbers array
	cards[i].addEventListener('click', (e) => onCardClick(i)); //adds a click event to every item in the cards nodelist
}