document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheck = document.getElementById('termsCheck');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous custom errors
        removeError(passwordInput);
        removeError(confirmPasswordInput);
        removeError(termsCheck.parentElement); // Checkbox parent for error message placement

        let isValid = true;

        // 1. Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            displayError(confirmPasswordInput, 'Passwords do not match.');
            isValid = false;
        }

        // 2. Check password strength (basic example)
        if (passwordInput.value.length < 8) {
            displayError(passwordInput, 'Password must be at least 8 characters long.');
            isValid = false;
        }
        // You can add more complex regex for password strength here
        // e.g., if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)) { ... }

        // 3. Check if terms are agreed
        if (!termsCheck.checked) {
            displayError(termsCheck.parentElement, 'You must agree to the Terms and Conditions.');
            isValid = false;
        }

        // 4. Check other required fields (Bootstrap handles this visibly, but good to double check)
        const requiredFields = registerForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') { // Checkboxes handled above
                displayError(field, `${field.previousElementSibling.innerText} is required.`);
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                displayError(field, 'Please enter a valid email address.');
                isValid = false;
            }
        });


        if (isValid) {
            // Simulate backend registration
            console.log('Form is valid. Submitting data (simulated):');
            console.log('Full Name:', document.getElementById('fullName').value);
            console.log('Email:', document.getElementById('email').value);
            console.log('Password: [PROTECTED]');

            // Show a success message (you can replace alert with a more styled message on the page)
            alert('Registration successful! (Simulated)\nYou would typically be redirected or shown a confirmation message.');

            // Optionally, clear the form or redirect
            // registerForm.reset();
            // window.location.href = 'login.html'; // Example redirect
        } else {
            console.log('Form has errors. Please correct them.');
        }
    });

    function displayError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('invalid-feedback');
            // Insert after the input or its parent if it's a checkbox/radio wrapper
            if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
                inputElement.parentElement.insertAdjacentElement('afterend', errorElement);
            } else {
                inputElement.insertAdjacentElement('afterend', errorElement);
            }
        }
        errorElement.textContent = message;
    }

    function removeError(inputElement) {
        inputElement.classList.remove('is-invalid');
        let errorElement = inputElement.nextElementSibling;
         // If the inputElement is a wrapper (like for checkbox), check its direct sibling
        if (inputElement.classList.contains('form-check')) {
            errorElement = inputElement.nextElementSibling;
        }

        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.remove();
        }
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Clear errors when user starts typing again
    ['fullName', 'email', 'password', 'confirmPassword'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => removeError(input));
        }
    });
    if (termsCheck) {
        termsCheck.addEventListener('change', () => removeError(termsCheck.parentElement));
    }
});