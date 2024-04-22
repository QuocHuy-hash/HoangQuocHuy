// Get references to the DOM elements
const inputAmount = document.getElementById('input-amount');
const outputAmount = document.getElementById('output-amount');
const swapButton = document.getElementById('button');

// Prevent default form submission behavior
swapButton.addEventListener('click', function (event) {
    event.preventDefault(); // Stops form submission and page refresh
    // Your conversion logic here
    convertCurrency();
});

// Function to handle currency conversion
function convertCurrency() {
    const fromCurrency = 'USD'; // Assuming USD as source currency (replace if needed)
    const toCurrency = 'VND'; // Assuming VND as target currency (replace if needed)
    const amount = parseFloat(inputAmount.value); // Get input amount

    // Fetch the exchange rate (replace with your API call or logic)
    fetch(`https://api.example.com/rates?from=${fromCurrency}&to=${toCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rate;
            const convertedAmount = amount * exchangeRate;
            outputAmount.value = convertedAmount.toFixed(2); // Display result with 2 decimal places
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            // Handle errors appropriately (e.g., display error message to user)
        });
}