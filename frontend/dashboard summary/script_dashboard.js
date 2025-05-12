// script_dashboard.js
$(document).ready(function() {

    // --- Selectors ---
    const $totalKpisStat = $('#totalKpisStat');
    const $achievedKpisStat = $('#achievedKpisStat');
    const $offTrackKpisStat = $('#offTrackKpisStat');
    const $atRiskKpisStat = $('#atRiskKpisStat');

    // --- Helper ---
     function escapeHtml(str) { /* ... same escapeHtml function ... */ }

    // --- Load Summary Data ---
    function loadDashboardStats() {
        console.log("Dashboard: Loading stats...");

        // --- SIMULATION: Get from localStorage ---
        try {
            const kpis = JSON.parse(localStorage.getItem('sampleKpis') || '[]');
            if (!Array.isArray(kpis)) {
                 throw new Error("Stored KPI data format is invalid.");
            }

            // Simulate delay
            setTimeout(() => {
                console.log("Dashboard: Calculating stats from localStorage data:", kpis);
                const totalKpis = kpis.length;
                const achievedKpis = kpis.filter(k => k.status === 'Achieved').length;
                const offTrackKpis = kpis.filter(k => k.status === 'Off-Track').length;
                const atRiskKpis = kpis.filter(k => k.status === 'At-Risk').length; // Or 'danger' statusColor

                $totalKpisStat.text(totalKpis);
                $achievedKpisStat.text(achievedKpis);
                $offTrackKpisStat.text(offTrackKpis);
                $atRiskKpisStat.text(atRiskKpis);

                console.log("Dashboard: Stats updated.");

            }, 200); // Shorter delay for dashboard

        } catch (e) {
            console.error("Dashboard: Error loading stats:", e);
            // Display error message on dashboard if needed
            $totalKpisStat.text('Err');
            $achievedKpisStat.text('Err');
            $offTrackKpisStat.text('Err');
            $atRiskKpisStat.text('Err');
        }
        // --- END SIMULATION ---
    }

    // --- Initialization ---
    loadDashboardStats();

    // Add Chart.js initialization here if you uncomment the chart canvas in HTML
    // Example:
    // if ($('#kpiStatusChart').length) {
    //     const ctx = document.getElementById('kpiStatusChart').getContext('2d');
    //     const myChart = new Chart(ctx, {
    //         type: 'doughnut',
    //         data: { /* ... data based on stats ... */ },
    //         options: { /* ... chart options ... */ }
    //     });
    // }

});