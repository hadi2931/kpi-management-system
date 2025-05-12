document.addEventListener('DOMContentLoaded', function () {
  const commonChartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Allows explicit height setting
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
      indexAxis: 'y', // For Chart.js v3+ to make it horizontal
      scales: {
          xAxes: [{ // For horizontal, x becomes the value axis
              ticks: {
                  beginAtZero: true,
                  fontSize: 10,
                  // Forcing integer steps if needed (e.g., for counts)
                  callback: function(value) { if (Number.isInteger(value)) { return value; } },
                  stepSize: 1
              },
               gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.05)"
              }
          }],
          yAxes: [{ // y becomes the category axis
              ticks: {
                  fontSize: 10
              },
              gridLines: {
                  display: false
              }
          }]
      }
  };


  // 1. Budget Chart (Vertical Bar)
  const budgetCtx = document.getElementById('budgetChart').getContext('2d');
  new Chart(budgetCtx, {
      type: 'bar',
      data: {
          labels: ['PROJECTED', 'ACTUAL', 'REMAINDER'],
          datasets: [{
              label: 'Amount ($)',
              data: [250000, 185000, 65000],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.7)', // Blue
                  'rgba(75, 192, 192, 0.7)', // Green
                  'rgba(201, 203, 207, 0.7)'  // Grey
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(201, 203, 207, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: { ...commonChartOptions, legend: { display: false } }
  });

  // 2. Projects / Tasks Chart (Donut)
  const projectsTasksCtx = document.getElementById('projectsTasksChart').getContext('2d');
  new Chart(projectsTasksCtx, {
      type: 'doughnut',
      data: {
          labels: ['NOT STARTED', 'IN PROGRESS', 'COMPLETE'],
          datasets: [{
              data: [23, 36, 41], // Percentages
              backgroundColor: [
                  'rgba(220, 220, 220, 0.8)', // Light Grey for Not Started
                  'rgba(153, 204, 51, 0.8)',  // Light Green for In Progress
                  'rgba(0, 128, 0, 0.8)'    // Dark Green for Complete
              ],
              borderColor: [
                  'rgba(220, 220, 220, 1)',
                  'rgba(153, 204, 51, 1)',
                  'rgba(0, 128, 0, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 60, // Adjust for donut thickness
          legend: {
              display: true,
              position: 'bottom',
               labels: { fontSize: 10, boxWidth:10, padding: 5 }
          },
          tooltips: {
               callbacks: {
                  label: function(tooltipItem, data) {
                      let label = data.labels[tooltipItem.index] || '';
                      if (label) {
                          label += ': ';
                      }
                      label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
                      return label;
                  }
              }
          }
      }
  });

  // 3. Risks Chart (Horizontal Bar)
  const risksCtx = document.getElementById('risksChart').getContext('2d');
  new Chart(risksCtx, {
      type: 'bar', // For Chart.js v3+
      data: {
          labels: ['HIGH', 'MEDIUM', 'LOW'],
          datasets: [{
              label: 'Count',
              data: [1, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',  // Red for High
                  'rgba(255, 206, 86, 0.7)',  // Yellow for Medium
                  'rgba(173, 216, 230, 0.7)' // Light Blue for Low
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(173, 216, 230, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: { ...commonHorizontalBarOptions, legend: { display: false } }
  });

  // 4. Issues Chart (Horizontal Bar)
  const issuesCtx = document.getElementById('issuesChart').getContext('2d');
  new Chart(issuesCtx, {
      type: 'bar', // For Chart.js v3+
      data: {
          labels: ['UNRESOLVED', 'REVISIONS', 'PENDING ACTIONS'],
          datasets: [{
              label: 'Count',
              data: [3, 1, 3], // Matching the image (Pending 3, Revisions 1, Unresolved 3)
              backgroundColor: [
                  'rgba(100, 149, 237, 0.7)', // Cornflower Blue for Unresolved
                  'rgba(144, 238, 144, 0.7)', // Light Green for Revisions
                  'rgba(192, 192, 192, 0.7)'  // Silver for Pending Actions
              ],
              borderColor: [
                  'rgba(100, 149, 237, 1)',
                  'rgba(144, 238, 144, 1)',
                  'rgba(192, 192, 192, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: { ...commonHorizontalBarOptions, legend: { display: false } }
  });

  // 5. Monthly Revenue Chart (Vertical Bar)
  const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
  new Chart(monthlyRevenueCtx, {
      type: 'bar',
      data: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [{
              label: 'Revenue ($)',
              data: [25000, 32000, 28000, 18000, 27000, 35000, 29000, 28000, 22000, 26000, 26000, 27000], // Approximate values
              backgroundColor: 'rgba(153, 102, 255, 0.6)', // Purple
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
          }]
      },
      options: { ...commonChartOptions, legend: { display: false } }
  });

  // 6. Quarterly Revenue Chart (Horizontal Bar)
  const quarterlyRevenueCtx = document.getElementById('quarterlyRevenueChart').getContext('2d');
  new Chart(quarterlyRevenueCtx, {
      type: 'bar', // For Chart.js v3+
      data: {
          labels: ['QUARTER 1', 'QUARTER 2', 'QUARTER 3', 'QUARTER 4'],
          datasets: [{
              label: 'Revenue ($)',
              data: [85000, 80000, 79000, 79000], // Approximate values
              backgroundColor: [
                  'rgba(224, 224, 224, 0.8)', // Lighter green-ish/yellowish as in Q1
                  'rgba(255, 235, 170, 0.8)', // Lighter blue-ish as in Q2
                  'rgba(200, 225, 255, 0.8)', // Lighter yellow-ish/orange as in Q3
                  'rgba(255, 210, 210, 0.8)'  // Lighter peach as in Q4
              ],
               borderColor: [
                  'rgba(200,200,200,1)',
                  'rgba(230,210,150,1)',
                  'rgba(180,200,230,1)',
                  'rgba(230,190,190,1)'
              ],
              borderWidth: 1
          }]
      },
       options: { ...commonHorizontalBarOptions, legend: { display: false } }
  });
});