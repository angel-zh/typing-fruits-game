
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

// others
const prompt = document.getElementById('prompt')
const timer = document.getElementById('timer')
const userInput = document.getElementById('user-input')

let difficulty = null
let randomArray = []
let currentIndex = 0
let time = 5 


const runTimer = () => {
    if (time === 0) {
        
    }
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

// console.log(randomizePrompts(hardPrompts))

// function to display prompts listed in randomArray
const displayPrompts = () => {
    prompt.innerText = randomArray[currentIndex]
}

// compare user input to prompt
// if there is a match, move onto next index in randomArray
const compareInput = () => {
    displayPrompts()
    if (userInput === prompt.innerText) {
        currentIndex++
    } else {
        return false
    }
}
