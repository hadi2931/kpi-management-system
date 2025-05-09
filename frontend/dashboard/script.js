// data
const kpis = [
  { name: 'Sale Amount', value: 85000, target: 100000 },
  { name: 'Satisfaction', value: 88, target: 90 },
  { name: 'Stability', value: 99, target: 99 }
]

// KPI card
function renderKpiCards() {
  const container = document.getElementById('kpiCards')
  kpis.forEach(kpi => {
    const progress = Math.min(100, (kpi.value / kpi.target) * 100).toFixed(1)

    const card = document.createElement('div')
    card.className = 'col-md-4 mb-4'
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${kpi.name}</h5>
          <p class="card-text">Target: ${kpi.target}</p>
          <p class="fw-bold">Current: ${kpi.value}</p>
          <div class="progress mb-2">
            <div class="progress-bar ${progress >= 100 ? 'bg-success' : 'bg-info'}"
                 role="progressbar"
                 style="width: ${progress}%;"
                 aria-valuenow="${progress}"
                 aria-valuemin="0"
                 aria-valuemax="100">${progress}%</div>
          </div>
        </div>
      </div>
    `
    container.appendChild(card)
  })
}

// charts
function renderChart() {
  const chartDom = document.getElementById('chart')
  const myChart = echarts.init(chartDom)
  const option = {
    title: { text: 'Sale Amount' },
    tooltip: {},
    xAxis: { type: 'category', data: ['2021', '2022', '2023', '2024'] },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'sale amount',
        type: 'line',
        data: [60000, 70000, 80000, 85000]
      }
    ]
  }
  myChart.setOption(option)
}

renderKpiCards()
renderChart()
