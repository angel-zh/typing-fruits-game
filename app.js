
// buttons
const playGameBtn = document.getElementById('play-game-btn')
const instructionsBtn = document.getElementById('instructions-btn')
const okayBtn = document.getElementById('okay-btn')
const xBtn = document.getElementById('x-btn')
const normalBtn = document.getElementById('normal-btn')
const hardBtn = document.getElementById('hard-btn')
const bonusStartBtn = document.getElementById('bonus-start-btn')
const playAgainBtn = document.getElementById('play-again-btn')

//sections and divs
const gameContainer = document.getElementById('game-container')
const landingPage = document.getElementById('landing-page')
const diffLvlPage = document.getElementById('difficulty-lvl-div')
const instructionsPage = document.getElementById('instructions-div')
const gameOverPage = document.getElementById('game-over-page')
const winPage = document.getElementById('win-page')

// others
const textSection = document.getElementById('text-section')
const prompt = document.getElementById('prompt')
const timer = document.getElementById('timer')
const userInput = document.getElementById('user-input')
const scoreText = document.querySelectorAll('.scoreText')

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
    "These lemons are too sour.",
    "I would like a mango please.",
    "An orange makes a great snack.",
    "My puppy loves yummy papaya.",
    "We grow peach trees in a yard.",
    "Chop the pineapple in half.",
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


let time = [6, 20] // time[0] is for part I, time[1] is for bonus level
let randomArray = []
let currentIndex = 0
let score = 0
let isGameOver = false
let isTimesUp = false

// sets the timer conditions and displays on the UI
const runTimer = index => {
    if (time[index] === 0) {
        isTimesUp = true
        const message = document.createElement('p')
        message.innerHTML = "Time's up!"
        message.style.color = "tomato"
        timer.appendChild(message)
        
    } else {
        time[index]--
    }
    timerText.innerHTML = time
}

// in order to randomize the prompts in an array, use what is called 'Fisher-Yates Shuffle' algorithm
// selects element of random index to switch with current element
const randomizePrompts = array => { 
    // clone original array to be used as prompt list
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


// display prompts and compare user input text to prompt
// if there is a match, move onto next index in randomArray and increase score
const compareInput = () => {
    prompt.innerText = randomArray[currentIndex]
    if (userInput.value === prompt.innerText) {
        currentIndex++
        score += 10
        scoreText.innerText = score
    } else {
        isGameOver = true
    }
}

const displayResult = () => {
    if (isGameOver && isTimesUp) {
        scoreText.innerText = score
        gameContainer.classList.add('hide')
        gameOverPage.classList.remove('hide')
    }
}

const startGame = () => {
    timerText.innerHTML = time
}


// event listeners for all buttons
playGameBtn.addEventListener('click', () => {
    diffLvlPage.classList.remove('hide')
})

instructionsBtn.addEventListener('click', () => {
    instructionsPage.classList.remove('hide')
})

okayBtn.addEventListener('click', () => {
    instructionsPage.classList.add('hide')
})

normalBtn.addEventListener('click', () => {
    diffLvlPage.classList.add('hide')
    landingPage.classList.add('hide')
    randomizePrompts(normalPrompts)
    textSection.classList.remove('hide')
})

hardBtn.addEventListener('click', () => {
    diffLvlPage.classList.add('hide')
    landingPage.classList.add('hide')
    randomizePrompts(hardPrompts)
    textSection.classList.remove('hide')
})

xBtn.addEventListener('click', () => {
    diffLvlPage.classList.add('hide')
})