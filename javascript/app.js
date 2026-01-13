//  Display element
let display = document.getElementById("display");

// Variables to store values
let currentValue = "";
let previousValue = "";
let operator = "";

// Append number and show full expression
function appendNumber(number) {

    // Prevent multiple decimals
    if (number === "." && currentValue.includes(".")) return;

    currentValue += number;

    // Show full expression if operator exists
    if (operator !== "") {
        display.innerText = previousValue + " " + operator + " " + currentValue;
    } else {
        display.innerText = currentValue;
    }
}

// Store operator and show it
function chooseOperator(op) {
    if (currentValue === "") return;

    // If already have operator, calculate first
    if (previousValue !== "") {
        calculate();
    }

    operator = op;
    previousValue = currentValue;
    currentValue = "";

    // Show expression
    display.innerText = previousValue + " " + operator;
}

// Calculate result
function calculate() {
    let prev = parseFloat(previousValue);
    let curr = parseFloat(currentValue);
    let result;

    if (isNaN(prev) || isNaN(curr)) return;

    if (operator === "+") result = prev + curr;
    else if (operator === "-") result = prev - curr;
    else if (operator === "*") result = prev * curr;
    else if (operator === "/") result = prev / curr;
    else if (operator === "%") result = prev % curr;

    // Show result only
    display.innerText = result;

    // Reset values
    currentValue = result.toString();
    previousValue = "";
    operator = "";
}

// Square of number
function square() {
    if (currentValue === "") return;

    let num = parseFloat(currentValue);
    let result = num * num;

    display.innerText = result;
    currentValue = result.toString();
}

// Clear all
function allClear() {
    currentValue = "";
    previousValue = "";
    operator = "";
    display.innerText = "0";
}

function toggleMode() {
    document.body.classList.toggle("light");

    let btn = document.querySelector(".mode-toggle");

    if (document.body.classList.contains("light")) {
        btn.innerText = "☀️Day";
    } else {
        btn.innerText = "🌙Night";
    }
}

document.addEventListener("keydown", function (event) {
    let key = event.key;

    // Numbers and decimal
    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    // Operators
    if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        chooseOperator(key);
    }

    // Enter / Return key to calculate
    if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace to clear
    if (key === "Backspace") {
        allClear();
    }
});
