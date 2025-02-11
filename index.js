let display = document.getElementById("display");

function appendToDisplay(value) {
  let display = document.getElementById("display");
  let lastChar = display.value.slice(-1);

  if (isOperator(lastChar) && isOperator(value)) {
    return;
  }

  if (value === "." && lastNumberContainsDecimal(display.value)) {
    return;
  }

  display.value += value;
}
function clearDisplay() {
  display.value = "";
}

function calculateResult() {
  try {
    let expression = display.value;

    // Handle exponentiation (replace "^" with "**" for JavaScript eval)
    expression = expression.replace(/\^/g, "**");

    // Handle percentage (convert 50% to 50/100)
    expression = expression.replace(/(\d+)%/g, "($1/100)");

    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}

function isOperator(character) {
  return ["+", "-", "*", "/", "^"].includes(character);
}

function lastNumberContainsDecimal(expression) {
  let numbers = expression.split(/[\+\-\*\/]/);
  let lastNumber = numbers[numbers.length - 1];
  return lastNumber.includes(".");
}

function deleteLastCharacter() {
  display.value = display.value.slice(0, -1);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateResult();
  } else if (event.key === "Backspace") {
    deleteLastCharacter();
  } else if (event.key === "Escape") {
    clearDisplay();
  } else if (event.key === ".") {
    appendToDisplay(".");
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/" ||
    event.key === "^"
  ) {
    appendToDisplay(event.key);
  } else if (event.key >= "0" && event.key <= "9") {
    appendToDisplay(event.key);
  }
});
