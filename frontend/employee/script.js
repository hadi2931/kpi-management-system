// data
const kpis = [
  {
    name: 'Sales Amount',
    value: 85000,
    target: 100000,
    owner: 'Alice',
    department: 'Sales',
    lastUpdated: '2025-05-12',
    description: 'Total sales generated in current quarter.',
    status: 'On Track'
  },
  {
    name: 'Customer Satisfaction',
    value: 88,
    target: 90,
    owner: 'Bob',
    department: 'Support',
    lastUpdated: '2025-05-11',
    description: 'Survey-based satisfaction score.',
    status: 'At Risk'
  },
  {
    name: 'System Stability',
    value: 99,
    target: 99,
    owner: 'Carol',
    department: 'IT',
    lastUpdated: '2025-05-10',
    description: 'Percentage uptime of core systems.',
    status: 'Achieved'
  }
]

let currentIndex = null

function renderKpiCards() {
  const container = document.getElementById('kpiCards')
  container.innerHTML = ''
  kpis.forEach((kpi, index) => {
    const progress = Math.min(100, (kpi.value / kpi.target) * 100).toFixed(1)
    const card = document.createElement('div')
    card.className = 'col-md-4 mb-4'
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${kpi.name}</h5>
          <p class="card-text">Target: ${kpi.target}</p>
          <p>Current: <strong>${kpi.value}</strong></p>
          <div class="progress mb-2">
            <div class="progress-bar ${progress >= 100 ? 'bg-success' : 'bg-info'}" style="width: ${progress}%;">
              ${progress}%
            </div>
          </div>
          <button class="btn btn-outline-primary btn-sm" onclick="openModal(${index})">View</button>
        </div>
      </div>
    `
    container.appendChild(card)
  })
}

function openModal(index) {
  const kpi = kpis[index]
  currentIndex = index

  document.getElementById('modalOwner').innerText = kpi.owner
  document.getElementById('modalDepartment').innerText = kpi.department
  document.getElementById('modalLastUpdated').innerText = kpi.lastUpdated
  document.getElementById('modalDescription').innerText = kpi.description
  document.getElementById('modalTarget').innerText = kpi.target
  document.getElementById('modalCurrentValue').innerText = kpi.value
  document.getElementById('modalStatus').innerText = kpi.status

  document.getElementById('updateValue').value = ''
  document.getElementById('proofLink').value = ''

  new bootstrap.Modal(document.getElementById('kpiModal')).show()
}

function submitUpdate() {
  const value = parseFloat(document.getElementById('updateValue').value)
  const link = document.getElementById('proofLink').value.trim()

  if (isNaN(value) || !link || !assign) {
    alert('Please fill all fields before submitting.')
    return
  }

  kpis[currentIndex].value = value
  kpis[currentIndex].lastUpdated = new Date().toISOString().split('T')[0]
  kpis[currentIndex].proofLink = link

  renderKpiCards()
  renderChart()
  bootstrap.Modal.getInstance(document.getElementById('kpiModal')).hide()
}

function renderChart() {
  const chartDom = document.getElementById('chart')
  if (!chartDom) return

  const myChart = echarts.init(chartDom)
  const option = {
    title: { text: 'Sales Amount Over Years' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['2021', '2022', '2023', '2024']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Sales Amount',
        type: 'line',
        data: [60000, 70000, 80000, kpis[0].value]
      }
    ]
  }
  myChart.setOption(option)
}

function renderAll() {
  renderKpiCards()
  renderChart()
}

document.addEventListener('DOMContentLoaded', renderAll)
