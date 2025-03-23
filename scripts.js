const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-LkD6RYyKhcEz0huGfSSUXoTMC_gczw9KNHRfuZmAfDz8pWxFIKyw7xE5dFwPt6KDlc4x9qJzK3Kh/pub?output=csv';

// Buscar entidades da planilha
function fetchEntities() {
    fetch(SHEET_URL)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(',').map(item => item.trim()));
            const container = document.getElementById('entidadesContainer');
            container.innerHTML = '';

            rows.slice(1).forEach(row => {
                const [nome, link1, link2, drive, site] = row;

                const entityDiv = document.createElement('div');
                entityDiv.classList.add('entidade');
                entityDiv.setAttribute('data-name', nome.toUpperCase());

                entityDiv.innerHTML = `
                    <h2>${nome}</h2>
                    <div class="links">
                        <a href="${link1}" target="_blank" class="link-btn">Portal V1</a>
                        <a href="${link2}" target="_blank" class="link-btn">Portal V2</a>
                        <a href="${site}" target="_blank" class="link-btn">Site Institucional</a>
                    </div>
                `;
                container.appendChild(entityDiv);
            });
        });
}

// Filtro de pesquisa
function searchEntities() {
    const input = document.getElementById('searchInput').value.trim().toUpperCase();
    document.querySelectorAll('.entidade').forEach(entidade => {
        entidade.style.display = entidade.getAttribute('data-name').includes(input) ? "" : "none";
    });
}

window.onload = fetchEntities;
