const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentExpression = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? value : display.textContent + value;
    }
}

function clearDisplay() {
    display.textContent = '0';
    currentExpression = '';
    shouldResetDisplay = false;
}

function calculateResult() {
    try {
        let expression = currentExpression.replaceAll('×', '*').replaceAll('÷', '/');
        
        const result = eval(expression);
        
        if (!isFinite(result)) {
            throw new Error('Ошибка вычисления');
        }
        
        display.textContent = result.toString();
        currentExpression = result.toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.textContent = 'Ошибка';
        currentExpression = '';
        shouldResetDisplay = true;
    }
}

function toggleSign() {
    if (currentExpression) {
        try {
            let expression = currentExpression.replaceAll('×', '*').replaceAll('÷', '/');
            const result = eval(expression);
            
            if (isFinite(result)) {
                currentExpression = (-result).toString();
                display.textContent = currentExpression;
                shouldResetDisplay = true;
            }
        } catch (error) {
            currentExpression = '-' + currentExpression;
            display.textContent = currentExpression;
        }
    }
}

function handlePercent() {
    if (currentExpression) {
        try {
            let expression = currentExpression.replaceAll('×', '*').replaceAll('÷', '/');
            const result = eval(expression);
            
            if (isFinite(result)) {
                currentExpression = result.toString() + '%';
                display.textContent = currentExpression;
                shouldResetDisplay = true;
            }
        } catch (error) {
            currentExpression += '%';
            display.textContent = currentExpression;
        }
    }
}

function calculatePercent() {
    if (currentExpression.includes('%')) {
        try {
            const numbers = currentExpression.split('%');
            if (numbers.length === 2) {
                const firstNumber = parseFloat(numbers[0]);
                const secondNumber = parseFloat(numbers[1]);
                const result = (firstNumber / 100) * secondNumber;
                
                display.textContent = result.toString();
                currentExpression = result.toString();
                shouldResetDisplay = true;
            }
        } catch (error) {
            display.textContent = 'Ошибка';
            currentExpression = '';
            shouldResetDisplay = true;
        }
    }
}

function handleButtonClick(event) {
    const button = event.target;
    const buttonText = button.textContent;
    
    if (buttonText === 'AC') {
        clearDisplay();
    } else if (buttonText === '+/-') {
        toggleSign();
    } else if (buttonText === '%') {
        handlePercent();
    } else if (buttonText === '=') {
        calculateResult();
    } else if (buttonText === '.') {
        if (!currentExpression.includes('.') || shouldResetDisplay) {
            if (shouldResetDisplay || currentExpression === '') {
                currentExpression = '0.';
                display.textContent = '0.';
            } else {
                currentExpression += '.';
                display.textContent += '.';
            }
            shouldResetDisplay = false;
        }
    } else if (['+', '−', '×', '÷'].includes(buttonText)) {
        if (currentExpression.includes('%')) {
            calculatePercent();
        }
        
        if (currentExpression && !['+', '−', '×', '÷'].includes(currentExpression.slice(-1))) {
            currentExpression += buttonText;
            display.textContent += buttonText;
        } else if (currentExpression && ['+', '−', '×', '÷'].includes(currentExpression.slice(-1))) {
            currentExpression = currentExpression.slice(0, -1) + buttonText;
            display.textContent = display.textContent.slice(0, -1) + buttonText;
        }
        shouldResetDisplay = false;
    } else {
        if (shouldResetDisplay) {
            currentExpression = buttonText;
            display.textContent = buttonText;
            shouldResetDisplay = false;
        } else {
            if (display.textContent === '0') {
                currentExpression = buttonText;
                display.textContent = buttonText;
            } else {
                currentExpression += buttonText;
                display.textContent += buttonText;
            }
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

clearDisplay();
