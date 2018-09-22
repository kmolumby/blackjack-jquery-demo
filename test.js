const deck = {
    cards: [],
    deal(player){
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const cardToDeal = this.cards.splice(randomIndex, 1)[0];
        player.hand.push(cardToDeal);
    }
}
class Player{
    constructor(){
        this.hand = [];
    }
}
const humanPlayer = new Player();
const computerPlayer = new Player();
class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
}
const suits = ["hearts","spades","clubs","diamonds"]
for(let i = 1; i < 14; i++){
    for(let x = 0; x < suits.length; x++){
        let card = new Card(suits[x], i);
        deck.cards.push(card);
    }
}
const dealStartingHands = () => {
    for(let i = 0; i < 2; i++){
        deck.deal(humanPlayer);
        deck.deal(computerPlayer);
    }
}
const calculateScore = () => {
    let sum = 0;
    for(let i = 0; i < humanPlayer.hand.length; i++){
        let card = humanPlayer.hand[i];
        sum += card.value;
    }
    humanPlayer.points = sum;
    if(humanPlayer.points > 21){
        console.log("YOU LOSE");
    }
}
const displayStats = () => {
    $('.player-hand').empty();
    $('.player-hand').append("<h2>Your cards</h2>")
    $('.points').text(`YOU HAVE ${humanPlayer.points} POINTS`)
    humanPlayer.hand.forEach((card)=>{
        $('.player-hand').append(`<p>${card.value} of ${card.suit}`)
    })
}
const displayChoice = () => {
    console.log("CHOOSE YOUR DESTINY")
    $('.choices').append("<button class='choice-button' id='hit'>HIT ME</button>")
    $('.choices').append("<button class='choice-button' id='stand'>ILL STAND</button>")
}
const endRound = () => {
    console.log("GAME OVER MAN")
    $('.choices').empty();
    let computerPoints = 0;
    for(let i = 0; i < computerPlayer.hand.length; i++){
        computerPoints += computerPlayer.hand[i].value;
    }
    computerPlayer.points = computerPoints;
    $('.computer-points').text(`THE COMPUTER HAS ${computerPoints} POINTS`)
    if(computerPlayer.points >= humanPlayer.points){
        console.log("YOU LOSE")
    }else{
        console.log("YOU WIN")
    }
}
$('.start-game').click((e)=>{
    $(e.currentTarget).remove();
    dealStartingHands()
    calculateScore();
    displayStats();
    displayChoice();
})
$('.choices').on('click', '.choice-button', (e)=>{
    const choice = e.target.id;
    console.log(`YOU CHOSE ${choice}`)
    if(choice === 'hit'){
        deck.deal(humanPlayer);
        calculateScore()
        displayStats();
    }else{
        endRound();
    }
})