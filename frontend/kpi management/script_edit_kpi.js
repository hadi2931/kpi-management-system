// script_edit_kpi.js
$(document).ready(function() {

    // --- Selectors ---
    const $editKpiForm = $('#editKpiForm');
    const $loadingMessage = $('#loadingMessageEdit');
    const $errorMessage = $('#errorMessageEdit');
    const $kpiIdInput = $('#kpiIdEdit'); // Hidden input for ID

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

     // Validation Feedback Helpers
    function displayError($inputElement, message) {
         $inputElement.addClass('is-invalid');
        let $errorContainer = $inputElement.siblings('.invalid-feedback');
        if (!$errorContainer.length) {
             $errorContainer = $('<div class="invalid-feedback"></div>');
             $inputElement.after($errorContainer);
        }
        $errorContainer.text(message).show();
    }

    function removeError($inputElement) {
        $inputElement.removeClass('is-invalid');
        $inputElement.siblings('.invalid-feedback').hide();
    }

    function clearAllErrors() {
        $editKpiForm.find('.is-invalid').each(function() { removeError($(this)); });
        $editKpiForm.find('.invalid-feedback').text('');
    }


    // --- Data Loading ---
    function loadKpiDataAndPopulateForm() {
        console.log("Edit Page: Loading KPI Data");
        const kpiIdParam = getQueryParam('id');
        if (!kpiIdParam) {
            showErrorEdit("No KPI ID provided in URL.");
            return;
        }
        const kpiId = parseInt(kpiIdParam, 10);
        if (isNaN(kpiId)) {
            showErrorEdit("Invalid KPI ID in URL.");
            return;
        }

        // --- SIMULATION: Get from localStorage ---
        try {
            const storedKpisJson = localStorage.getItem('sampleKpis') || '[]';
            const kpis = JSON.parse(storedKpisJson);
            if (!Array.isArray(kpis)) throw new Error("Stored KPI data is invalid.");

            const kpi = kpis.find(k => k && k.id === kpiId);

            setTimeout(() => { // Simulate delay
                if (kpi) {
                    console.log("Edit Page: KPI Found", kpi);
                    populateEditForm(kpi);
                } else {
                     console.error(`Edit Page: KPI with ID ${kpiId} not found.`);
                     showErrorEdit(`KPI with ID ${kpiId} not found.`);
                }
            }, 300);

        } catch (e) {
            console.error("Edit Page: Error loading KPI data:", e);
            showErrorEdit(`Error loading KPI data: ${e.message}`);
        }
        // --- END SIMULATION ---
    }

    function populateEditForm(kpi) {
        try {
            $kpiIdInput.val(kpi.id); // Store the ID
            $('#kpiName').val(kpi.name || '');
            $('#kpiOwner').val(kpi.owner || '');
            $('#kpiDepartment').val(kpi.department || '');
            $('#kpiDescription').val(kpi.description || '');
            $('#kpiTarget').val(kpi.target || '');
            $('#kpiTargetType').val(kpi.targetType || 'Percentage'); // Default if missing
            $('#kpiFrequency').val(kpi.frequency || 'Monthly'); // Default if missing
            $('#kpiCalculationMethod').val(kpi.calculationMethod || '');
            $('#kpiDataSource').val(kpi.dataSource || '');
            $('#kpiThresholdGood').val(kpi.thresholds?.good || ''); // Use optional chaining
            $('#kpiThresholdWarning').val(kpi.thresholds?.warning || '');
            $('#kpiThresholdBad').val(kpi.thresholds?.bad || '');

            $loadingMessage.hide();
            $errorMessage.hide();
            $editKpiForm.show(); // Show the form now
             console.log("Edit Page: Form populated.");
        } catch(e) {
             console.error("Edit Page: Error populating form:", e);
             showErrorEdit(`Error displaying KPI data in form: ${e.message}`);
        }
    }

    function showErrorEdit(message) {
        $loadingMessage.hide();
        $editKpiForm.hide();
        $errorMessage.text(message).show();
         console.error("Edit Page Error:", message);
    }


    // --- Form Submission ---
    $editKpiForm.on('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        clearAllErrors();

        let isValid = true;
        const $requiredFields = $editKpiForm.find('[required]');
        $requiredFields.each(function() {
            const $field = $(this);
            if (!$field.val() || ($field.is('textarea') && !$field.val().trim())) {
                 isValid = false;
                 const fieldName = $field.prev('label').text() || $field.attr('id');
                 displayError($field, `${fieldName} is required.`);
            }
        });

        if (isValid) {
            const kpiId = parseInt($kpiIdInput.val(), 10);
            if (isNaN(kpiId)) {
                 alert('Error: Cannot save changes, KPI ID is missing.');
                 return;
            }

            const updatedKpiData = {
                id: kpiId, // Keep the original ID
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
                 // Preserve existing actual value/status/color/updated date or update if included
                 // For this simulation, we'll just keep existing ones if they aren't part of the edit form
            };

            console.log("Simulating KPI Update:", updatedKpiData);

            // --- SIMULATION: Update localStorage ---
             try {
                let kpis = JSON.parse(localStorage.getItem('sampleKpis') || '[]');
                let kpiFound = false;
                if (Array.isArray(kpis)) {
                    kpis = kpis.map(kpi => {
                        if (kpi && kpi.id === kpiId) {
                            kpiFound = true;
                            // Merge updated fields, keeping existing fields like currentValue etc.
                            return { ...kpi, ...updatedKpiData };
                        }
                        return kpi;
                    });

                    if (kpiFound) {
                        localStorage.setItem('sampleKpis', JSON.stringify(kpis));
                        console.log("KPI updated in localStorage (simulation).");
                        alert('KPI updated successfully! (Simulated)');
                        window.location.href = 'kpi_manager_view.html'; // Redirect back to list
                    } else {
                        alert('Error: KPI not found during update (Simulation).');
                    }
                } else {
                     alert('Error: Could not load KPI data to update (Simulation).');
                }
            } catch(e) {
                 console.error("Error updating KPI in localStorage:", e);
                 alert('An error occurred while saving the changes (Simulation).');
            }
            // --- END SIMULATION ---

        } else {
             console.log('Edit Form validation failed.');
             $editKpiForm.find('.is-invalid').first().focus();
        }
         $editKpiForm.addClass('was-validated');
    });

     // Remove validation errors on input
     $editKpiForm.find('input, select, textarea').on('input change', function() {
         if ($(this).hasClass('is-invalid')) { removeError($(this)); }
     });


    // --- Initialization ---
    loadKpiDataAndPopulateForm();

});