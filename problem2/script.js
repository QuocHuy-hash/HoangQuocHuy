const form = document.getElementById('swap-form');
const inputAmount = document.getElementById('input-amount');
const outputAmount = document.getElementById('output-amount');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Input Validation
    const amount = parseFloat(inputAmount.value);
    if (isNaN(amount) || amount <= 0) {
        errorMessage.textContent = 'Please enter a valid amount greater than zero.';
        return; // Prevent further processing if invalid
    }

    try {
        // Fetch exchange rate
        const fromCurrency = 'USD'; // Assuming USD as source currency (replace if needed)
        const toCurrency = 'VND'; // Assuming VND as target currency (replace if needed)
        const response = await fetch(`https://api.example.com/rates?from=${fromCurrency}&to=${toCurrency}`);

        if (!response.ok) {
            throw new Error(`Error fetching exchange rate: ${response.statusText}`);
        }

        const data = await response.json();
        const exchangeRate = data.rate;

        // Convert and display amount
        const convertedAmount = amount * exchangeRate;
        outputAmount.value = convertedAmount.toFixed(2); // Display result with 2 decimal places
        errorMessage.textContent = ''; // Clear any previous error messages
    } catch (error) {
        console.error('Error fetching exchange rate:', error);

        // Improved Error Handling
        if (error.message === 'Network Error') {
            errorMessage.textContent = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.message.startsWith('Error fetching exchange rate')) {
            errorMessage.textContent = 'There was an issue retrieving the exchange rate. Please try again later.';
        } else {
            errorMessage.textContent = 'An unexpected error occurred. Please try again later.';
        }
    }
});
