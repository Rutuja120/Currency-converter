// Fetch currency codes and populate dropdowns
const apiURL = "https://open.er-api.com/v6/latest/USD"; // Example API endpoint

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");

// Fetch currency data from API
async function fetchCurrencies() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    populateDropdowns(currencies);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    resultDiv.innerHTML = "Error fetching currency data.";
  }
}

// Populate dropdown options
function populateDropdowns(currencies) {
  currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    const optionTo = document.createElement("option");

    optionFrom.value = currency;
    optionFrom.textContent = currency;

    optionTo.value = currency;
    optionTo.textContent = currency;

    fromCurrency.appendChild(optionFrom);
    toCurrency.appendChild(optionTo);
  });

  // Set default selections
  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

// Convert currency
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const rateFrom = data.rates[from];
    const rateTo = data.rates[to];

    const convertedAmount = (amount / rateFrom) * rateTo;

    resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    resultDiv.innerHTML = "Error converting currency.";
  }
}

// Event listeners
convertBtn.addEventListener("click", convertCurrency);

// Initialize app
fetchCurrencies();
