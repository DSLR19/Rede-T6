const cableData = [
    { distance: 100, connector: 'RJ45', standard: '10Base-T', type: 'Par trançado (CAT3 ou superior)', maxDistance: '100 m', speed: '10 Mbps' },
    { distance: 100, connector: 'RJ45', standard: '100Base-TX', type: 'Par trançado (CAT5 ou superior)', maxDistance: '100 m', speed: '100 Mbps' },
    { distance: 100, connector: 'RJ45', standard: '1000Base-T', type: 'Par trançado (CAT5e ou superior)', maxDistance: '100 m', speed: '1 Gbps' },
    { distance: 100, connector: 'RJ45', standard: '10GBase-T', type: 'Par trançado (CAT6a ou superior)', maxDistance: '100 m', speed: '10 Gbps' },
    { distance: 100, connector: 'MPO', standard: '100GBase-SR10', type: 'Fibra: Multimodo', maxDistance: '100 m', speed: '100 Gbps' },
    { distance: 150, connector: 'MPO', standard: '40GBase-SR4', type: 'Fibra: Multimodo', maxDistance: '150 m', speed: '40 Gbps' },
    { distance: 300, connector: 'LC', standard: '10GBase-SR', type: 'Fibra: Multimodo', maxDistance: '300 m', speed: '10 Gbps' },
    { distance: 550, connector: 'SC ou LC', standard: '1000Base-SX', type: 'Fibra: Multimodo', maxDistance: '550 m', speed: '1 Gbps' },
    { distance: 550, connector: 'SC ou LC', standard: '1000Base-LX', type: 'Fibra: Multimodo', maxDistance: '550 m', speed: '1 Gbps' },
    { distance: 2000, connector: 'SC ou LC', standard: '100Base-FX', type: 'Fibra: Multimodo', maxDistance: '2 km', speed: '100 Mbps' },
    { distance: 10000, connector: 'SC ou LC', standard: '1000Base-LX', type: 'Fibra: Monomodo', maxDistance: '10 km', speed: '1 Gbps' },
    { distance: 10000, connector: 'LC', standard: '10GBase-LR', type: 'Fibra: Monomodo', maxDistance: '10 km', speed: '10 Gbps' },
    { distance: 10000, connector: 'MPO', standard: '100GBase-LR4', type: 'Fibra: Monomodo', maxDistance: '10 km', speed: '100 Gbps' },
    { distance: 10000, connector: 'MPO', standard: '40GBase-LR4', type: 'Fibra: Monomodo', maxDistance: '10 km', speed: '40 Gbps' },
    { distance: 10000, connector: 'MPO', standard: '400GBASE-R', type: 'Fibra: Monomodo', maxDistance: '10 km', speed: '400 Gbps' },
    { distance: 40000, connector: 'LC', standard: '10GBase-ER', type: 'Fibra: Monomodo', maxDistance: '40 km', speed: '10 Gbps' }
];

const distanceSelect = document.getElementById('distance');
const connectorSelect = document.getElementById('connector');
const clearButton = document.getElementById('clearButton');
const resultsTable = document.getElementById('resultsTable');
const emptyStateMessage = document.getElementById('emptyStateMessage');
const resultsForm = document.getElementById('selectorForm');

// Evento: Mudança de Distância
distanceSelect.addEventListener('change', function() {
    const distance = parseInt(this.value);
    connectorSelect.innerHTML = '<option value="">--Selecione o Conector--</option>';

    if (!isNaN(distance)) {
        const connectors = [...new Set(cableData.filter(cable => cable.distance === distance).map(cable => cable.connector))];
        connectors.forEach(connector => {
            const option = document.createElement('option');
            option.value = connector;
            option.textContent = connector;
            connectorSelect.appendChild(option);
        });

        connectorSelect.disabled = false;
    } else {
        connectorSelect.disabled = true;
    }

    updateTable([]);
});

// Evento: Mudança de Conector
connectorSelect.addEventListener('change', function() {
    const distance = parseInt(distanceSelect.value);
    const connector = this.value;

    if (!isNaN(distance) && connector) {
        const filteredCables = cableData.filter(cable => cable.distance === distance && cable.connector === connector);
        updateTable(filteredCables);
    } else {
        updateTable([]);
    }
});

// Evento: Botão Limpar
clearButton.addEventListener('click', function() {
    resultsForm.reset();
    connectorSelect.disabled = true;
    updateTable([]);
    distanceSelect.focus();
});

// Função: Atualizar Tabela
function updateTable(cables) {
    const tbody = resultsTable.querySelector('tbody');
    tbody.innerHTML = '';

    if (cables.length === 0) {
        // Mostrar mensagem de estado vazio
        emptyStateMessage.style.display = 'block';
        resultsTable.style.display = 'none';
    } else {
        // Ocultar mensagem de estado vazio e mostrar tabela
        emptyStateMessage.style.display = 'none';
        resultsTable.style.display = 'table';

        // Preencher tabela com dados
        cables.forEach(cable => {
            const row = document.createElement('tr');
            Object.values(cable).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    }
}

// Inicializar estado
updateTable([]);