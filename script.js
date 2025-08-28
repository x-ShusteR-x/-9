// Utility Functions
function isValidID(id) {
    return /^\d{9}$/.test(id);
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function processStringRecursively(str, index = 0, result = '') {
    if (index >= str.length) return result;
    let char = str[index];
    if (char === char.toUpperCase() && char !== char.toLowerCase() && index > 0) {
        result += ' ' + char;
    } else {
        result += char;
    }
    return processStringRecursively(str, index + 1, result);
}

function sortString(str) {
    return str.split('').sort().join('');
}

function findCommonSubstring(str1, str2) {
    let common = '';
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
        if (str1[i] === str2[i]) common += str1[i];
        else break;
    }
    return common || 'אין תווים משותפים';
}

// Calculator Logic
let currentInput = '';
let operator = '';
let firstNumber = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput !== '') {
        firstNumber = currentInput;
        operator = op;
        currentInput = '';
        updateDisplay(firstNumber + ' ' + operator);
    }
}

function calculate() {
    if (firstNumber !== '' && currentInput !== '' && operator !== '') {
        let num1 = parseFloat(firstNumber);
        let num2 = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    updateDisplay('Error: ÷ by 0');
                    return;
                }
                result = num1 / num2;
                break;
        }
        updateDisplay(formatNumber(result));
        firstNumber = result.toString();
        currentInput = '';
        operator = '';
    }
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstNumber = '';
    updateDisplay('0');
}

function updateDisplay(value) {
    document.getElementById('calcDisplay').textContent = value;
}

function formatNumber(num) {
    return Number.isInteger(num) ? num.toString() : Number(num.toFixed(8)).toString();
}

// UI Interaction Functions
function checkID() {
    const input = document.getElementById('idInput').value;
    const result = document.getElementById('idResult');
    result.textContent = isValidID(input)
        ? `✓ ת.ז ${input} תקינה`
        : `✗ ת.ז לא תקינה (9 ספרות)`;
    result.className = `result ${isValidID(input) ? 'success' : 'error'}`;
}

function checkPrime() {
    const input = parseInt(document.getElementById('primeInput').value);
    const result = document.getElementById('primeResult');
    if (isNaN(input) || input < 1) {
        result.textContent = 'מספר חיובי תקין';
        result.className = 'result error';
    } else {
        result.textContent = isPrime(input)
            ? `✓ ${input} ראשוני`
            : `✗ ${input} לא ראשוני`;
        result.className = `result ${isPrime(input) ? 'success' : 'error'}`;
    }
}

function processStringRecursive() {
    const input = document.getElementById('recursiveInput').value;
    const result = document.getElementById('recursiveResult');
    if (!input) {
        result.textContent = 'הכנס מחרוזת';
        result.className = 'result error';
        return;
    }
    result.textContent = `מחרוזת מעובדת: "${processStringRecursively(input)}"`;
    result.className = 'result success';
}

function compareStrings() {
    const str1 = document.getElementById('string1').value;
    const str2 = document.getElementById('string2').value;
    const result = document.getElementById('stringResult');
    if (!str1 || !str2) {
        result.textContent = 'הכנס שתי מחרוזות';
        result.className = 'result error';
        return;
    }
    result.textContent = str1 === str2
        ? `✓ זהות: "${str1}"`
        : `✗ שונות: "${str1}" ≠ "${str2}"`;
    result.className = `result ${str1 === str2 ? 'success' : 'error'}`;
    const details = document.createElement('div');
    details.innerHTML = `
        אורך 1: ${str1.length}<br>
        אורך 2: ${str2.length}<br>
        משותף: "${findCommonSubstring(str1, str2)}"
    `;
    result.appendChild(details);
}

function bubbleSort() {
    const input = document.getElementById('sortInput').value;
    const result = document.getElementById('sortResult');
    if (!input) {
        result.textContent = 'הכנס מחרוזת';
        result.className = 'result error';
        return;
    }
    result.textContent = `ממוין: "${input}" → "${sortString(input)}"`;
    result.className = 'result success';
}

function calcInput(value) {
    if (value === '=') {
        calculate();
    } else if (['+', '-', '*', '/'].includes(value)) {
        appendOperator(value);
    } else {
        appendNumber(value);
    }
}

function clearCalc() {
    clearDisplay();
}

function performMathOperations() {
    const x = parseFloat(document.getElementById('mathX').value) || 0;
    const y = parseFloat(document.getElementById('mathY').value) || 0;
    document.getElementById('addResult').textContent = `${x} + ${y} = ${formatNumber(x + y)}`;
    document.getElementById('subResult').textContent = `${x} - ${y} = ${formatNumber(x - y)}`;
    document.getElementById('mulResult').textContent = `${x} × ${y} = ${formatNumber(x * y)}`;
    document.getElementById('divResult').textContent = y !== 0
        ? `${x} ÷ ${y} = ${formatNumber(x / y)}`
        : `${x} ÷ ${y} = Error`;
}