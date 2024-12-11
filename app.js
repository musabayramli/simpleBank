const bankAccount = {
    balance: 0,
    transactions: [],

    deposit: function(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactions.push({ type: 'Deposit', amount: amount });
        } else {
            alert("Deposit amount must be positive.");
        }
    },

    withdraw: function(amount) {
        if (amount <= 0) {
            alert("Withdrawal amount must be positive.");
            return;
        }
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactions.push({ type: 'Withdrawal', amount: amount });
        } else {
            alert("Insufficient funds.");
        }
    },

    checkBalance: function() {
        return this.balance;
    },

    viewTransactionHistory: function() {
        return this.transactions;
    },

    resetAccount: function() {
        this.balance = 0;
        this.transactions = [];
        alert("Account has been reset.");
    }
};

function getAmountFromInput() {
    const amount = parseFloat(document.getElementById('amount').value);
    document.getElementById('amount').value = ''; 
    return amount;
}

function deposit() {
    const amount = getAmountFromInput();  
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }
    bankAccount.deposit(amount);
    updateTransactionHistory();
}

function withdraw() {
    const amount = getAmountFromInput();  
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }
    bankAccount.withdraw(amount);
    updateTransactionHistory();
}

function checkBalance() {
    const balance = bankAccount.checkBalance();
    document.getElementById('modalBalance').textContent = `$${balance}`;
    document.getElementById('balanceModal').style.display = "block"; 
}

function reset() {
    bankAccount.resetAccount();
    updateTransactionHistory();
}

function updateTransactionHistory() {
    const transactions = bankAccount.viewTransactionHistory();
    const transactionHistory = document.getElementById('transactionHistory');
    transactionHistory.innerHTML = "";  

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type}: $${transaction.amount}`;
        transactionHistory.appendChild(listItem);
    });
}

function handleModalClose(event) {
    event.stopPropagation(); 
    document.getElementById('balanceModal').style.display = "none"; 
}
