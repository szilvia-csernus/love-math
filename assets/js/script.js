// Wait for te DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType)
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })

    runGame('addition');
})

/** 
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();

    let num1, num2;

    function getTwoNumbers() {
        num1 = Math.floor(Math.random() * 80) + 1;
        num2 = Math.floor(Math.random() * 30) + 1;
    }

    switch (gameType) {
        case "addition":
            getTwoNumbers();
            displayAdditionQuestion(num1, num2);
            break;
        case "subtract":
            do {
                getTwoNumbers();
            } while (num2 > num1)
            displaySubtractQuestion(num1, num2);
            break;
        case "multiply":
            getTwoNumbers();
            displayMultiplyQuestion(num1, num2);
            break;
        case "division":
            do {
                getTwoNumbers();
            } while ((num1 % num2 !== 0) || (num1 / num2 === 1) || (num2 === 1))
            displayDivisionQuestion(num1, num2);
            break;
        default:
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    const correctAnswer = calculateCorrectAnswer()[0]
    if (userAnswer === correctAnswer) {
        incrementScore();
        alert('correct answer')
    } else {
        incrementWrongAnswer();
        alert(`incorrect answer, the correct answer is: ${correctAnswer}!`)
    }
    document.getElementById('answer-box').value = '';
}
/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;
    switch (operator) {
        case "+":
            return [operand1 + operand2, "addition"];
            break;
        case "-":
            return [operand1 - operand2, "subtract"];
            break;
        case "x":
            return [operand1 * operand2, "multiply"];
            break;
        case "/":
            return [operand1 / operand2, "division"];
            break;
        default:
            alert(`Unimplemented operator ${operator}.`);
            throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {
    let score = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++score;
}

function incrementWrongAnswer() {
    let incorrect = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++incorrect;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}