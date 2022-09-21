
// buttons
const playGameBtn = document.getElementById('play-game-btn')
const instructionsBtn = document.getElementById('instructions-btn')
const okayBtn = document.getElementById('okay-btn')
const xBtn = document.getElementById('x-btn')
const normalBtn = document.getElementById('normal-btn')
const hardBtn = document.getElementById('hard-btn')
const bonusStartBtn = document.getElementById('bonus-start-btn')
const playAgainBtn = document.getElementById('play-again-btn')

// sections and divs
const gameContainer = document.getElementById('game-container')
const landingPage = document.getElementById('landing-page')
const difficultyPage = document.getElementById('difficulty-div')
const instructionsPage = document.getElementById('instructions-div')
const textSection = document.getElementById('text-section')
const imagesContainer = document.getElementById('images-container')
const gameOverPage = document.getElementById('game-over-page')
const winPage = document.getElementById('win-page')
// const timerDiv = document.getElementById('timer-div')

// others
const timerText = document.getElementById('timer-text')
const promptText = document.getElementById('prompt-text')
const userInput = document.getElementById('user-input')
const scoreText = document.querySelectorAll('.scoreText')

// array of objects storing each fruit's normal prompt, hard prompt, and image url
const prompts = [
    { normal: "apple", hard: "My sister has a red apple.", url: "game-images/apple.png" },
    { normal: "bananas", hard: "We got bananas from the store.", url: "game-images/banana.png" },
    { normal: "cantaloupe", hard: "I ate a slice of cantaloupe.", url: "game-images/cantaloupe.png" },
    { normal: "cherries", hard: "These cherries are delicious.", url: "game-images/cherries.png" },
    { normal: "lemons", hard: "These lemons are too sour.", url: "game-images/lemons.png" },
    { normal: "mango", hard: "I would like a mango please.", url: "game-images/mango.png" },
    { normal: "orange", hard: "An orange makes a great snack.", url: "game-images/orange.png" },
    { normal: "papaya", hard: "My puppy loves yummy papaya.", url: "game-images/papaya.png" },
    { normal: "peach", hard: "We grow peach trees in a yard.", url: "game-images/peach.png" },
    { normal: "pineapple", hard: "Chop the pineapple in half.", url: "game-images/pineapple.png" },
    { normal: "strawberries", hard: "My brother picked strawberries.", url: "game-images/strawberries.png" },
    { normal: "watermelon", hard: "Please hand me a slice of watermelon.", url: "game-images/watermelon.png" },
]

let difficulty = null
let isGameOver = null
let isTimesUp = false
let promptsToShow = null
let time = 6
let currentIndex = 0
let score = 0
let timerId

// const normalPrompts = Object.keys(fruits)
// const hardPrompts = normalPrompts.map(prompt => {
//     return prompts[prompt].hard
// })



const displayResult = () => {
    if (isGameOver && isTimesUp) {
        scoreText.innerText = score
        gameContainer.classList.add('hide')
        gameOverPage.classList.remove('hide')
    }
}

// sets the timer conditions and displays on the UI
const runTimer = () => {
    if (time === 0) {
        isTimesUp = true
        isGameOver = true
        
    } else {
        time--
    }
    timerText.innerText = time
    displayResult()
}

// in order to randomize the prompts in an array, use what is called 'Fisher-Yates Shuffle' algorithm
// selects element of random index to switch with current element
const shufflePrompts = array => {
    for (let i = array.length - 1; i > 0; i--) {
        // generates random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1))
        // swaps current element with random element
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return prompts
}

const displayPrompts = () => {
    if (difficulty === "normal") {
        promptText.innerText = prompts[currentIndex].normal
    } else if (difficulty === "hard")
        promptText.innerText = prompts[currentIndex].hard
}

const createImage = () => {
    const div = document.createElement('div')
    const img = document.createElement('img')
    div.id = prompts[currentIndex-1].normal
    img.src = prompts[currentIndex-1].url
    div.appendChild(img)
    imagesContainer.appendChild(img)
}

// display prompts and compare user text input to prompt
// if there is a match, move onto next index and increase score
const compareTextInput = () => {
    if (userInput.value === promptText.innerText) {
        createImage()
        currentIndex++
        score += 10
        scoreText.innerText = score
    } else {
        isGameOver = true
    }
}








// function to initialize the game by hiding intro pages and showing actual game page
const initGame = () => {
    difficultyPage.classList.add('hide')
    landingPage.classList.add('hide')
    textSection.classList.remove('hide')
    timerText.innerText = time
    shufflePrompts(prompts)
    // createPrompts()
    displayPrompts()
    userInput.addEventListener('input', compareTextInput)
    timerId = setInterval(runTimer, 1000)

    
}



// event listeners for all buttons
playGameBtn.addEventListener('click', () => {
    difficultyPage.classList.remove('hide')
})

instructionsBtn.addEventListener('click', () => {
    instructionsPage.classList.remove('hide')
})

okayBtn.addEventListener('click', () => {
    instructionsPage.classList.add('hide')
})

xBtn.addEventListener('click', () => {
    difficultyPage.classList.add('hide')
})

normalBtn.addEventListener('click', () => {
    difficulty = "normal"
    initGame()
})

hardBtn.addEventListener('click', () => {
    difficulty = "hard"
    initGame()
})