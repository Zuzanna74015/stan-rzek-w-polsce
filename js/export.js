function eksportujXLSX() {
  let msgRegion = document.getElementById("export-status");
  if (!msgRegion) {
    msgRegion = document.createElement("div");
    msgRegion.id = "export-status";
    msgRegion.setAttribute("aria-live", "polite");
    msgRegion.setAttribute("role", "status");
    msgRegion.className = "visually-hidden";
    document.body.appendChild(msgRegion);
  }

  if (!Array.isArray(window.filteredData) || filteredData.length === 0) {
    msgRegion.textContent = "Brak danych do eksportu.";
    return;
  }

  const rows = filteredData.map(st => ({
    Stacja: st.stacja,
    Rzeka: st.rzeka,
    Województwo: st.wojewodztwo,
    "Poziom wody (cm)": st.stan_wody,
    "Data pomiaru": st.stan_wody_data_pomiaru,
    "Opad (mm)": st.opad,
    Tendencja: (
      { '1': 'rośnie', '-1': 'spada', '0': 'stabilnie' }[st.tendencja] || 'brak'
    )
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
  XLSX.utils.book_append_sheet(wb, ws, "Stacje");

  XLSX.writeFile(wb, "stacje_pomiarowe.xlsx");

  msgRegion.textContent = "Dane zostały wyeksportowane do pliku Excel.";
}
