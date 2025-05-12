document.addEventListener('DOMContentLoaded', function () {
    const confirmDeactivateBtn = document.getElementById('confirmDeactivateBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const confirmDeleteEmailInput = document.getElementById('confirmDeleteEmailInput');
    const userEmailSpan = document.getElementById('userEmail'); // For getting the actual email
    const confirmEmailTextSpan = document.getElementById('confirmEmailText'); // For displaying in modal

    // Sample user data - in a real app, this would come from the backend/session
    const currentUserEmail = userEmailSpan ? userEmailSpan.textContent.trim() : 'jane.doe@example.com (Sample)'.split(' (Sample)')[0];

    if (confirmEmailTextSpan) {
        confirmEmailTextSpan.textContent = currentUserEmail;
    }

    if (confirmDeactivateBtn) {
        confirmDeactivateBtn.addEventListener('click', function () {
            // Simulate deactivation
            console.log('Deactivating account...');
            // Add logic to disable UI elements or show a message
            alert('Account Deactivated Successfully (Simulated).\nYou would typically be logged out.');
            $('#deactivateModal').modal('hide');
            // Potentially redirect: window.location.href = '/logout';
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function () {
            const enteredEmail = confirmDeleteEmailInput.value.trim();
            removeError(confirmDeleteEmailInput);

            if (enteredEmail === currentUserEmail) {
                // Simulate deletion
                console.log('Permanently deleting account...');
                alert('Account Deleted Permanently (Simulated).\nAll your data would be erased. You will be logged out.');
                $('#deleteModal').modal('hide');
                // Potentially redirect to a goodbye page or homepage:
                // window.location.href = '/account-deleted';
            } else {
                displayError(confirmDeleteEmailInput, 'The entered email does not match your account email.');
                console.error('Email confirmation failed for deletion.');
            }
        });
    }

    // Helper to display error for email confirmation in delete modal
    function displayError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        const errorFeedback = inputElement.nextElementSibling; // Assumes .invalid-feedback is next sibling
        if (errorFeedback && errorFeedback.classList.contains('invalid-feedback')) {
            errorFeedback.textContent = message;
            // errorFeedback.style.display = 'block'; // Ensure it's visible
        }
    }

    function removeError(inputElement) {
        inputElement.classList.remove('is-invalid');
         const errorFeedback = inputElement.nextElementSibling;
        if (errorFeedback && errorFeedback.classList.contains('invalid-feedback')) {
            // errorFeedback.style.display = 'none';
        }
    }

    // Clear error on input for delete confirmation
    if (confirmDeleteEmailInput) {
        confirmDeleteEmailInput.addEventListener('input', () => removeError(confirmDeleteEmailInput));
    }

    // Ensure modals close properly if user clicks outside or escape (Bootstrap default)
    // And clear any modal-specific states if needed when they are hidden
    $('#deleteModal').on('hidden.bs.modal', function () {
        if(confirmDeleteEmailInput) {
            confirmDeleteEmailInput.value = ''; // Clear input
            removeError(confirmDeleteEmailInput); // Clear any error styles
        }
    });
});