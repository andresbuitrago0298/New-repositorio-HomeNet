/**
 * components.js
 * Genera el sidebar y el topbar de forma dinámica para evitar
 * duplicar el mismo HTML en cada página. Cada página solo necesita:
 *   <div id="hn-sidebar"></div>
 *   <div id="hn-topbar" data-title="..." data-add-button="true|false"></div>
 * y llamar a HN.mountLayout(activePage) en su script.
 */

const HN = (function () {
  const NAV_ITEMS = [
    { key: "inicio", label: "Inicio", icon: "bi-house", href: "dashboard.html" },
    { key: "dispositivos", label: "Dispositivos", icon: "bi-laptop", href: "devices.html" },
    { key: "notificaciones", label: "Notificaciones", icon: "bi-bell", href: "#", badge: 1 },
    { key: "alertas", label: "Alertas", icon: "bi-exclamation-triangle", href: "#" },
    { key: "soporte", label: "Atención al usuario", icon: "bi-headset", href: "#" },
  ];

  function sidebarHTML(activeKey, basePath) {
    const items = NAV_ITEMS.map((item) => {
      const isActive = item.key === activeKey;
      const badge =
        item.badge != null
          ? `<span class="badge rounded-pill bg-danger ms-auto">${item.badge}</span>`
          : "";
      const href = item.href === "#" ? "#" : basePath + item.href;
      return `
        <li class="nav-item">
          <a class="nav-link ${isActive ? "active" : ""}" href="${href}">
            <i class="bi ${item.icon}"></i>
            <span>${item.label}</span>
            ${badge}
          </a>
        </li>`;
    }).join("");

    return `
      <div class="brand">
        <i class="bi bi-wifi fs-4 text-white"></i>
        <div>
          HomeNet
          <small>MANAGER</small>
        </div>
      </div>
      <div class="nav-section-label">PRINCIPAL</div>
      <ul class="nav flex-column flex-grow-1">
        ${items}
      </ul>
      <div class="sidebar-user">
        <div class="avatar-circle">AG</div>
        <div>
          <div class="fw-semibold text-white">Andrés García</div>
          <div class="text-muted" style="font-size:0.72rem;">Administrador</div>
        </div>
      </div>`;
  }

  function topbarHTML({ title, showAddButton, basePath }) {
    const addBtn = showAddButton
      ? `<a href="${basePath}device-new.html" class="btn btn-hn-primary btn-sm">
           <i class="bi bi-plus-lg me-1"></i>Agregar Dispositivo
         </a>`
      : "";

    return `
      <button class="btn btn-sm btn-outline-secondary d-lg-none me-2" id="hn-sidebar-toggle">
        <i class="bi bi-list"></i>
      </button>
      <h5>${title}</h5>
      <div class="d-flex align-items-center gap-3 ms-auto">
        <div class="search-box d-none d-md-block">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control border-start-0" placeholder="Buscar dispositivos...">
          </div>
        </div>
        <button class="btn btn-light btn-sm position-relative">
          <i class="bi bi-bell"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:0.55rem;">1</span>
        </button>
        <div class="dropdown">
          <button class="btn btn-light btn-sm d-flex align-items-center gap-2 dropdown-toggle" data-bs-toggle="dropdown">
            <span class="avatar-circle bg-primary text-white" style="width:28px;height:28px;font-size:0.65rem;">AG</span>
            <span class="d-none d-sm-inline">Andrés García</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Mi perfil</a></li>
            <li><a class="dropdown-item" href="#">Configuración</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="../index.html">Cerrar sesión</a></li>
          </ul>
        </div>
        ${addBtn}
      </div>`;
  }

  /**
   * Monta el sidebar y el topbar en la página actual.
   * @param {string} activeKey - clave del item activo del menú ('inicio' | 'dispositivos' ...)
   * @param {string} basePath - ruta relativa hacia la carpeta pages/ (ej: './' o '')
   */
  function mountLayout(activeKey, basePath = "") {
    const sidebarEl = document.getElementById("hn-sidebar");
    const topbarEl = document.getElementById("hn-topbar");

    if (sidebarEl) {
      sidebarEl.innerHTML = sidebarHTML(activeKey, basePath);
    }
    if (topbarEl) {
      const title = topbarEl.dataset.title || "";
      const showAddButton = topbarEl.dataset.addButton === "true";
      topbarEl.innerHTML = topbarHTML({ title, showAddButton, basePath });
    }

    const toggleBtn = document.getElementById("hn-sidebar-toggle");
    if (toggleBtn && sidebarEl) {
      toggleBtn.addEventListener("click", () => sidebarEl.classList.toggle("show"));
    }
  }

  return { mountLayout };
})();
