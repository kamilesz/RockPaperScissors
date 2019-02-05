// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/
const gameSummary = {
    numers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll('.select img')];

//
function handSelection() {
    console.log(this);
    document.querySelector('.select h3').style.boxShadow = "";
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 6px 2px #00cc00';
}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if (player === "papier" && ai === "kamień" || player === "kamień" && ai === "nożyczki" || player === "nożyczki" && ai === "papier") {
        return 'win'
    } else {
        return 'loss'
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numers;
    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = endGameWin();
        document.querySelector('[data-summary="who-win"]').style.color = "#00cc00";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = endGameLost();
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = endGameDraw();
        document.querySelector('[data-summary="who-win"]').style.color = "#ff8000";

    }
}

function endGameWin() {
    const winArray = ["You may have to fight a battle more than once to win it.", "You can never quit. Winners never quit, and quitters never win.", "Nobody gets lucky all the time. Nobody can win all the time. Nobody's a robot. Nobody's perfect."];
    return winArray[Math.floor(Math.random() * winArray.length)];
}

function endGameLost() {
    const lostArray = ["Sometimes by losing a battle you find a new way to win the war.", "You can't win unless you learn how to lose.", "Sometimes it is better to lose and do the right thing than to win and do the wrong thing."];
    return lostArray[Math.floor(Math.random() * lostArray.length)];
}

function endGameDraw() {
    const drawArray = ["Still in game", "No matter if you win or lose, the most important thing in life is to enjoy what you have.", "Keep fightig"];
    return drawArray[Math.floor(Math.random() * drawArray.length)];
}

function endGame() {
    document.querySelector(`[data-option = "${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = "";
}

function startGame() {
    if (!game.playerHand) {
        document.querySelector('.select h3').style.boxShadow = "0 0 6px 2px red";
        return;
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame()
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame);