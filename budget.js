// GLOBAL FUNCTIONS
function fazPostInc(incurl, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", incurl+id, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}

function fazPostExp(expurl, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", expurl+expId, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}

function fazPutInc(incurl, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("PUT", incurl+id, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

}

function fazPutExp(expurl, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("PUT", expurl+expId, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

}

function fazDeleteInc(incurl) {
    let request = new XMLHttpRequest()
    request.open("DELETE", incurl+id, false)
    request.send()
    
    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}

function fazDeleteExp(expurl) {
    let request = new XMLHttpRequest()
    request.open("DELETE", expurl+expId, false)
    request.send()
    
    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}
// SELECT ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// SELECT BTNS
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// INPUT BTS
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

// VARIABLES
let ENTRY_LIST;
let balance = 0, income = 0, outcome = 0;
const DELETE = "delete", EDIT = "edit";

// LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

// EVENT LISTENERS
expenseBtn.addEventListener("click", function(){
    show(expenseEl);
    hide( [incomeEl, allEl] );
    active( expenseBtn );
    inactive( [incomeBtn, allBtn] );
})
incomeBtn.addEventListener("click", function(){
    show(incomeEl);
    hide( [expenseEl, allEl] );
    active( incomeBtn );
    inactive( [expenseBtn, allBtn] );
})
allBtn.addEventListener("click", function(){
    show(allEl);
    hide( [incomeEl, expenseEl] );
    active( allBtn );
    inactive( [incomeBtn, expenseBtn] );
})

addExpense.addEventListener("click", function(){
    // IF ONE OF THE INPUTS IS EMPTY => EXIT
    if(!expenseTitle.value || !expenseAmount.value ) return;

    // SAVE THE ENTRY TO ENTRY_LIST
    let expense = {
        type : "expense",
        title : expenseTitle.value,
        amount : parseInt(expenseAmount.value)
    }
    
    let expurl = "http://phlucasfr.pythonanywhere.com/despesa/"  
    nomeSaida = document.getElementById("expense-title-input").value
    idSaidas = document.getElementById("expense-title-input").querySelector('option:checked')
    idSaida = idSaidas.dataset.identexp
    valorSaida = document.getElementById("expense-amount-input").value
    
    expId = idSaida
    nmsaida = nomeSaida
    vlrsaida = valorSaida   
    
    console.log(nomeSaida)
    console.log(valorSaida)

    body = {
        "tipo": nomeSaida,
        "valor": valorSaida
    }

    fazPostExp(expurl, body)

    ENTRY_LIST.push(expense);

    updateUI();
    clearInput( [expenseTitle, expenseAmount] )
})

addIncome.addEventListener("click", function(){
    // IF ONE OF THE INPUTS IS EMPTY => EXIT
    if(!incomeTitle.value || !incomeAmount.value ) return;

    // SAVE THE ENTRY TO ENTRY_LIST
    let income = {
        type : "income",
        title : incomeTitle.value,
        amount : parseInt(incomeAmount.value),
    }
    let incurl = "http://phlucasfr.pythonanywhere.com/receita/"  
    nomeEntrada = document.getElementById("income-title-input").value
    idEntradas = document.getElementById("income-title-input").querySelector('option:checked')
    idEntrada = idEntradas.dataset.ident
    valorEntrada = document.getElementById("income-amount-input").value
    
    id = idEntrada
    nmentrada = nomeEntrada
    vlrentrada = valorEntrada    
    
    console.log(nomeEntrada)
    console.log(valorEntrada)

    body = {
        "tipo": nomeEntrada,
        "valor": valorEntrada
    }

    fazPostInc(incurl, body)

    ENTRY_LIST.push(income);

    updateUI();
    clearInput( [incomeTitle, incomeAmount] )
})

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

// HELPERS

function deleteOrEdit(event){
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;
    let ENTRY = ENTRY_LIST[entry.id];

    if( targetBtn.id == DELETE ){
        deleteEntry(entry);
    }else if(targetBtn.id == EDIT ){
        editEntry(entry)
        if (targetBtn.id == addIncome){
            if(ENTRY.type == "income"){
                fazPutInc(incurl);
        
            }else if(ENTRY.type == "expense"){
                fazPutExp(expurl);
            }
        };
        
    }
}

function deleteEntry(entry){
    console.log(entry)
    incurl = "http://phlucasfr.pythonanywhere.com/receita/"
    expurl = "http://phlucasfr.pythonanywhere.com/despesa/"    
    let ENTRY = ENTRY_LIST[entry.id];
    console.log(ENTRY)

    if(ENTRY.type == "income"){
        fazDeleteInc(incurl);

    }else if(ENTRY.type == "expense"){
        fazDeleteExp(expurl);
    }
    

    ENTRY_LIST.splice(entry.id, 1);
   
    updateUI();
}

function editEntry(entry){
    console.log(entry)    
    body = {
        "tipo": nmentrada,
        "valor": vlrentrada
    }
    let ENTRY = ENTRY_LIST[entry.id];

    if(ENTRY.type == "income"){
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;

    }else if(ENTRY.type == "expense"){
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }
    deleteEntry(entry);
    
}

function updateUI(){
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outcome));

    // DETERMINE SIGN OF BALANCE
    let sign = (income >= outcome) ? "R$" : "-R$";

    // UPDATE UI
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    outcomeTotalEl.innerHTML = `<small>R$</small>${outcome}`;
    incomeTotalEl.innerHTML = `<small>R$</small>${income}`;

    clearElement( [expenseList, incomeList, allList] );

    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "expense" ){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "income" ){
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    updateChart(income, outcome);

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id){

    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: R$${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}

function calculateTotal(type, list){
    let sum = 0;

    list.forEach( entry => {
        if( entry.type == type ){
            sum += entry.amount;
        }
    })

    return sum;
}

function calculateBalance(income, outcome){
    return income - outcome;
}

function clearInput(inputs){
    inputs.forEach( input => {
        input.value = "";
    })
}
function show(element){
    element.classList.remove("hide");
}

function hide( elements ){
    elements.forEach( element => {
        element.classList.add("hide");
    })
}

function active(element){
    element.classList.add("active");
}

function inactive( elements ){
    elements.forEach( element => {
        element.classList.remove("active");
    })
}

