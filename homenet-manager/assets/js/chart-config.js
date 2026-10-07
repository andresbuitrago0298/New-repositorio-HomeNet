/**
 * chart-config.js
 * Configura el gráfico de línea "Conexiones por semana" del dashboard
 * usando Chart.js (cargado vía CDN en dashboard.html).
 */

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("weeklyConnectionsChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      datasets: [
        {
          label: "Conexiones",
          data: [14, 10, 16, 12, 20, 15, 11],
          borderColor: "#2952e3",
          backgroundColor: "rgba(41, 82, 227, 0.08)",
          tension: 0.4,
          fill: true,
          pointRadius: 3,
        },
        {
          label: "Desconexiones",
          data: [3, 5, 2, 4, 3, 6, 2],
          borderColor: "#e5484d",
          backgroundColor: "rgba(229, 72, 77, 0.05)",
          tension: 0.4,
          fill: true,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 10, font: { size: 11 } },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "#f0f2f8" },
        },
        x: {
          grid: { display: false },
        },
      },
    },
  });
});
