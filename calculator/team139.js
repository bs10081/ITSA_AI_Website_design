let display = document.getElementById('display');
let currentExpression = '';

function appendNumber(num) {
    currentExpression += num;
    display.value = currentExpression;
}

function appendOperator(op) {
    currentExpression += op;
    display.value = currentExpression;
}

function clearDisplay() {
    currentExpression = '';
    display.value = '';
}

function calculate() {
    try {
        // 將 × 和 ÷ 替換為 * 和 / 以便 JavaScript 計算
        let expression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // 將表達式分割成標記
        let tokens = expression.match(/(\d*\.?\d+|[+\-*/])/g);
        
        // 處理運算符優先級
        let result = evaluateExpression(tokens);
        
        currentExpression = result.toString();
        display.value = currentExpression;
    } catch (error) {
        display.value = 'Error';
        currentExpression = '';
    }
}

function evaluateExpression(tokens) {
    // 第一步：處理乘法和除法
    for (let i = 1; i < tokens.length - 1; i += 2) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            let result;
            if (tokens[i] === '*') {
                result = parseFloat(tokens[i-1]) * parseFloat(tokens[i+1]);
            } else {
                result = parseFloat(tokens[i-1]) / parseFloat(tokens[i+1]);
            }
            tokens.splice(i-1, 3, result.toString());
            i -= 2;
        }
    }
    
    // 第二步：處理加法和減法
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += parseFloat(tokens[i+1]);
        } else if (tokens[i] === '-') {
            result -= parseFloat(tokens[i+1]);
        }
    }
    
    return result;
}
