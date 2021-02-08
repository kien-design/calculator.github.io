
//Set variables for document's elements
var previousOpText = document.querySelector("[data-previous-operand]")
var currentOpText = document.querySelector("[data-current-operand]")
var numberButtons = document.querySelectorAll("[data-number]")
var acButton = document.querySelector("[data-ac]")
var delButton = document.querySelector("[data-del]")
var operationButtons = document.querySelectorAll("[data-operation]")
var equalsButton = document.querySelector("[data-equals")

//Set a system of calculator
class Calculator {
  constructor(previousOpText, currentOpText){
    this.previousOpText = previousOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }
  
  clear() {
    this.previousOp = "";
    this.currentOp = "";
    this.operation = undefined;
    document.getElementById("limited").style="";
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentOp == "") return;
    if (this.previousOp !== "") {
        this.computer();
    }
    this.operation = operation;
    this.previousOp = this.currentOp;
    this.currentOp = "";
  }

  computer() {
    let result;
    const previous = parseFloat(this.previousOp);
    const current = parseFloat(this.currentOp);
    if (isNaN(previous) || isNaN(current)) return;
    switch(this.operation) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return;
    }
    this.currentOp = result;
    this.operation = undefined;
    this.previousOp = "";
  }

  appendNumber(number) {
      if (number === "." && this.previousOp.includes("."), number === "." && this.currentOp.includes(".")) {
        document.getElementById("limited").style.backgroundColor="black";
        document.getElementById("limited").style.color="white";
        return;
      }
      if (this.currentOp === "" || this.previousOp === "") {
        document.getElementById("limited").style="";
      };
    this.currentOp = this.currentOpText.innerText + number.toString();
  }
  
  updateDisplay = () => {
    this.currentOpText.innerText = this.currentOp;
    this.previousOpText.innerText = this.previousOp;
    if (this.operation != null) {
      this.previousOpText.innerText = this.previousOp + " " + this.operation;
    }
  }
}

//Events trigger
var calculator = new Calculator(previousOpText, currentOpText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        document.getElementById("limited").style="";
    })
})

equalsButton.addEventListener("click", () => {
  calculator.computer();
  calculator.updateDisplay();
  document.getElementById("limited").style="";
})

acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
})

delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
})