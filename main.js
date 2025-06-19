fetch('https://danepubliczne.imgw.pl/api/data/hydro/')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.slice(0, 12).forEach(station => {
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
              🌍 Województwo: ${station.województwo}<br>
              💧 Poziom wody: ${station.stan_wody} cm<br>
              ⏱️ Pomiar: ${station.data_pomiaru}<br>
              📊 Tendencja: ${trend}<br>
              ☔ Opad: ${station.opad} mm
            </p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('cards-container').innerHTML = '<p class="text-danger">Błąd ładowania danych.</p>';
    console.error(error);
  });
