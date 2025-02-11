let display = document.getElementById("display");

function appendToDisplay(value) {

  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {

    display.value += value;
  }

  let lastChar = display.value.slice(-1);


  if (isOperator(lastChar) && isOperator(value)) {
    return;
  }

  // Prevent adding more than one decimal point in a number
  if (value === "." && lastNumberContainsDecimal(display.value)) {
    return;
  }

  // Show percentage as "X% of Y" while typing (this doesn't add 'of' if already present)
  if (value === "%" && display.value && !display.value.includes(" of ")) {
    display.value += " of ";
    return;
  }
}

function clearDisplay() {
  display.value = "0";
}

function calculateResult() {
  try {
    let expression = display.value;

    // Handle exponentiation (replace "^" with "**" for JavaScript eval)
    expression = expression.replace(/\^/g, "**");

    // Handle percentage (convert "X%" to "(X/100)")
    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    // Convert "of" to multiplication
    expression = expression.replace(/\bof\b/g, "*");
    // Evaluate the expression
    display.value = eval(expression);
  } catch (error) {
    console.error("Error in calculation:", error);
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
