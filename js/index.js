const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const CHANGE_LIMIT_TEXT = 'Новый лимит';
const CURRENT_CATEGORY_TEXT = 'Категория';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'app__status--red';
const RUB_TEXT = 'руб';

const inputNode = document.querySelector('.js-expenses__input');
const buttonNode = document.querySelector('.js-expenses__btn');
const historyListNode = document.querySelector('.js-history__list');
const sumNode = document.querySelector('.js-sum');
const statusNode = document.querySelector('.js-status');
const clearBtnNode = document.querySelector('.js-clear-btn');
const categoryNode = document.querySelector('.js-expenses__category');
const btnLimitNode = document.querySelector('.js-limit-btn');

const limitNode = document.querySelector('.js-limit');
const inputPopupLimitNode = document.querySelector('.js-popup-limit__input');
const btnPopupLimitNode = document.querySelector('.js-popup-limit__btn');

const limitInitial = parseInt(limitNode.innerText);
const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
let limit = 0;
let expenses = [];

init();

function initLimit() {
    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
    if (!limitFromStorage) {
        limit = limitInitial;
        return;
    }

    limitNode.innerText = limitFromStorage;
    limit = parseInt(limitNode.innerText);
}

function init() {
    initLimit();
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses();

    if (Array.isArray(expensesFromStorage)) {
        expenses = expensesFromStorage;
    }
    render();
}

function getExpanseFromUser() {
    return parseInt(inputNode.value);
}

function getSelectedCategory() {
    return categoryNode.value;
}

function clearInput(input) {
    input.value = '';
}


function calculateExpanses() {
    let sum = 0;
    expenses.forEach(expense => {
        sum += expense.amount;
    });
    return sum;
}


function render(expenses) {
    renderHistory();
    renderSum();
    renderStatus();
}

function renderHistory() {
    let expensesListHtml = '';
    expenses.forEach(expense => {
        expensesListHtml += `<li> <span class="rub">${expense.amount}</span> - ${expense.category}</li>`;;
    });
    historyListNode.innerHTML = `${expensesListHtml}`;
}

function renderSum() {
    sumNode.innerText = calculateExpanses(expenses);
}

function renderStatus() {
    const total = calculateExpanses(expenses);

    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total } ${RUB_TEXT})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

function clearTotalSum(params) {
    expenses = [];
    localStorage.removeItem(STORAGE_LABEL_EXPENSES);
    render();
}

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

function createExpense() {

    const currentAmount = getExpanseFromUser();
    if (!currentAmount) {
        togglePopup(1);
        return;
    }

    const currentCategory = getSelectedCategory();
    if (currentCategory === CURRENT_CATEGORY_TEXT) {
        togglePopup(2);
        return;
    }
    const newExpense = {
        amount: currentAmount,
        category: currentCategory
    };
    expenses.push(newExpense);
    saveExpensesToStorage();
    render();
    clearInput(inputNode);
    categoryNode.options[0].selected = true;
}

function getNewLimit() {
    return parseInt(inputPopupLimitNode.value);
}

function initPopup() {
    togglePopup(3);
}

function changeLimitHandler() {
    const newLimitValue = getNewLimit();
    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    limit = newLimitValue;
    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue);
    render();
    clearInput(inputPopupLimitNode);
    togglePopup(4);
}

buttonNode.addEventListener('click', createExpense);
clearBtnNode.addEventListener('click', clearTotalSum);
btnLimitNode.addEventListener('click', initPopup);
btnPopupLimitNode.addEventListener('click', changeLimitHandler);