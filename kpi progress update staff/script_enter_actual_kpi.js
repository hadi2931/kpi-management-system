// script_enter_actual.js
$(document).ready(function() {

    // --- Selectors ---
    const $loadingMessage = $('#loadingMessageActual');
    const $errorMessage = $('#errorMessageActual');
    const $kpiUpdateFormArea = $('#kpiUpdateFormArea');
    const $enterActualForm = $('#enterActualForm');
    const $kpiIdInput = $('#kpiIdActual');
    const $newActualValueInput = $('#newActualValue');

    // --- Helper Functions ---
    // Corrected escapeHtml function
    function escapeHtml(str) {
        if (str === null || typeof str === 'undefined') return '';
        const string = String(str);
        return string
            .replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/>/g, ">")

            .replace(/'/g, "'");
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Basic Validation Feedback Helpers (can be expanded)
    function displayError($inputElement, message) {
        $inputElement.addClass('is-invalid');
        let $errorContainer = $inputElement.siblings('.invalid-feedback');
        if (!$errorContainer.length) {
             $errorContainer = $('<div class="invalid-feedback"></div>');
             $inputElement.after($errorContainer);
        }
        $errorContainer.text(message).show(); // Ensure it's visible
    }

    function removeError($inputElement) {
        $inputElement.removeClass('is-invalid');
        $inputElement.siblings('.invalid-feedback').hide(); // Hide error message
    }

    // --- Data Fetching & Form Population ---
    function loadKpiForUpdate() {
        console.log("LOG: loadKpiForUpdate started."); // Log: Start

        const kpiIdParam = getQueryParam('id');
        console.log("LOG: Retrieved 'id' param:", kpiIdParam); // Log: ID param

        if (!kpiIdParam) {
            showErrorActual("No KPI ID specified in the URL. Please access this page from the KPI list or details view.");
            return;
        }

        const kpiId = parseInt(kpiIdParam, 10);

        if (isNaN(kpiId)) {
            showErrorActual("Invalid KPI ID format in the URL. Expected a number.");
            return;
        }

        console.log("LOG: Parsed KPI ID:", kpiId); // Log: Parsed ID

        // --- SIMULATION: Get from localStorage ---
        try {
            const storedKpisJson = localStorage.getItem('sampleKpis') || '[]';
            console.log("LOG: Raw data from localStorage:", storedKpisJson); // Log: localStorage raw
            const kpis = JSON.parse(storedKpisJson);

            if (!Array.isArray(kpis)) {
                 console.error("LOG: Data in localStorage ('sampleKpis') is not an array!");
                 throw new Error("Stored KPI data is corrupted.");
            }

            console.log(`LOG: Searching for KPI ID ${kpiId} in`, kpis); // Log: Searching
            const kpi = kpis.find(k => k.id === kpiId);

            // Simulate delay
            setTimeout(() => {
                if (kpi) {
                    console.log("LOG: KPI Found:", kpi); // Log: Found
                    populateForm(kpi);
                } else {
                    console.warn(`LOG: KPI with ID ${kpiId} not found in localStorage.`); // Log: Not Found
                    showErrorActual(`KPI with ID ${kpiId} not found. It might have been deleted or the link is incorrect.`);
                }
            }, 300);

        } catch (e) {
             console.error("LOG: Error processing KPI data:", e); // Log: Error processing
             showErrorActual(`An error occurred while retrieving KPI information: ${e.message}`);
        }
        // --- END SIMULATION ---
    }

    function populateForm(kpi) {
        console.log("LOG: populateForm called."); // Log: Populate start
        try {
            $loadingMessage.hide();
            $errorMessage.hide();

            // Populate read-only info (Ensure IDs match HTML)
            $('#kpiNameActual').text(escapeHtml(kpi.name || 'N/A'));
            $('#kpiTargetActual').text(escapeHtml(kpi.target || 'N/A'));
            $('#kpiCurrentValueActual').text(escapeHtml(kpi.currentValue || 'N/A'));
            $('#kpiLastUpdatedActual').text(escapeHtml(kpi.lastUpdated || 'N/A'));

            // Set hidden ID
            $kpiIdInput.val(kpi.id);

            $kpiUpdateFormArea.show(); // Show the form
            console.log("LOG: populateForm finished successfully."); // Log: Populate end
        } catch (e) {
            console.error("LOG: Error during populateForm execution:", e); // Log: Error during populate
             showErrorActual(`An unexpected error occurred while preparing the form: ${e.message}`);
        }
    }

     function showErrorActual(message) {
        console.log("LOG: showErrorActual called with message:", message); // Log: Error show start
        $loadingMessage.hide();
        $kpiUpdateFormArea.hide();
        $errorMessage.text(message).show();
    }

    // --- Form Submission ---
    $enterActualForm.on('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;
        removeError($newActualValueInput); // Clear previous error first

        // Validate New Actual Value
        if (!$newActualValueInput.val().trim()) { // Check if value is empty after trimming
            isValid = false;
            displayError($newActualValueInput, 'New Actual Value is required.');
        }

        if (isValid) {
            const kpiId = parseInt($kpiIdInput.val(), 10);
            const newActualValue = escapeHtml($newActualValueInput.val().trim());
            const newStatus = $('#newStatus').val();
            const updateNotes = escapeHtml($('#updateNotes').val());

            if (isNaN(kpiId)) {
                alert('Error: Cannot save update due to missing KPI ID.');
                return;
            }

            console.log(`Simulating update for KPI ID: ${kpiId}`);
            console.log(`New Value: ${newActualValue}, New Status: ${newStatus || '(Auto)'}, Notes: ${updateNotes}`);

            // --- SIMULATION: Update localStorage ---
            try {
                let kpis = JSON.parse(localStorage.getItem('sampleKpis') || '[]');
                let kpiFound = false;
                if (Array.isArray(kpis)) {
                    kpis = kpis.map(kpi => {
                        if (kpi.id === kpiId) {
                            kpiFound = true;
                            // Basic update - real app might recalculate status/color
                            kpi.currentValue = newActualValue;
                            kpi.lastUpdated = new Date().toISOString().split('T')[0];
                            if (newStatus) {
                                kpi.status = newStatus;
                                // TODO: Add logic to update statusColor based on newStatus
                            }
                             // TODO: Add logic to handle notes (e.g., add to a history array in the kpi object)
                            return kpi;
                        }
                        return kpi;
                    });

                    if (kpiFound) {
                        localStorage.setItem('sampleKpis', JSON.stringify(kpis));
                        console.log("KPI updated in localStorage (simulation).");
                        alert('Actual value saved successfully! (Simulated)');
                        window.location.href = 'kpi_manager_view.html';
                    } else { /* ... error handling ... */ }
                } else { /* ... error handling ... */ }
            } catch(e) { /* ... error handling ... */ }
            // --- END SIMULATION ---

        } else {
            console.log('Actual Value form validation failed.');
            $enterActualForm.find('.is-invalid').first().focus();
        }
         // $enterActualForm.addClass('was-validated'); // Use Bootstrap's validation display if desired
    });

    // Remove validation errors on input
     $newActualValueInput.on('input', function() {
         if ($(this).hasClass('is-invalid')) {
            removeError($(this));
         }
     });

    // --- Initialization ---
    loadKpiForUpdate();

});