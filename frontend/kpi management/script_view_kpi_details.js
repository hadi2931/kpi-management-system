// script_view_kpi.js
$(document).ready(function() {

    // --- Selectors ---
    const $loadingMessage = $('#loadingMessage');
    const $errorMessage = $('#errorMessage');
    const $kpiDataSection = $('#kpiDataSection');
    const $editKpiLink = $('#editKpiLink');
    const $kpiDetailHeader = $('#kpiDetailHeader');

    // --- Helper Functions ---
    // Corrected escapeHtml function
    function escapeHtml(str) {
        if (str === null || typeof str === 'undefined') return '';
        const string = String(str); // Ensure it's a string
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

    // --- Data Fetching & Display ---
    function loadKpiDetails() {
        console.log("LOG: loadKpiDetails started."); // Log: Start

        const kpiIdParam = getQueryParam('id');
        console.log("LOG: Retrieved 'id' param:", kpiIdParam); // Log: ID param

        if (!kpiIdParam) {
            showError("No KPI ID specified in the URL. Please access this page from the KPI list.");
            return;
        }

        const kpiId = parseInt(kpiIdParam, 10);

        if (isNaN(kpiId)) {
            showError("Invalid KPI ID format in the URL. Expected a number.");
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
                 throw new Error("Stored KPI data is corrupted."); // Treat as error
            }

            console.log(`LOG: Searching for KPI ID ${kpiId} in`, kpis); // Log: Searching
            const kpi = kpis.find(k => k.id === kpiId);

             // Simulate delay
            setTimeout(() => {
                if (kpi) {
                    console.log("LOG: KPI Found:", kpi); // Log: Found
                    displayKpiDetails(kpi);
                } else {
                    console.warn(`LOG: KPI with ID ${kpiId} not found in localStorage.`); // Log: Not Found
                    showError(`KPI with ID ${kpiId} not found. It might have been deleted or the link is incorrect.`);
                }
            }, 300); // Short delay

        } catch (e) {
             console.error("LOG: Error processing KPI data:", e); // Log: Error processing
             showError(`An error occurred while retrieving KPI details: ${e.message}`);
        }
        // --- END SIMULATION ---
    }

    function displayKpiDetails(kpi) {
        console.log("LOG: displayKpiDetails called."); // Log: Display start
        try {
            $loadingMessage.hide();
            $errorMessage.hide();

            // Populate fields (Ensure IDs match HTML exactly)
            $('#kpiNameDisplay').text(kpi.name || 'N/A');
            $kpiDetailHeader.text(`KPI Details: ${kpi.name || ''}`);
            $('#kpiOwner').text(escapeHtml(kpi.owner || 'N/A'));
            $('#kpiDepartment').text(escapeHtml(kpi.department || 'N/A'));
            $('#kpiLastUpdated').text(escapeHtml(kpi.lastUpdated || 'N/A'));
            $('#kpiDescription').text(escapeHtml(kpi.description || 'N/A'));
            $('#kpiTarget').text(escapeHtml(kpi.target || 'N/A'));
            $('#kpiTargetType').text(escapeHtml(kpi.targetType || 'N/A'));
            $('#kpiCurrentValue').text(escapeHtml(kpi.currentValue || 'N/A'));

            const statusColor = kpi.statusColor || 'secondary';
            const $statusBadge = $('#kpiStatus');
            $statusBadge.text(escapeHtml(kpi.status || 'N/A'))
                        .removeClass('badge-success badge-warning badge-danger badge-info badge-secondary')
                        .addClass(`badge-${escapeHtml(statusColor)}`);

            $('#kpiCalculationMethod').text(escapeHtml(kpi.calculationMethod || 'N/A'));
            $('#kpiFrequency').text(escapeHtml(kpi.frequency || 'N/A'));
            $('#kpiDataSource').text(escapeHtml(kpi.dataSource || 'N/A'));

            $('#kpiThresholdGood').text(escapeHtml(kpi.thresholds && kpi.thresholds.good || 'N/A'));
            $('#kpiThresholdWarning').text(escapeHtml(kpi.thresholds && kpi.thresholds.warning || 'N/A'));
            $('#kpiThresholdBad').text(escapeHtml(kpi.thresholds && kpi.thresholds.bad || 'N/A'));

            // Update Edit button link and show it
            $editKpiLink.attr('href', `kpi_manager_edit.html?id=${kpi.id}`).show();

            $kpiDataSection.show(); // Show the populated data section
            console.log("LOG: displayKpiDetails finished successfully."); // Log: Display end
        } catch(e) {
             console.error("LOG: Error during displayKpiDetails execution:", e); // Log: Error during display
             showError(`An unexpected error occurred while displaying the KPI details: ${e.message}`);
        }
    }

    function showError(message) {
        console.log("LOG: showError called with message:", message); // Log: Error show start
        $loadingMessage.hide();
        $kpiDataSection.hide();
        $editKpiLink.hide();
        $errorMessage.text(message).show();
    }

    // --- Initialization ---
    loadKpiDetails();

});