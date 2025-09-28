document.addEventListener("DOMContentLoaded", function () {
    // Create Bill Split Toggle Button
    const billSplitToggle = document.createElement("button");
    billSplitToggle.className = "bill-split-toggle";
    billSplitToggle.textContent = "Open Bill Split";
    document.body.appendChild(billSplitToggle);

    // Create Bill Split Container (Initially Hidden)
    const billSplitContainer = document.createElement("div");
    billSplitContainer.className = "bill-split-container";
    billSplitContainer.innerHTML = `
        <h2 class="bill-split-header">Bill Split</h2>
        <div id="billSplitForm">
            <input type="number" id="totalAmount" placeholder="Total Amount">
            <input type="number" id="numberOfPeople" placeholder="Number of People">
            <button id="setNames">Set Names</button>
            <div id="errorMessage" class="error-message"></div>
            <div id="nameInputs"></div>
        </div>
        <div id="splitResults"></div>
    `;

    document.body.appendChild(billSplitContainer);

    // Get Elements
    const totalAmountInput = document.getElementById("totalAmount");
    const numberOfPeopleInput = document.getElementById("numberOfPeople");
    const setNamesButton = document.getElementById("setNames");
    const errorMessageDiv = document.getElementById("errorMessage");
    const nameInputsDiv = document.getElementById("nameInputs");
    const splitResultsDiv = document.getElementById("splitResults");

    let people = [];
    let payerIndex = null;
    let amountPerPerson = null;

    // Toggle Bill Split Panel Visibility
    billSplitToggle.addEventListener("click", function () {
        if (billSplitContainer.classList.contains("show")) {
            billSplitContainer.classList.remove("show");
            billSplitToggle.textContent = "Open Bill Split";
        } else {
            billSplitContainer.classList.add("show");
            billSplitToggle.textContent = "Close Bill Split";
        }
    });

    // Set Names and Create Input Fields
    setNamesButton.addEventListener("click", function () {
        const numberOfPeople = parseInt(numberOfPeopleInput.value);

        if (!numberOfPeople || numberOfPeople <= 0) {
            errorMessageDiv.textContent = "Please enter a valid number of people.";
            return;
        }

        people = Array.from({ length: numberOfPeople }, () => ({ name: "" }));
        errorMessageDiv.textContent = "";

        nameInputsDiv.innerHTML = `<h3>Enter Each Person's Name:</h3>`;
        people.forEach((_, index) => {
            const personDiv = document.createElement("div");
            personDiv.innerHTML = `
                <input type="text" id="person${index}" placeholder="Person ${index + 1} Name">
                <label>
                    <input type="radio" name="payer" value="${index}"> Payer
                </label>
            `;
            nameInputsDiv.appendChild(personDiv);
        });

        const calculateButton = document.createElement("button");
        calculateButton.textContent = "Calculate Split";
        calculateButton.addEventListener("click", calculateSplit);
        nameInputsDiv.appendChild(calculateButton);
    });

    // Calculate Bill Split
    function calculateSplit() {
        const totalAmount = parseFloat(totalAmountInput.value);
        const numberOfPeople = people.length;

        if (!totalAmount || isNaN(totalAmount)) {
            errorMessageDiv.textContent = "Please enter a valid total amount.";
            return;
        }

        people = people.map((_, index) => ({
            name: document.getElementById(`person${index}`).value || `Person ${index + 1}`,
        }));

        const payerRadioButtons = document.querySelectorAll('input[name="payer"]');
        payerIndex = null;
        payerRadioButtons.forEach((radio, index) => {
            if (radio.checked) {
                payerIndex = index;
            }
        });

        if (payerIndex === null) {
            errorMessageDiv.textContent = "Please select a payer.";
            return;
        }

        amountPerPerson = (totalAmount / (numberOfPeople - 1)).toFixed(2);
        errorMessageDiv.textContent = "";

        splitResultsDiv.innerHTML = `
            <h3>Each person owes: ₹${amountPerPerson} to ${people[payerIndex].name}</h3>
            <button id="submitContributions">Submit Contributions</button>
        `;

        document.getElementById("submitContributions").addEventListener("click", submitContributions);
    }

    // Submit Contributions
    function submitContributions() {
        const contributions = people.map((person, index) => ({
            name: person.name,
            amountOwed: index === payerIndex ? 0 : amountPerPerson,
        }));

        console.log("Final contributions:", contributions);
        alert("Bill split submitted successfully!");
    }
});
