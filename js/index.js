//document.querySelector("#myCard").classList.toggle("flip");

let cards = document.querySelectorAll('.flip-container');
console.log(cards);

for (let i=0; i<cards.length; i++) {
    cards[i].addEventListener('click', () => {
        document.querySelector(`.flip-container-${i+1}`).classList.toggle("flip");
    });
}