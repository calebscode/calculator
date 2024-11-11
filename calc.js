// global constants
const MAX_INT_DISPLAY = 999999999;

// grab elements
const display = document.querySelector(".display");
const clearBtn = document.querySelector("#clear");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator-btn")
const equalsBtn = document.querySelector("#equals");

// event handler functions 
function handleNumberClick(btn) {
    if (display.textContent == "0") {
        display.textContent = btn.textContent;
    } else if (display.textContent.length == 10) {
        // do nothing
    } else {
        display.textContent += btn.textContent;
    }
}
function handleOperatorClick(btn) {
    // handle chaining/switching operators
    if (operator) {
        if (isValidExpression(display.textContent)) {
            handleEqualsClick();
        } else {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        }
    }

    operator = btn.textContent;
    display.textContent += btn.textContent;
}
numBtns.forEach((btn) => btn.addEventListener("click", () => handleNumberClick(btn)));
operatorBtns.forEach((btn) => btn.addEventListener("click", () => handleOperatorClick(btn)));
clearBtn.addEventListener("click", () => handleClearClick());


const handleClearClick = () => {
    display.textContent = "0"
    operand1 = null;
    operand2 = null;
    operator = null;
}

const handleEqualsClick = () => {
    // edge cases
    const expression = display.textContent.split(operator).filter((item) => (item != ''));
    if (expression.length == 2) {
        [operand1, operand2] = expression;
        operand1 = parseInt(operand1);
        operand2 = parseInt(operand2);
        display.textContent = operate(operand1, operand2, operator);

        operand1 = null;
        operator = null;
        operand2 = null;
    }    
}

equalsBtn.addEventListener("click", handleEqualsClick);

// global variables for our operations
let operand1;
let operand2;
let operator;

// basic operations
const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => {
    if (b == 0) return 'ERROR';
    return (a / b);
};

// operates on expressions of the form NUM OPERATOR NUM
// i.e. 5 + 10
function operate(num1, num2, operator) {
    let output;
    switch (operator) {
        case '+':
            output = add(num1, num2);
            break;
        case '-':
            output = subtract(num1, num2);
            break;
        case 'x':
            output = multiply(num1, num2);
            break;
        case '/':
            output = divide(num1, num2);
            break;
    }

    if (output == "ERROR") {
        return "ERROR";
    }

    if (Number.isInteger(output)) {
        if (output < MAX_INT_DISPLAY) {
            return output;
        } else {
            return "TOO BIG"
        }
    } else {
        return parseFloat(output.toFixed(7));
    }
}

function isValidExpression(expression) {
    let [lhs, rhs] = expression.split(operator).filter((token) => (token != ''));
    return (lhs != null && rhs != null);
}