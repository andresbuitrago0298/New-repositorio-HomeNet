/**
 * main.js
 * Interacciones generales de la aplicación: filtros de estado en la
 * tabla de dispositivos y selector de estado en el formulario de
 * nuevo dispositivo.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Filtros de estado (página Dispositivos) ---
  const filterPills = document.querySelectorAll("[data-filter-pill]");
  const tableRows = document.querySelectorAll("[data-row-status]");

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.dataset.filterPill;
      tableRows.forEach((row) => {
        if (filter === "todos" || row.dataset.rowStatus === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // --- Selector de estado (formulario Nuevo dispositivo) ---
  const statusOptions = document.querySelectorAll("[data-status-option]");
  statusOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      statusOptions.forEach((o) => {
        o.classList.remove(
          "selected-confirmado",
          "selected-cancelado",
          "selected-bloqueado"
        );
      });
      opt.classList.add(`selected-${opt.dataset.statusOption}`);
      const hiddenInput = document.getElementById("estadoDispositivo");
      if (hiddenInput) hiddenInput.value = opt.dataset.statusOption;
    });
  });

  // --- Validación simple de login ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "pages/dashboard.html";
    });
  }

  // --- Formulario de nuevo dispositivo: submit demo ---
  const deviceForm = document.getElementById("deviceForm");
  if (deviceForm) {
    deviceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "devices.html";
    });
  }
});
