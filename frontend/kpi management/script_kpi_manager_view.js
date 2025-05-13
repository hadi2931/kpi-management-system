document.addEventListener('DOMContentLoaded', async function() {
    // Temporary sample data for demo
    const sampleKPIs = [
        {
            id: 1,
            name: "Customer Satisfaction Score",
            owner: "Support Team",
            department: "Customer Service",
            target: "90%",
            currentValue: "85%",
            status: "Active",
            lastUpdated: "2024-03-15",
            description: "Measures overall customer satisfaction with our services",
            calculationMethod: "Average of customer ratings (1-5 scale)",
            frequency: "Monthly",
            dataSource: "Customer Feedback System",
            thresholds: {
                good: ">= 90%",
                warning: "70-89%",
                bad: "< 70%"
            }
        },
        {
            id: 2,
            name: "Employee Productivity",
            owner: "HR Department",
            department: "Human Resources",
            target: "95%",
            currentValue: "92%",
            status: "Achieved",
            lastUpdated: "2024-03-14",
            description: "Measures employee productivity based on task completion",
            calculationMethod: "Tasks completed / Total tasks assigned",
            frequency: "Weekly",
            dataSource: "Project Management System",
            thresholds: {
                good: ">= 95%",
                warning: "85-94%",
                bad: "< 85%"
            }
        }
    ];

    const kpiTableBody = document.getElementById('kpiTableBody');
    const kpiDetailsBody = document.getElementById('kpiDetailsBody');
    const noKpiMessage = document.getElementById('kpiTableMessageArea');
    let currentEditingKpiId = null;

    // Bootstrap modals
    const viewKpiModal = new bootstrap.Modal(document.getElementById('viewKpiModal'));
    const addKpiModal = new bootstrap.Modal(document.getElementById('addKpiModal'));
    const kpiForm = document.getElementById('kpiForm');
    const addKpiModalEl = document.getElementById('addKpiModal');
    const saveKpiBtn = document.getElementById('saveKpiBtn');

    // For demo: use local storage to persist data
    function getKPIs() {
        const stored = localStorage.getItem('kpis');
        if (!stored) {
            localStorage.setItem('kpis', JSON.stringify(sampleKPIs));
            return sampleKPIs;
        }
        return JSON.parse(stored);
    }

    function saveKPIs(kpis) {
        localStorage.setItem('kpis', JSON.stringify(kpis));
    }

    async function loadKPIs() {
        try {
            const kpis = getKPIs();
            renderKpiTable(kpis);
        } catch (error) {
            console.error('Error loading KPIs:', error);
            showError('Failed to load KPIs. Please try again later.');
        }
    }

    function renderKpiTable(kpis) {
        kpiTableBody.innerHTML = ''; // Clear existing rows
        if (!kpis || kpis.length === 0) {
            noKpiMessage.style.display = 'block';
            noKpiMessage.textContent = "No KPIs defined yet. Click 'Add New KPI' to get started.";
            return;
        }
        noKpiMessage.style.display = 'none';

        kpis.forEach(kpi => {
            const row = `
                <tr>
                    <td>${escapeHtml(kpi.name)}</td>
                    <td>${escapeHtml(kpi.owner)}</td>
                    <td>${escapeHtml(kpi.target)}</td>
                    <td><span class="badge bg-${getStatusColor(kpi.status)}">${escapeHtml(kpi.currentValue)}</span></td>
                    <td><span class="badge bg-${getStatusColor(kpi.status)}">${escapeHtml(kpi.status)}</span></td>
                    <td>${formatDate(kpi.lastUpdated)}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-info view-details-btn" data-kpi-id="${kpi.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-sm btn-outline-secondary edit-kpi-btn" data-kpi-id="${kpi.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </td>
                </tr>
            `;
            kpiTableBody.insertAdjacentHTML('beforeend', row);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => viewKpiDetails(btn.dataset.kpiId));
        });

        document.querySelectorAll('.edit-kpi-btn').forEach(btn => {
            btn.addEventListener('click', () => editKpi(btn.dataset.kpiId));
        });
    }

    async function viewKpiDetails(kpiId) {
        try {
            const kpis = getKPIs();
            const kpi = kpis.find(k => k.id === parseInt(kpiId));
            if (!kpi) throw new Error('KPI not found');
            
            currentEditingKpiId = kpi.id;

            const detailsHtml = `
                <h6>General Information</h6>
                <div class="row">
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">KPI Name:</span> <span class="detail-value">${escapeHtml(kpi.name)}</span></div></div>
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">Owner:</span> <span class="detail-value">${escapeHtml(kpi.owner)}</span></div></div>
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">Department:</span> <span class="detail-value">${escapeHtml(kpi.department)}</span></div></div>
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">Status:</span> <span class="badge bg-${getStatusColor(kpi.status)}">${escapeHtml(kpi.status)}</span></div></div>
                </div>

                <h6 class="mt-4">Description</h6>
                <p>${escapeHtml(kpi.description)}</p>

                <h6 class="mt-4">Target & Performance</h6>
                <div class="row">
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Target:</span> <span class="detail-value">${escapeHtml(kpi.target)}</span></div></div>
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Current Value:</span> <span class="detail-value">${escapeHtml(kpi.currentValue)}</span></div></div>
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Last Updated:</span> <span class="detail-value">${formatDate(kpi.lastUpdated)}</span></div></div>
                </div>

                <h6 class="mt-4">Definition & Source</h6>
                <div class="row">
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">Calculation Method:</span> <span class="detail-value">${escapeHtml(kpi.calculationMethod)}</span></div></div>
                    <div class="col-md-6"><div class="data-point"><span class="detail-label">Update Frequency:</span> <span class="detail-value">${escapeHtml(kpi.frequency)}</span></div></div>
                    <div class="col-md-12"><div class="data-point"><span class="detail-label">Data Source(s):</span> <span class="detail-value">${escapeHtml(kpi.dataSource)}</span></div></div>
                </div>

                <h6 class="mt-4">Thresholds</h6>
                <div class="row">
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Good:</span> <span class="detail-value">${escapeHtml(kpi.thresholds.good)}</span></div></div>
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Warning:</span> <span class="detail-value">${escapeHtml(kpi.thresholds.warning)}</span></div></div>
                    <div class="col-md-4"><div class="data-point"><span class="detail-label">Bad/Critical:</span> <span class="detail-value">${escapeHtml(kpi.thresholds.bad)}</span></div></div>
                </div>
            `;
            kpiDetailsBody.innerHTML = detailsHtml;
            viewKpiModal.show();
        } catch (error) {
            console.error('Error loading KPI details:', error);
            showError('Failed to load KPI details. Please try again later.');
        }
    }

    async function editKpi(kpiId) {
        try {
            const kpis = getKPIs();
            const kpi = kpis.find(k => k.id === parseInt(kpiId));
            if (!kpi) throw new Error('KPI not found');

            currentEditingKpiId = kpi.id;
            
            // Populate form fields
            document.getElementById('kpiName').value = kpi.name;
            document.getElementById('kpiOwner').value = kpi.owner;
            document.getElementById('kpiDepartment').value = kpi.department;
            document.getElementById('kpiStatus').value = kpi.status;
            document.getElementById('kpiTarget').value = kpi.target;
            document.getElementById('kpiCurrentValue').value = kpi.currentValue;
            document.getElementById('kpiDescription').value = kpi.description;
            document.getElementById('kpiCalculationMethod').value = kpi.calculationMethod;
            document.getElementById('kpiFrequency').value = kpi.frequency;
            document.getElementById('kpiDataSource').value = kpi.dataSource;
            document.getElementById('kpiThresholdGood').value = kpi.thresholds.good;
            document.getElementById('kpiThresholdWarning').value = kpi.thresholds.warning;
            document.getElementById('kpiThresholdBad').value = kpi.thresholds.bad;

            // Update modal title
            document.getElementById('addKpiModalLabel').textContent = 'Edit KPI';
            addKpiModal.show();
        } catch (error) {
            console.error('Error loading KPI for editing:', error);
            showError('Failed to load KPI for editing. Please try again later.');
        }
    }

    // Event listener for the edit button in the view modal
    document.getElementById('editKpiFromModalBtn').addEventListener('click', () => {
        viewKpiModal.hide();
        editKpi(currentEditingKpiId);
    });

    // Reset form when modal is hidden
    addKpiModalEl.addEventListener('hidden.bs.modal', function () {
        kpiForm.reset();
        currentEditingKpiId = null;
        document.getElementById('addKpiModalLabel').textContent = 'Add New KPI';
    });

    // Save KPI
    saveKpiBtn.addEventListener('click', async function() {
        if (!kpiForm.checkValidity()) {
            kpiForm.reportValidity();
            return;
        }

        const kpiData = {
            name: document.getElementById('kpiName').value,
            owner: document.getElementById('kpiOwner').value,
            department: document.getElementById('kpiDepartment').value,
            status: document.getElementById('kpiStatus').value,
            target: document.getElementById('kpiTarget').value,
            currentValue: document.getElementById('kpiCurrentValue').value,
            description: document.getElementById('kpiDescription').value,
            calculationMethod: document.getElementById('kpiCalculationMethod').value,
            frequency: document.getElementById('kpiFrequency').value,
            dataSource: document.getElementById('kpiDataSource').value,
            thresholds: {
                good: document.getElementById('kpiThresholdGood').value,
                warning: document.getElementById('kpiThresholdWarning').value,
                bad: document.getElementById('kpiThresholdBad').value
            },
            lastUpdated: new Date().toISOString()
        };

        try {
            const kpis = getKPIs();
            if (currentEditingKpiId) {
                // Update existing KPI
                const index = kpis.findIndex(k => k.id === currentEditingKpiId);
                if (index !== -1) {
                    kpis[index] = { ...kpis[index], ...kpiData };
                    saveKPIs(kpis);
                }
            } else {
                // Create new KPI
                const newKpi = {
                    id: Date.now(), // Use timestamp as temporary ID
                    ...kpiData
                };
                kpis.push(newKpi);
                saveKPIs(kpis);
            }
            addKpiModal.hide();
            await loadKPIs();
            showSuccess(currentEditingKpiId ? 'KPI updated successfully!' : 'KPI created successfully!');
        } catch (error) {
            console.error('Error saving KPI:', error);
            showError('Failed to save KPI. Please try again later.');
        }
    });

    // Search and Filter functionality
    const searchInput = document.getElementById('kpiSearchInput');
    const statusFilter = document.getElementById('kpiFilterStatus');

    async function filterKPIs() {
        try {
            const kpis = getKPIs();
            const searchTerm = searchInput.value.toLowerCase();
            const filterStatus = statusFilter.value;

            const filteredKpis = kpis.filter(kpi => {
                const matchesSearch = kpi.name.toLowerCase().includes(searchTerm) ||
                                    kpi.owner.toLowerCase().includes(searchTerm) ||
                                    kpi.department.toLowerCase().includes(searchTerm);
                const matchesStatus = filterStatus ? kpi.status === filterStatus : true;
                return matchesSearch && matchesStatus;
            });
            renderKpiTable(filteredKpis);
        } catch (error) {
            console.error('Error filtering KPIs:', error);
            showError('Failed to filter KPIs. Please try again later.');
        }
    }

    searchInput.addEventListener('input', filterKPIs);
    statusFilter.addEventListener('change', filterKPIs);

    // Utility functions
    function getStatusColor(status) {
        const colorMap = {
            'Active': 'primary',
            'Inactive': 'secondary',
            'Achieved': 'success',
            'Off-Track': 'warning',
            'At-Risk': 'danger'
        };
        return colorMap[status] || 'secondary';
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showSuccess(message) {
        // Implement your success notification here
        alert(message); // Replace with a better notification system
    }

    function showError(message) {
        // Implement your error notification here
        alert(message); // Replace with a better notification system
    }

    // Initial load
    loadKPIs();
});