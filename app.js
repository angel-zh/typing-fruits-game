
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
const imagesGrid = document.getElementById('images-grid')
const bonusPage = document.getElementById('bonus-page')
const gameOverPage = document.getElementById('game-over-page')
const winPage = document.getElementById('win-page')

// others
const timerText = document.getElementById('timer-text')
const promptText = document.getElementById('prompt-text')
const userInput = document.getElementById('user-input')
const scoreText = document.querySelectorAll('.scoreText')

// array of objects storing each fruit's normal prompt, hard prompt, and image url
const prompts = [
    { normal: "apple", hard: "My sister has a red apple.", url: "game-images/apple.png" },
    { normal: "bananas", hard: "We got bananas from the store.", url: "game-images/bananas.png" },
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
let isGameOver = false
let currentIndex = 0
let score = 0
let time
// for setInterval() & clearInterval()
let timerId 
let checkGameOverId 


// in order to randomize the prompts in an array, can use 'Fisher-Yates Shuffle' algorithm
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

// displays prompts based on difficulty level 
const displayPrompts = () => {
    if (currentIndex < prompts.length) {
        if (difficulty === "normal") {
            promptText.innerText = prompts[currentIndex].normal
        } else if (difficulty === "hard")
            promptText.innerText = prompts[currentIndex].hard
        // once we've gone through the length of the array, the bonus level appears
    } else if (currentIndex >= 12) {
        textSection.classList.add('hide')
        bonusPage.classList.remove('hide')
        clearInterval(timerId)
    }
}

// creates an image corresponding to the current prompt
// attaches image to a 3x4 grid
const createImage = () => {
    const img = document.createElement('img')
    img.src = prompts[currentIndex].url
    img.id = prompts[currentIndex].normal
    imagesGrid.appendChild(img)
}

// displays game over or winning screen
const checkGameOver = () => {
    if (isGameOver) {
        // clearInterval for checkGameOver once game is over
        clearInterval(checkGameOverId)
        clearInterval(timerId)
        gameContainer.classList.add('hide')
        gameOverPage.classList.remove('hide')
        playAgainBtn.classList.remove('hide')
    // win is determined when max score is reached    
    } else if (score === 240) {
        clearInterval(checkGameOverId)
        clearInterval(timerId)
        gameContainer.classList.add('hide')
        winPage.classList.remove('hide')
        playAgainBtn.classList.remove('hide')
    }
}

// sets the timer conditions and displays on the UI
const runTimer = () => {
    if (time === 0) {
        isGameOver = true
    } else {
        time--
    }
    timerText.innerText = time
}

// compare user text input with prompt
//if match, attach img, then move to next prompt
const compareTextInput = () => {
    if (userInput.value === promptText.innerText) {
        createImage()
        score += 10
        scoreText.forEach(text => { text.innerText = score })
        currentIndex++
        displayPrompts()
        // reset input value each prompt
        userInput.value = ''
        // set time for each prompt based on difficulty
        if (difficulty === "normal") {
            time = 6
        } else {
            time = 11
        }
    }
}

// compare the clicked image's id with current prompt being shown
// if match, proceed to next prompt
// if not, game over
const compareClickedImg = event => {
    const clickedImg = event.target.getAttribute('id')
    if (clickedImg === prompts[currentIndex].normal) {
        document.getElementById(clickedImg).style.visibility = 'hidden'
        score += 10
        scoreText.forEach(text => { text.innerText = score })
        currentIndex++
        displayPrompts()
    } else {
        isGameOver = true
    }
}


// initialize the game by invoking game functions
const initGame = () => {
    difficultyPage.classList.add('hide')
    landingPage.classList.add('hide')
    textSection.classList.remove('hide')
    imagesContainer.classList.remove('hide')
    scoreText[0].innerText = score
    shufflePrompts(prompts)
    displayPrompts()
    userInput.addEventListener('input', compareTextInput)
    // invoke runTimer before setting interval on it to avoid delay
    runTimer() 
    timerId = setInterval(runTimer, 1000)
    checkGameOverId = setInterval(checkGameOver, 100)
}

// initialize the bonus level
const initBonusLvl = () => {
    userInput.remove()
    textSection.classList.remove('hide')
    currentIndex = 0
    timerText.innerText = time
    // there is only one difficulty for the bonus level
    difficulty = "normal"
    // get a new random set of prompts
    shufflePrompts(prompts)
    displayPrompts()
    imagesGrid.addEventListener('click', compareClickedImg)
    timerId = setInterval(runTimer, 1000)
}

// for replayability, reset game to initial state
const resetGame = () => {
    isGameOver = false
    difficulty = null
    score = 0
    scoreText.forEach(text => { text.innerText = score })
    currentIndex = 0
    time = 6
    winPage.classList.add('hide')
    gameOverPage.classList.add('hide')
    playAgainBtn.classList.add('hide')
    textSection.classList.add('hide')
    bonusPage.classList.add('hide')
    imagesContainer.classList.add('hide')
    gameContainer.classList.remove('hide')
    landingPage.classList.remove('hide')
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
    time = 6
    initGame()
})

hardBtn.addEventListener('click', () => {
    difficulty = "hard"
    time = 11
    initGame()
})

bonusStartBtn.addEventListener('click', () => {
    bonusPage.classList.add('hide')
    time = 20
    initBonusLvl()
})

playAgainBtn.addEventListener('click', () => {
    resetGame()
} )