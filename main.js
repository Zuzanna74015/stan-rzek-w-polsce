console.log('JS działa 🎉');

document.addEventListener('DOMContentLoaded', () => {
    let allData = [];
    let currentPage = 1;
    const resultsPerPage = 30;

    function capitalize(text) {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'brak';
    }

    function renderData(data) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';

        data.forEach(station => {
            const trend = {
                '1': '📈 rośnie',
                '-1': '📉 spada',
                '0': '➡️ stabilnie'
            }[station.tendencja] || 'brak danych';

            const stan = parseInt(station.stan_wody);
            let bgColor = 'bg-light';

            if (!isNaN(stan)) {
                if (stan > 300) bgColor = 'bg-danger text-white';
                else if (stan > 100) bgColor = 'bg-warning';
                else bgColor = 'bg-success text-white';
            }

            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
        <div class="card shadow-sm h-100 ${bgColor}">
          <div class="card-body">
            <h5 class="card-title">${station.stacja}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${station.rzeka}</h6>
            <p class="card-text">
              🌍 Województwo: ${capitalize(station.wojewodztwo)}<br>
              💧 Poziom wody: ${station.stan_wody || 'brak'} cm<br>
              ⏱️ Pomiar: ${station.stan_wody_data_pomiaru || 'brak'}<br>
              📊 Tendencja: ${trend}<br>
              ☔ Opad: ${station.opad || 'brak'} mm
            </p>
          </div>
        </div>
      `;
            container.appendChild(card);
        });
    }

    function renderPagination(data) {
        const totalPages = Math.ceil(data.length / resultsPerPage);
        const start = (currentPage - 1) * resultsPerPage;
        const pageData = data.slice(start, start + resultsPerPage);

        renderData(pageData);

        document.getElementById('station-count').textContent =
            `Pokazano ${pageData.length} z ${data.length} stacji`;

        const pageInfo = document.getElementById('pageInfo');
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');

        pageInfo.textContent = `Strona ${currentPage} z ${totalPages}`;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderPagination(data);
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPagination(data);
            }
        };
    }


    fetch('https://danepubliczne.imgw.pl/api/data/hydro/')
        .then(res => res.json())
        .then(data => {
            allData = data;
            console.log('Pierwsza stacja:', data[0]);
            renderPagination(allData);

            const wojewodztwoSelect = document.getElementById('wojewodztwo');
            const searchInput = document.getElementById('szukaj');

            function filterAndRender() {
                const selected = wojewodztwoSelect?.value || '';
                const query = searchInput?.value.toLowerCase().trim() || '';

                const filtered = allData.filter(st => {
                    const nameMatch = st.stacja?.toLowerCase().includes(query);
                    const regionMatch = !selected || st.wojewodztwo === selected;
                    return nameMatch && regionMatch;
                });

                currentPage = 1;
                renderPagination(filtered);
            }

            if (wojewodztwoSelect) wojewodztwoSelect.addEventListener('change', filterAndRender);
            if (searchInput) searchInput.addEventListener('input', filterAndRender);
        })
        .catch(error => {
            document.getElementById('cards-container').innerHTML = '<p class="text-danger">Błąd ładowania danych.</p>';
            console.error(error);
        });
});
