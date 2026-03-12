# 📘 Blueprints React Lab - Laboratorio 6

### Escuela Colombiana de Ingenieria Julio Garavito
### Arquitecturas de Software (ARSW)

**Cliente SPA en React + Redux Toolkit + Axios + JWT**


---

## 📋 Descripción

Este laboratorio implementa un cliente web moderno para Blueprints usando React y Vite.
La aplicación permite consultar planos por autor, abrir y dibujar blueprints en canvas,
autenticarse con JWT, proteger rutas y crear nuevos planos de forma interactiva.

---

## 📁 Estructura del proyecto

```text
Lab-6-MartinezQuintero/
|- 📁 docs/
|  \- Laboratorio 6 ARSW.pdf
|- 📁 src/
|  |- 📁 components/
|  |  |- BlueprintCanvas.jsx
|  |  |- BlueprintForm.jsx
|  |  |- BlueprintList.jsx
|  |  |- DrawableCanvas.jsx
|  |  \- PrivateRoute.jsx
|  |- 📁 features/blueprints/
|  |  \- blueprintsSlice.js
|  |- 📁 pages/
|  |  |- BlueprintsPage.jsx
|  |  |- BlueprintDetailPage.jsx
|  |  |- CanvasPage.jsx
|  |  |- LoginPage.jsx
|  |  \- NotFound.jsx
|  |- 📁 services/
|  |  \- apiClient.js
|  |- 📁 store/
|  |  \- index.js
|  |- App.jsx
|  |- main.jsx
|  \- styles.css
|- 📁 tests/
|  |- BlueprintCanvas.test.jsx
|  |- BlueprintForm.test.jsx
|  |- BlueprintsPage.test.jsx
|  |- blueprintsSlice.test.jsx
|  \- setup.js
|- Dockerfile
|- docker-compose.yml
|- package.json
\- README.md
```

---

## 🚨 Informe del laboratorio

El documento del laboratorio en formato PDF se encuentra en la carpeta **`docs/`**.

---

## 🚀 Funcionalidades implementadas

1. Consulta de blueprints por autor.
2. Tabla con nombre del blueprint y cantidad de puntos.
3. Apertura de blueprint seleccionado y render en canvas.
4. Visualización del blueprint actual en estado global (Redux).
5. Login contra backend con almacenamiento de token JWT.
6. Interceptor Axios para enviar `Authorization: Bearer <token>`.
7. Ruta protegida para creacion en canvas (`/canvas`).
8. Creación de blueprint dibujando puntos en un lienzo interactivo.
9. Eliminación de blueprints.
10. Agregado de puntos con actualización optimista y rollback en error.
11. Selector memoizado Top 5 blueprints por cantidad de puntos.
12. Pruebas unitarias y de componentes con Vitest + Testing Library.

---

## 🤺 Requisitos previos

- Node.js 18 o superior.
- npm.
- Backend de Blueprints ejecutandose (Labs previos), por defecto en `http://localhost:8080`.

---

## ⚙️ Configuración de entorno

Crear el archivo `.env` en la raíz a partir de `.env.example`:

```bash
cp .env.example .env
```

Contenido esperado:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 💻 Ejecución local

```bash
npm install
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

## 📝 Scripts disponibles

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de produccion
npm run preview   # vista previa de build
npm run lint      # analisis estatico con ESLint
npm run format    # formato con Prettier
npm test          # pruebas con Vitest
npm run test:ui   # Vitest en modo interactivo
```

---

## 🧪 Pruebas incluidas

Se incluyen pruebas para:

- Render de canvas.
- Envio de formulario con parseo de puntos.
- Interacción de pagina principal y dispatch de acciones.
- Reducer/slice de blueprints y transiciones de estado.

---

## 🐳 Docker

### Build y ejecución con Docker Compose

```bash
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:5173`
- Backend (segun compose): `http://localhost:8080`

---

## 🚌 Rutas principales

- `/` -> Búsqueda y gestion de blueprints.
- `/login` -> Autenticación de usuario.
- `/canvas` -> Dibujo/creación de blueprint (protegida).

---

## 🤓 Definiciones y marco teorico

Para conceptos clave del laboratorio (Vite, React, Redux Toolkit, Axios, JWT, Canvas, Vitest),
consulta el archivo:

- [DEFINICIONES.md](./DEFINICIONES.md)

---

## 👥 Autores

| Nombre | GitHub |
|--------|--------|
| **María Belén Quintero** | [@mbquial](https://github.com/mbquial) |
| **Nikolas Martínez Rivera** | [@NikoMAR3](https://github.com/NikoMAR3) |

