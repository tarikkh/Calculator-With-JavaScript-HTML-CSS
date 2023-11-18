const displayHistoryEl  = document.querySelector('.display-history');
const displayMainEl = document.querySelector('.display-main');
const displayTempEl = document.querySelector('.display-temp');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearEl = document.querySelector('.clear-all');
const clearLastEl = document.querySelector('.clear-last-one');

let disNumOne = '';
let disNumTwo = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbersEl.forEach(number => {
    number.addEventListener('click', (e) =>{
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        }else if(e.target.innerText === '.' && haveDot){
            return;
        }

        disNumTwo += e.target.innerText;
        displayMainEl.innerText = disNumTwo;
    });
})

operationEl.forEach( operation => {
    operation.addEventListener('click', (e) =>{
        if (!disNumTwo) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (disNumOne && disNumTwo && lastOperation) {
            mathOperation();
        }else{
            result = parseFloat(disNumTwo)
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
})

function clearVar(opName = ''){
    disNumOne += disNumTwo + ' '+opName+' ';
    displayHistoryEl.innerText = disNumOne;
    displayMainEl.innerText = '';
    disNumTwo = '';
    displayTempEl.innerHTML = result;
}

function mathOperation() {
    if(lastOperation === '*'){
        result = parseFloat(result) * parseFloat(disNumTwo);
    }else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(disNumTwo);
    }else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(disNumTwo);
    }else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(disNumTwo);
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(disNumTwo);
    }
}

equalEl.addEventListener('click', (e) => {
    if (!disNumOne || !disNumTwo) {
        return;
    }
    haveDot = false;
    mathOperation();
    clearVar();
    displayMainEl.innerText = result;
    displayTempEl.innerText = '';
    disNumTwo = result;
    disNumOne = '';
})

clearEl.addEventListener('click' , (e) =>{
    displayHistoryEl.innerText = '0';
    displayMainEl.innerText = '0';
    disNumOne = '';
    disNumTwo = '';
    result = '';
    displayTempEl.innerText = '0';
})

clearLastEl.addEventListener('click', (e) =>{
    displayMainEl.innerText = '';
    disNumTwo = '';
})

window.addEventListener('keydown' , (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ) {
        clickButtonEl(e.key);
    }else if(
        e.key === '+'||
        e.key === '-'||
        e.key === '*'||
        e.key === '/'||
        e.key === '%'
    ){
        clickOperationEl(e.key);
    }else if(e.key === 'Enter' || e.key === '='){
        clickEqual();
    }
});

function clickButtonEl(key){
    numbersEl.forEach(number =>{
        if (number.innerText === key) {
            number.click();
        }
    })
}

function clickOperationEl(key){
    operationEl.forEach(operation =>{
        if (operation.innerText === key) {
            operation.click();
        }
    })
}

function clickEqual(){
    equalEl.click();
}