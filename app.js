
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
const timer = document.getElementById('timer')

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
let isGameOver = false
let isTimesUp = false
let promptsToShow = null
let time = 6
let currentIndex = 0
let score = 0


// const normalPrompts = Object.keys(fruits)
// const hardPrompts = normalPrompts.map(prompt => {
//     return prompts[prompt].hard
// })

// sets the timer conditions and displays on the UI
const runTimer = () => {
    if (time === 0) {
        isTimesUp = true
        const message = document.createElement('p')
        message.innerHTML = "Time's up!"
        message.style.color = "tomato"
        timer.appendChild(message)
    } else {
        time--
    }
    timerText.innerText = time
}

// in order to randomize the prompts in an array, use what is called 'Fisher-Yates Shuffle' algorithm
// selects element of random index to switch with current element
const shufflePrompts = () => {
    for (let i = prompts.length - 1; i > 0; i--) {
        // generates random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1))
        // swaps current element with random element
        const temp = prompts[i]
        prompts[i] = prompts[j]
        prompts[j] = temp
    }
    return prompts
}

// create the list of prompts based on selected difficulty level
const createPrompts = () => {
    if (difficulty === "normal") {
        promptsToShow = prompts.map(prompt => {
            return prompt.normal
        })
    } else if (difficulty === "hard") {
        promptsToShow = prompts.map(prompt => {
            return prompt.hard
        })
    }
}

    // display prompts and compare user text input to prompt
    // if there is a match, move onto next index and increase score
    const compareTextInput = () => {
        promptText.innerText = promptsToShow[currentIndex]
        if (userInput.value === promptText.innerText) {
            currentIndex++
            score += 10
            scoreText.innerText = score
        } else {
            isGameOver = true
        }
    }

    const createImage = () => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        div.id = randomArray[currentIndex]
        img.src = prompts[randomArray[currentIndex]].url
    }



    const displayResult = () => {
        if (isGameOver && isTimesUp) {
            scoreText.innerText = score
            gameContainer.classList.add('hide')
            gameOverPage.classList.remove('hide')
        }
    }


    // function to initialize the game by hiding intro pages and showing actual game page
    const initGame = () => {
        difficultyPage.classList.add('hide')
        landingPage.classList.add('hide')
        textSection.classList.remove('hide')
        timerText.innerText = time

        shufflePrompts(prompts)
        createPrompts()
        compareTextInput()
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
    console.log(difficulty)
    initGame()
})

hardBtn.addEventListener('click', () => {
    difficulty = "hard"
    console.log(difficulty)
    initGame()
})