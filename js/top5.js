document.addEventListener("DOMContentLoaded", () => {
  fetch("https://danepubliczne.imgw.pl/api/data/hydro/")
    .then(res => res.json())
    .then(data => {
      const sorted = data
        .filter(st => !isNaN(parseInt(st.stan_wody)))
        .sort((a, b) => parseInt(b.stan_wody) - parseInt(a.stan_wody))
        .slice(0, 5);

      const labels = sorted.map(st => st.stacja);
      const values = sorted.map(st => parseInt(st.stan_wody));

      const canvas = document.getElementById("top5Chart");
      const loading = document.getElementById("chart-loading");
      const chartContainer = document.getElementById("top5-chart-container");

      if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
              label: "Stan wody (cm)",
              data: values,
              backgroundColor: "rgba(25, 118, 210, 0.6)",
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Poziom (cm)" }
              }
            }
          }
        });

        if (loading) loading.remove();
        canvas.style.display = 'block';
      }

      const details = document.getElementById("top5-details");
      if (!details) return;

      details.innerHTML = '';

      details.setAttribute("aria-live", "polite");
      details.setAttribute("role", "list");
      details.setAttribute("aria-label", "Lista TOP 5 rzek z najwyższym poziomem");

      sorted.forEach(st => {
        const trend = {
          "1": "📈 rośnie",
          "-1": "📉 spada",
          "0": "➡️ stabilnie"
        }[st.tendencja] || "brak danych";

        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.setAttribute("role", "listitem");
        item.innerHTML = `
          <div>
            <strong>${st.stacja}</strong> (${st.rzeka})<br>
            <small>${st.stan_wody_data_pomiaru || "brak daty"}</small>
          </div>
          <span>
            <strong>${st.stan_wody} cm</strong><br>
            <small>${trend}</small>
          </span>
        `;
        details.appendChild(item);
      });
    })
    .catch(() => {
      const container = document.getElementById("top5-details");
      if (container) {
        container.innerHTML = '<li class="list-group-item text-danger" role="alert">❌ Błąd ładowania danych.</li>';
      }

      const chartLoading = document.getElementById("chart-loading");
      const canvas = document.getElementById("top5Chart");
      if (chartLoading) chartLoading.textContent = "❌ Błąd ładowania wykresu.";
      if (canvas) canvas.remove();
    });
});
