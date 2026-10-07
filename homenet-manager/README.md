# HomeNet Manager

Aplicación web de gestión de dispositivos de red doméstica, construida con
**Bootstrap 5**, HTML semántico y JavaScript vanilla. Basada en el diseño
visual de referencia (login, panel de control, listado de dispositivos y
formulario de registro).

## Estructura del proyecto

```
homenet-manager/
├── index.html               # Login
├── pages/
│   ├── dashboard.html        # Panel de control
│   ├── devices.html          # Listado de dispositivos
│   └── device-new.html       # Registrar nuevo dispositivo
├── components/               # HTML de referencia/documentación
│   ├── sidebar.html
│   └── topbar.html
└── assets/
    ├── css/styles.css
    ├── js/
    │   ├── components.js     # Inyecta sidebar y topbar en cada página
    │   ├── main.js            # Filtros, selección de estado, navegación
    │   └── chart-config.js    # Gráfico de conexiones semanales (Chart.js)
    └── img/logo.svg
```

## Cómo funciona la navegación

- `index.html` → al enviar el formulario, redirige a `pages/dashboard.html`.
- El **sidebar** (Inicio, Dispositivos, Notificaciones, Alertas, Atención al
  usuario) y el **topbar** (buscador, notificaciones, usuario, botón
  "Agregar Dispositivo") no se repiten como HTML estático: se generan con
  `assets/js/components.js`, así que para editar el menú basta con tocar
  un solo archivo.
- `pages/devices.html` → botón "Nuevo dispositivo" lleva a
  `pages/device-new.html`; los filtros por estado (Todos / Confirmado /
  Cancelado / Bloqueado) funcionan del lado del cliente sobre la tabla.
- `pages/device-new.html` → al guardar, regresa a `pages/devices.html`.

## Cómo verlo localmente

Como `components.js` no usa `fetch` (para evitar problemas de CORS al abrir
los archivos directamente con doble clic), el proyecto funciona abriendo
`index.html` en el navegador sin necesidad de un servidor. Aun así, se
recomienda usar un servidor local para una experiencia más fiel a producción:

```bash
# Con Python
python3 -m http.server 8080

# Luego abrir
http://localhost:8080/index.html
```

## Dependencias (vía CDN)

- Bootstrap 5.3.3 (CSS + JS bundle)
- Bootstrap Icons 1.11.3
- Chart.js 4.4.4 (solo en el dashboard, para el gráfico de conexiones)

## Paleta de colores

| Uso                     | Color       |
|--------------------------|-------------|
| Sidebar / fondo login    | `#0b1533`   |
| Acento / botón primario  | `#2952e3`   |
| Estado Confirmado        | `#1fa971`   |
| Estado Cancelado         | `#d98c1f`   |
| Estado Bloqueado         | `#e5484d`   |
| Fondo general de la app  | `#f4f6fb`   |
