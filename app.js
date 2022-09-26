
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
const scoreText = document.querySelectorAll('.score-text')

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

let userPrompt = []
let difficulty = null
let isGameOver = false
let currentIndex = 0
let score = 0
let time
// for setInterval() & clearInterval()
let timerId
let checkGameOverId


// sets the timer conditions and displays on the UI
const runTimer = () => {
    if (time === 0) {
        isGameOver = true
    } else {
        time--
    }
    timerText.innerText = time
}

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
            userPrompt = prompts[currentIndex].normal
        } else {
            userPrompt = prompts[currentIndex].hard
        }
        createLetterSpan()
        // once we reach the length of the array and score = 120, the bonus level appears
    } else if (currentIndex >= 12 && score === 120) {
        textSection.classList.add('hide')
        bonusPage.classList.remove('hide')
        clearInterval(timerId)
    }
}

// function to hold each letter of prompts in a span
// used for making the highlighting function work on each letter
const createLetterSpan = () => {
    promptText.innerHTML = ''
    // splits prompt into single letter strings in an array
    // create span to hold each letter using a loop
    userPrompt.split('').forEach(letter => {
        const letterSpan = document.createElement('span')
        letterSpan.innerText = letter
        // append to div that shows prompt to the user
        promptText.appendChild(letterSpan)
    })
}

// highlights the correct letters as the user types
const highlightLetters = () => {
    // select all spans with single letters in promptText div
    const arrayLetterSpans = promptText.querySelectorAll('span')
    // split user input into single letter strings in an array
    const arrayInputValues = userInput.value.split('')
    // compare each single letter typed with corresponding single letter in prompt
    arrayLetterSpans.forEach((letterSpan, index) => {
        const letter = arrayInputValues[index]
        // if there is a match, add highlight class
        if (letter === letterSpan.innerText) {
            letterSpan.classList.add('highlight')
        }
    })
}

// creates an image corresponding to the current prompt
// attaches image to images grid
const createImage = () => {
    const img = document.createElement('img')
    img.src = prompts[currentIndex].url
    img.id = prompts[currentIndex].normal
    imagesGrid.appendChild(img)
}

// compare user text input with prompt
// if match, create image, then move to next prompt
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
    // prevent triggering game over when user clicks and drags images grid
    if (event.target === event.currentTarget) return
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

// checks game status 
// displays game over or winning screen
const checkGameOver = () => {
    if (isGameOver) {
        // clear intervals once game is over
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

// load all components on game page
const loadGame = () => {
    difficultyPage.classList.add('hide')
    landingPage.classList.add('hide')
    textSection.classList.remove('hide')
    imagesContainer.classList.remove('hide')
    timerText.innerText = time
    // updates all scoreText spans in DOM
    scoreText.forEach(text => { text.innerText = score })
    shufflePrompts(prompts)
    displayPrompts()
    // start game/timer when user first starts typing
    userInput.addEventListener('input', initGame)
    // event listener for highlighting letters as user begins typing
    userInput.addEventListener('input', highlightLetters)
}

// initialize the game by invoking game functions
const initGame = () => {
    // remove event listener for starting game/timer
    userInput.removeEventListener('input', initGame)
    // compare text input at every input event
    userInput.addEventListener('input', () => {
        compareTextInput()
        userInput.placeholder = ''
    })
    // invoke runTimer first to avoid 1 sec delay on setInterval
    runTimer()
    timerId = setInterval(runTimer, 1000)
    // consistently check for the status of game
    checkGameOverId = setInterval(checkGameOver, 100)
}

// initialize the bonus level
const initBonusLvl = () => {
    userInput.classList.add('hide')
    textSection.classList.remove('hide')
    currentIndex = 0
    timerText.innerText = time
    // there is only one difficulty for the bonus level
    difficulty = "normal"
    // get a new random set of prompts - normal
    shufflePrompts(prompts)
    displayPrompts()
    imagesGrid.addEventListener('click', compareClickedImg)
    timerId = setInterval(runTimer, 1000)
}

// for replayability, reset game to initial state
const resetGame = () => {
    isGameOver = false
    difficulty = null
    currentIndex = 0
    time = 5
    score = 0
    userPrompt = []
    userInput.value = ""
    scoreText.forEach(text => { text.innerText = score })
    imagesGrid.innerHTML = ''
    userInput.placeholder = 'Start typing here...'
    imagesGrid.removeEventListener('click', compareClickedImg)
    winPage.classList.add('hide')
    gameOverPage.classList.add('hide')
    playAgainBtn.classList.add('hide')
    textSection.classList.add('hide')
    bonusPage.classList.add('hide')
    imagesContainer.classList.add('hide')
    gameContainer.classList.remove('hide')
    userInput.classList.remove('hide')
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
    time = 5
    loadGame()
})

hardBtn.addEventListener('click', () => {
    difficulty = "hard"
    time = 10
    userInput.style.textAlign = "left"
    loadGame()
})

bonusStartBtn.addEventListener('click', () => {
    bonusPage.classList.add('hide')
    time = 20
    userInput.style.textAlign = "center"
    initBonusLvl()
})

playAgainBtn.addEventListener('click', () => {
    resetGame()
})

