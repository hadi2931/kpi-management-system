document.addEventListener('DOMContentLoaded', function () {
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 10,
                boxWidth: 10,
                padding: 10
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 10
                },
                gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.05)"
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 10
                },
                gridLines: {
                    display: false
                }
            }]
        },
        tooltips: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFontSize: 12,
            bodyFontSize: 10
        }
    };

    const commonHorizontalBarOptions = {
        ...commonChartOptions,
        indexAxis: 'y',
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 10,
                    callback: function(value) { if (Number.isInteger(value)) { return value; } },
                    stepSize: 1
                },
                gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.05)"
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 10
                },
                gridLines: {
                    display: false
                }
            }]
        }
    };

    // --- 1. KPI Status Overview (Bar Chart) ---
    const kpiStatusCtx = document.getElementById('kpiStatusChart').getContext('2d');
    new Chart(kpiStatusCtx, {
        type: 'bar',
        data: {
            labels: ['Active', 'Inactive', 'Off Track', 'Achieved', 'At Risk'],
            datasets: [{
                label: 'Number of KPIs',
                data: [50, 15, 5, 30, 10], // Example data - replace with your actual counts
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',   // Active (Green-ish)
                    'rgba(201, 203, 207, 0.7)', // Inactive (Grey)
                    'rgba(255, 99, 132, 0.7)',    // Off Track (Red)
                    'rgba(54, 162, 235, 0.7)',   // Achieved (Blue)
                    'rgba(255, 206, 86, 0.7)'    // At Risk (Yellow)
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: { ...commonChartOptions, legend: { display: false } }
    });

    // --- 2. Underperforming KPIs by Department (Horizontal Bar Chart) ---
    const underperformingKpisCtx = document.getElementById('underperformingKpisChart').getContext('2d');
    new Chart(underperformingKpisCtx, {
        type: 'bar', // Now it will be a vertical bar chart
        data: {
            labels: ['Sales', 'Marketing', 'Operations'], // Example departments - adjust to match your data
            datasets: [{
                label: 'Number of At Risk KPIs',
                data: [3, 5, 2], // Example data - adjust to match your data
                backgroundColor: 'rgba(255, 206, 86, 0.7)', // Yellow for "At Risk"
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            ...commonChartOptions, // Use the base options
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10,
                        callback: function(value) { if (Number.isInteger(value)) { return value; } },
                        stepSize: 1
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.05)"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 10
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            indexAxis: 'x' // Set indexAxis to 'x' for a vertical bar chart
        }
    });

    // --- 3. KPI Achievement Trends (Line Chart) ---
    const kpiTrendCtx = document.getElementById('kpiTrendChart').getContext('2d');
    const kpiTrendChart = new Chart(kpiTrendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example timeline
            datasets: [
                {
                    label: 'Customer Satisfaction Score (%)',
                    data: [75, 78, 80, 82, 84, 85], // Example KPI scores
                    borderColor: 'rgba(54, 162, 235, 1)', // Blue
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
                    fill: true,
                    borderWidth: 2
                },
                // You can add more datasets here for other KPIs or filtered data
            ]
        },
        options: { ...commonChartOptions }
    });

    // --- Filter Logic (Basic Example) ---
    const trendFilter = document.getElementById('trendFilter');
    trendFilter.addEventListener('change', function() {
        const filterValue = this.value;
        // In a real application, you would fetch data based on the filterValue
        // and update the kpiTrendChart's data.datasets array.

        // For this front-end example, let's just update the label:
        if (filterValue === 'department') {
            kpiTrendChart.data.datasets[0].label = 'Average KPI Score (Department)';
        } else if (filterValue === 'staff') {
            kpiTrendChart.data.datasets[0].label = 'Average KPI Score (Staff)';
        } else if (filterValue === 'kpi') {
            kpiTrendChart.data.datasets[0].label = 'Specific KPI Trend';
        } else {
            kpiTrendChart.data.datasets[0].label = 'Overall KPI Achievement Trend';
        }
        kpiTrendChart.update(); // Re-render the chart
    });
});