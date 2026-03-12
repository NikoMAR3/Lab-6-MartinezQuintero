<div align="center">

# Blueprints React Lab - Laboratorio 6

### Escuela Colombiana de Ingenieria Julio Garavito
### Arquitecturas de Software (ARSW)

**Cliente SPA en React + Redux Toolkit + Axios + JWT**

---

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit">
<img src="https://img.shields.io/badge/Testing-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest">

</div>

---

## Descripcion

Este laboratorio implementa un cliente web moderno para Blueprints usando React y Vite.
La aplicacion permite consultar planos por autor, abrir y dibujar blueprints en canvas,
autenticarse con JWT, proteger rutas y crear nuevos planos de forma interactiva.

---

## Estructura del proyecto

```text
Lab-6-MartinezQuintero/
|- src/
|  |- components/
|  |  |- BlueprintCanvas.jsx
|  |  |- BlueprintForm.jsx
|  |  |- BlueprintList.jsx
|  |  |- DrawableCanvas.jsx
|  |  \- PrivateRoute.jsx
|  |- features/blueprints/
|  |  \- blueprintsSlice.js
|  |- pages/
|  |  |- BlueprintsPage.jsx
|  |  |- BlueprintDetailPage.jsx
|  |  |- CanvasPage.jsx
|  |  |- LoginPage.jsx
|  |  \- NotFound.jsx
|  |- services/
|  |  \- apiClient.js
|  |- store/
|  |  \- index.js
|  |- App.jsx
|  |- main.jsx
|  \- styles.css
|- tests/
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

## Funcionalidades implementadas

1. Consulta de blueprints por autor.
2. Tabla con nombre del blueprint y cantidad de puntos.
3. Apertura de blueprint seleccionado y render en canvas.
4. Visualizacion del blueprint actual en estado global (Redux).
5. Login contra backend con almacenamiento de token JWT.
6. Interceptor Axios para enviar `Authorization: Bearer <token>`.
7. Ruta protegida para creacion en canvas (`/canvas`).
8. Creacion de blueprint dibujando puntos en un lienzo interactivo.
9. Eliminacion de blueprints.
10. Agregado de puntos con actualizacion optimista y rollback en error.
11. Selector memoizado Top 5 blueprints por cantidad de puntos.
12. Pruebas unitarias y de componentes con Vitest + Testing Library.

---

## Requisitos previos

- Node.js 18 o superior.
- npm.
- Backend de Blueprints ejecutandose (Labs previos), por defecto en `http://localhost:8080`.

---

## Configuracion de entorno

Crear el archivo `.env` en la raiz a partir de `.env.example`:

```bash
cp .env.example .env
```

Contenido esperado:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Ejecucion local

```bash
npm install
npm run dev
```

Aplicacion disponible en:

```text
http://localhost:5173
```

---

## Scripts disponibles

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

## Pruebas incluidas

Se incluyen pruebas para:

- Render de canvas.
- Envio de formulario con parseo de puntos.
- Interaccion de pagina principal y dispatch de acciones.
- Reducer/slice de blueprints y transiciones de estado.

---

## Docker

### Build y ejecucion con Docker Compose

```bash
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:5173`
- Backend (segun compose): `http://localhost:8080`

---

## Rutas principales

- `/` -> Busqueda y gestion de blueprints.
- `/login` -> Autenticacion de usuario.
- `/canvas` -> Dibujo/creacion de blueprint (protegida).

---

## Definiciones y marco teorico

Para conceptos clave del laboratorio (Vite, React, Redux Toolkit, Axios, JWT, Canvas, Vitest),
consulta el archivo:

- [DEFINICIONES.md](./DEFINICIONES.md)

---

## Autores

- Maria Belen Quintero
- Nikolas Martinez Rivera

---

## Notas

- El proyecto usa estado global con Redux Toolkit (store, slice, thunks).
- El cliente HTTP esta centralizado en Axios con interceptores.
- La UI fue organizada por paginas y componentes para mantener separacion de responsabilidades.
