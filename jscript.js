let totalAmount = document.getElementById
("total-amount");
let userAmount = document.getElementById
("user-amount");
const checkAmountButton = document.getElementById
("check-amount");
const totalAmountButton = document.getElementById
("total-amount-button");
const productName = document.getElementById
("product-name");
const errorMessage = document.getElementById
("budget-error");
const productNameError = document.getElementById
("product-error");
const productCostError = document.getElementById
("product-cost-error");
const amount = document.getElementById
("amount");
const expenditureValue = document.getElementById
("expenditure-value");
const balanceValue = document.getElementById
("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

// set budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;

    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hidden");
    } else {
        errorMessage.classList.add("hidden");

        amount.innerHTML = tempAmount;

        balanceValue.innerHTML = tempAmount - expenditureValue.innerText;

        totalAmount.value = "";
    }
});


const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName
    ("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productName.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt
    (currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove(); 
};

//function create
const listCreator = (expenseName, expenseValue) =>
{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p> <p class="amount">${expenseValue}</p>`
    let editButton = document.createElement
    ("Button");
    editButton.classList.add("fa fa-pencil-square-o", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement
    ("button");
    deleteButton.classList.add("fa-sharp fa-regular fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild (sublistContent);
};

//function of expense
checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productName.value) {
        productNameError.classList.remove("hidden");
        return false;

    }

    disableButtons(false);
    
    let expenditure = parseInt(userAmount.value);

    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    listCreator(productName.value, userAmount.value);

    productName.value = "";
    userAmount.value = "";
});