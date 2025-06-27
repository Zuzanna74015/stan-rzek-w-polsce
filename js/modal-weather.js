document.addEventListener("DOMContentLoaded", () => {
  if (!window.Swal) {
    console.warn("SweetAlert2 not found – popup won’t show.");
    return;
  }

  const previous = localStorage.getItem("lokalizacjaAkceptowana");

  if (previous === "true") {
    getLocationAndFetchWeather();
  } else if (previous === "false") {
    updateWeatherBox("📍 Lokalizacja nie została udostępniona");
  } else {
    showLocationPopup();
  }

  document.getElementById("resetLocation")?.addEventListener("click", () => {
    localStorage.removeItem("lokalizacjaAkceptowana");
    updateWeatherBox("⏳ Czekam na lokalizację...");
    showLocationPopup();
  });

  function showLocationPopup() {
    Swal.fire({
      title: "📍 Pokaż lokalną pogodę?",
      text: "Czy chcesz udostępnić swoją lokalizację, aby zobaczyć lokalną prognozę?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Tak, pokaż",
      cancelButtonText: "Nie, dzięki",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#bbb",
      backdrop: true,
      allowOutsideClick: false,
      customClass: {
        popup: 'swal2-modal',
        title: 'swal2-title',
        content: 'swal2-content'
      },
      didOpen: () => {
        const okButton = document.querySelector('.swal2-confirm');
        if (okButton) okButton.focus();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("lokalizacjaAkceptowana", "true");
        getLocationAndFetchWeather();
      } else {
        localStorage.setItem("lokalizacjaAkceptowana", "false");
        updateWeatherBox("📍 Lokalizacja nie została udostępniona");
      }
    });
  }

  function getLocationAndFetchWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => updateWeatherBox("❌ Brak dostępu do lokalizacji")
      );
    } else {
      updateWeatherBox("⚠️ Twoja przeglądarka nie obsługuje lokalizacji");
    }
  }

  function fetchWeather(lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        const w = data.current_weather;
        const text = `🌡️ ${w.temperature}°C, 💨 wiatr ${w.windspeed} km/h`;
        const code = w.weathercode || 0;

        const iconMap = {
          0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
          45: "🌫️", 48: "🌫️",
          51: "🌦️", 61: "🌧️", 71: "🌨️",
          95: "⛈️", 99: "🌩️"
        };

        updateWeatherBox(text, iconMap[code] || "🌦️");
      })
      .catch(() => updateWeatherBox("Błąd pobierania pogody"));
  }

  function updateWeatherBox(msg, icon = "🌦️") {
    const box = document.getElementById("weather-data");
    const iconBox = document.getElementById("weather-icon");

    if (box) {
      box.textContent = msg;
      box.setAttribute("role", /błąd|brak/i.test(msg.toLowerCase()) ? "alert" : "status");
      box.setAttribute("aria-live", "polite");
    }
    if (iconBox) {
      iconBox.textContent = icon;
    }
  }
});
