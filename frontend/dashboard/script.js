// data
const kpis = [
  { name: 'sale amount', value: 85000, target: 100000 },
  { name: 'satisfaction', value: 88, target: 90 },
  { name: 'stability', value: 99, target: 99 }
]

function showAddForm() {
  document.getElementById('addForm').style.display = 'block'
}

// Add KPI
function addKpi() {
  const name = document.getElementById('kpiName').value
  const target = parseFloat(document.getElementById('kpiTarget').value)

  if (!name || isNaN(target)) {
    alert('Please fill out all fields correctly.')
    return
  }

  kpis.push({ name, value: 0, target })
  renderAll()
  document.getElementById('addForm').style.display = 'none'
}

// View
function viewKpi(index) {
  const kpi = kpis[index]

  document.getElementById('modalKpiIndex').value = index
  document.getElementById('modalKpiName').value = kpi.name
  document.getElementById('modalKpiTarget').value = kpi.target
  document.getElementById('modalKpiValue').value = kpi.value || 0
  document.getElementById('modalKpiProof').value = kpi.proof || ''
  document.getElementById('modalKpiOwner').value = kpi.owner || ''

  const modal = new bootstrap.Modal(document.getElementById('kpiModal'))
  modal.show()
}

function submitKpiUpdate(event) {
  event.preventDefault()

  const index = parseInt(document.getElementById('modalKpiIndex').value)
  const value = parseFloat(document.getElementById('modalKpiValue').value)
  const proof = document.getElementById('modalKpiProof').value
  const owner = document.getElementById('modalKpiOwner').value

  if (isNaN(value) || !proof || !owner) {
    alert('Please fill all fields correctly.')
    return
  }

  // update KPI
  kpis[index].value = value
  kpis[index].proof = proof
  kpis[index].owner = owner

  renderAll()

  // close modal
  bootstrap.Modal.getInstance(document.getElementById('kpiModal')).hide()
}

// Delete KPI
function deleteKpi(index) {
  if (confirm('Are you sure you want to delete this KPI?')) {
    kpis.splice(index, 1)
    renderAll()
  }
}

// KPI Cards
function renderKpiCards() {
  const container = document.getElementById('kpiCards')
  container.innerHTML = ''
  kpis.forEach((kpi, index) => {
    const progress = Math.min(100, (kpi.value / kpi.target) * 100).toFixed(1)

    const card = document.createElement('div')
    card.className = 'col-md-4 mb-4'
    card.innerHTML = `
      <div class="card shadow-sm position-relative">
        <div class="position-absolute top-0 end-0 m-2 d-flex gap-1">
          <button class="btn btn-sm btn-primary" onclick="viewKpi(${index})">View</button>
          <button class="btn btn-sm btn-primary" onclick="deleteKpi(${index})">Delete</button>
        </div>
        <div class="card-body">
          <h5 class="card-title">${kpi.name}</h5>
          <p class="card-text">Target: ${kpi.target}</p>
          <p class="fw-bold">Current: ${kpi.value}</p>
          <div class="progress mb-2">
            <div class="progress-bar ${progress >= 100 ? 'bg-success' : 'bg-info'}"
                 role="progressbar"
                 style="width: ${progress}%;">${progress}%</div>
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

function renderAll() {
  renderKpiCards()
  renderChart()
}

renderAll()
