// script_add_kpi.js
$(document).ready(function() {

    const $addKpiForm = $('#addKpiForm');

    // Utility to escape HTML
    function escapeHtml(str) {
        if (str === null || typeof str === 'undefined') return '';
        return String(str)
            .replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/>/g, ">")
            .replace(/'/g, "'");
    }

    // Validation Feedback Helpers
    function displayError($inputElement, message) {
        $inputElement.addClass('is-invalid');
        let $errorContainer = $inputElement.siblings('.invalid-feedback');
        if (!$errorContainer.length) {
             $errorContainer = $('<div class="invalid-feedback"></div>');
             $inputElement.after($errorContainer);
        }
        $errorContainer.text(message);
    }

    function removeError($inputElement) {
        $inputElement.removeClass('is-invalid');
        // $inputElement.siblings('.invalid-feedback').remove(); // Or just hide it
    }

    function clearAllErrors() {
        $addKpiForm.find('.is-invalid').each(function() {
             removeError($(this));
        });
         $addKpiForm.find('.invalid-feedback').text(''); // Clear text from existing feedback divs
    }

    // Form Submission Handler
    $addKpiForm.on('submit', function(event) {
        event.preventDefault();
        event.stopPropagation(); // Prevent bootstrap validation from fully taking over if we want custom control
        clearAllErrors();

        let isValid = true;
        const $requiredFields = $addKpiForm.find('[required]');

        // Basic Required Field Check
        $requiredFields.each(function() {
            const $field = $(this);
            if (!$field.val() || ($field.is('textarea') && !$field.val().trim())) {
                 isValid = false;
                 const fieldName = $field.prev('label').text() || $field.attr('id'); // Get label text or ID
                 displayError($field, `${fieldName} is required.`);
            }
        });

        // Add more specific validation if needed (e.g., format for target)

        if (isValid) {
            // Simulate saving data
            const newKpiData = {
                // Create a dummy ID (in real app, backend creates ID)
                id: Date.now(), // Simple unique ID for demo
                name: escapeHtml($('#kpiName').val()),
                owner: escapeHtml($('#kpiOwner').val()),
                department: escapeHtml($('#kpiDepartment').val()),
                description: escapeHtml($('#kpiDescription').val()),
                target: escapeHtml($('#kpiTarget').val()),
                targetType: $('#kpiTargetType').val(),
                frequency: $('#kpiFrequency').val(),
                calculationMethod: escapeHtml($('#kpiCalculationMethod').val()),
                dataSource: escapeHtml($('#kpiDataSource').val()),
                thresholds: {
                    good: escapeHtml($('#kpiThresholdGood').val()),
                    warning: escapeHtml($('#kpiThresholdWarning').val()),
                    bad: escapeHtml($('#kpiThresholdBad').val())
                },
                // Default other fields for the list view simulation
                currentValue: "N/A",
                status: "Active", // Default status
                statusColor: "info", // Default color
                lastUpdated: new Date().toISOString().split('T')[0] // Today's date
            };

            console.log("Simulating KPI Save:", newKpiData);

            // --- SIMULATION: Add to localStorage to persist across pages for demo ---
            try {
                let kpis = JSON.parse(localStorage.getItem('sampleKpis') || '[]');
                // Make sure it's an array
                 if (!Array.isArray(kpis)) kpis = [];
                kpis.push(newKpiData);
                localStorage.setItem('sampleKpis', JSON.stringify(kpis));
                console.log("KPI added to localStorage (simulation).");

                 // Show success and redirect
                alert('New KPI added successfully! (Simulated)');
                window.location.href = 'kpi_manager_view.html'; // Redirect back to list

            } catch (e) {
                 console.error("Error saving KPI to localStorage:", e);
                 alert('An error occurred while saving the KPI (Simulation).');
            }
            // --- END SIMULATION ---

            // $addKpiForm[0].reset(); // Reset form
            // clearAllErrors();

        } else {
             console.log('Form validation failed.');
             // Optionally focus first invalid field
             $addKpiForm.find('.is-invalid').first().focus();
        }

        // Add Bootstrap's validation classes AFTER our custom checks
        $addKpiForm.addClass('was-validated');
    });

    // Remove validation errors on input
     $addKpiForm.find('input, select, textarea').on('input change', function() {
         if ($(this).hasClass('is-invalid')) {
            removeError($(this));
            // Manually remove was-validated if you want errors to only show on submit
            // $addKpiForm.removeClass('was-validated');
         }
     });

});