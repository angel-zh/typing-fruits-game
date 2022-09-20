
const normalPrompts = [
    "apple",
    "bananas",
    "cantaloupe",
    "cherries",
    "lemons",
    "mango",
    "orange",
    "papaya",
    "peach",
    "pineapple",
    "strawberries",
    "watermelon"
]

const hardPrompts = [
    "My sister has a red apple.",
    "We got bananas from the store.",
    "I ate a slice of cantaloupe.",
    "These cherries are delicious.",
    "These lemons are so sour.",
    "I would like a mango please.",
    "An orange makes a great snack.",
    "My puppy loves yummy papaya.",
    "We grow peach trees in a yard.",
    "Cut the pineapple in half.",
    "My brother picked strawberries.",
    "Please hand me a slice of watermelon."
]

const fruitImages = {
    apple: "game-images/apple.png",
    bananas: "game-images/bananas.png",
    cantaloupe: "game-images/cantaloupe.png",
    cherries: "game-images/cherries.png",
    lemons: "game-images/lemons.png",
    mango: "game-images/mango.png",
    orange: "game-images/orange.png",
    papaya: "game-images/papaya.png",
    peach: "game-images/peach.png",
    pineapple: "game-images/pineapple.png",
    strawberries: "game-images/strawberries.png",
    watermelon: "game-images/watermelon.png"
}

// buttons
const playGameBtn = document.getElementById('play-game')
const instructionsBtn = document.getElementById('instrucitons')
const okayBtn = document.getElementById('instr-okay')
const normalBtn = document.getElementById('normal')
const hardBtn = document.getElementById('hard')
const bonusStartBtn = document.getElementById('bonus-start')
const playAgainBtn = document.getElementById('play-again')

//sections and divs
const diffLvlPage = document.getElementById('difficulty-lvl-div')
const instructionsPage = document.getElementById('instructions-div')
const gameOverPage = document.getElementById('game-over-page')
const winPage = document.getElementById('win-page')

// others
const prompt = document.getElementById('prompt')
const timer = document.getElementById('timer')
const userInput = document.getElementById('user-input')


let difficulty = null
let randomArray = []
let currentIndex = 0
let time = 6 
let score = 0
let isGameOver = false

// sets the timer conditions and displays on the UI
// to be passed into setInterval() function
const runTimer = () => {
    if (time === 0) {
        isGameOver = true
    } else {
        time--
    }
    timer.innerHTML = `<span id="time">${time}</span>s left`
}


// in order to randomize the prompts in an array, use what is called 'Fisher-Yates Shuffle' algorithm
// selects element of random index to switch with current element
const randomizePrompts = array => { 
    // clone original array
    randomArray = array.slice() 
    for (let i = randomArray.length - 1; i > 0; i--) { 
        // generates random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1)) 
        // swaps current element with random element
        const temp = randomArray[i] 
        randomArray[i] = randomArray[j] 
        randomArray[j] = temp 
    }
    return randomArray
}


// function to display prompts listed in randomArray
const displayPrompts = () => {
    prompt.innerText = randomArray[currentIndex]
}

// compare user input to prompt
// if there is a match, move onto next index in randomArray and increase score
const compareInput = () => {
    displayPrompts()
    if (userInput === prompt.innerText) {
        currentIndex++
        score += 10
        scoreText.innerText = score
    } else {
        isGameOver = true
    }
}

const displayResult = () => {
    if (isGameOver) {

    }
}

const startGame = () => {
    timer.innerHTML = `<span id="time">${time}</span>s left`
}


playGameBtn.addEventListener('click', () => {
    diffLvlPage.classList.remove('hide')
})

instructionsBtn.addEventListener('click', () => {
    instructionsPage.classList.remove('hide')
})

okayBtn.addEventListener('click', () => {
    instructionsPage.classList.add('hide')
})