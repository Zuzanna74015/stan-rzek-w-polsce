document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([52.237049, 21.017532], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  const accessibilityMsg = document.createElement("div");
  accessibilityMsg.setAttribute("role", "alert");
  accessibilityMsg.className = "visually-hidden";
  document.body.appendChild(accessibilityMsg);

  fetch("https://danepubliczne.imgw.pl/api/data/hydro/")
    .then(res => res.json())
    .then(data => {
      data.forEach(st => {
        const lat = parseFloat(st.lat || st.latitude || st.laty);
        const lon = parseFloat(st.lon || st.longitude || st.lonx);

        if (!isNaN(lat) && !isNaN(lon)) {
          const marker = L.marker([lat, lon]).addTo(map);
          const label = `${st.stacja}, rzeka ${st.rzeka}, stan wody: ${st.stan_wody || "brak"} cm`;

          marker.bindPopup(`
            <strong>${st.stacja}</strong><br>
            Rzeka: ${st.rzeka}<br>
            Stan wody: ${st.stan_wody || "brak"} cm
          `);

          setTimeout(() => {
            const icon = marker._icon;
            if (icon) {
              icon.setAttribute("title", label);
              icon.setAttribute("aria-label", label);
              icon.setAttribute("role", "img");
            }
          }, 0);
        }
      });
    })
    .catch(err => {
      console.error("Błąd ładowania stacji:", err);

      accessibilityMsg.textContent = "Błąd ładowania danych hydrologicznych na mapie.";

      const fallback = L.control({ position: "topright" });
      fallback.onAdd = function () {
        const div = L.DomUtil.create("div", "m-2 text-danger bg-white p-2 border rounded small");
        div.innerHTML = "Błąd ładowania danych hydrologicznych.";
        return div;
      };
      fallback.addTo(map);
    });
});
