document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");

  if (!sidebar || !toggle) return;

  if (!toggle.hasAttribute("role")) {
    toggle.setAttribute("role", "button");
  }

  const updateAria = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    sidebar.setAttribute("aria-hidden", String(!isOpen));
  };

  const toggleSidebar = () => {
    const isOpen = sidebar.classList.toggle("active");
    document.body.classList.toggle("sidebar-open", isOpen);
    updateAria(isOpen);
  };

  toggle.addEventListener("click", toggleSidebar);

  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      toggleSidebar();
    }
  });

  updateAria(false);
});
