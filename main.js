console.log('JS działa 🎉');

document.addEventListener('DOMContentLoaded', () => {
  let allData = [];

  function renderData(filteredData) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    filteredData.slice(0, 30).forEach(station => {
      const trend = {
        '1': '📈 rośnie',
        '-1': '📉 spada',
        '0': '➡️ stabilnie'
      }[station.tendencja] || 'brak danych';

      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${station.stacja}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${station.rzeka}</h6>
            <p class="card-text">
              🌍 Województwo: ${station.wojewodztwo || 'brak'}<br>
              💧 Poziom wody: ${station.stan_wody || 'brak'} cm<br>
              📊 Tendencja: ${trend}<br>
              ☔ Opad: ${station.opad || 'brak'} mm
            </p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  fetch('https://danepubliczne.imgw.pl/api/data/hydro/')
    .then(res => res.json())
    .then(data => {
      allData = data;
      console.log('Pierwsza stacja:', data[0]);
      renderData(allData);

      document.getElementById('wojewodztwo').addEventListener('change', function () {
        const selected = this.value;
        if (selected === '') {
          renderData(allData);
        } else {
          const filtered = allData.filter(st => st.wojewodztwo === selected);
          renderData(filtered);
        }
      });
    })
    .catch(error => {
      document.getElementById('cards-container').innerHTML = '<p class="text-danger">Błąd ładowania danych.</p>';
      console.error(error);
    });
});
