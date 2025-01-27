# Senior React Test

Este proyecto es una aplicación de gestión de artículos que incluye características como creación, edición, visualización de detalles, categorización y calificación de artículos.

---

## **Pasos para Instalar Dependencias**

Asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados en tu máquina.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Pabl088/seniorReactTest.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd senior-react-test
   ```

3. Instala las dependencias:
   ```bash
   pnpm install
   ```

---

## **Pasos para Iniciar la Aplicación en Modo Desarrollo**

1. Asegúrate de estar en el directorio del proyecto.
2. Ejecuta el siguiente comando para iniciar la aplicación:
   ```bash
   pnpm dev
   ```
3. Abre tu navegador y navega a:
   ```
   http://localhost:5173
   ```

---

## **Decisiones Técnicas**

### **1. Uso de Redux vs React Query**
- **Redux**:
  - Se utiliza Redux para manejar el estado global de la aplicación, como el manejo de artículos, filtros, favoritos, y paginación.
  - Redux fue elegido para estados que necesitan persistencia y sincronización global, como los artículos cargados o los favoritos seleccionados.
- **React Query**:
  - React Query se emplea para manejar el estado del servidor y la obtención de datos asíncronos, como la carga inicial de artículos desde una API simulada.
  - La combinación de ambos asegura una separación clara entre el estado global y los datos externos.

### **2. Organización del Proyecto (Vertical Slices / Hexagonal)**
- **Vertical Slices**:
  - El proyecto está organizado en “vertical slices”, lo que significa que cada funcionalidad tiene sus propios archivos de componentes, hooks, reducers, etc.
  - Ejemplo: La funcionalidad de artículos se encuentra en `src/features/articles`, que incluye subcarpetas como `components`, `hooks`, y `reducers`.

- **Arquitectura Hexagonal**:
  - Se separaron las responsabilidades en capas como:
    - **Dominio**: Manejo de lógica de negocio (ejemplo: reducers en Redux).
    - **Adaptadores**: Comunicación con fuentes externas (ejemplo: API simulada en React Query).
    - **Infraestructura**: Renderizado y vistas (componentes React).

### **3. Manejo de Autenticación, Favoritos y Calificación**
- **Autenticación**:
  - La autenticación se maneja de manera simulada mediante un booleano en Redux.
  - Rutas protegidas usan este estado para determinar si un usuario tiene acceso.
- **Favoritos**:
  - Los favoritos se manejan en Redux como un array de IDs de artículos marcados como favoritos.
  - La persistencia podría mejorarse utilizando `localStorage`.
- **Calificación de Artículos**:
  - Las calificaciones se manejan directamente en el estado de Redux, actualizando el rating de cada artículo según la interacción del usuario.

---

## **Estructura del Proyecto**

```plaintext
src/
├── features/
│   └── articles/
│       ├── components/         # Componentes relacionados con artículos
│       ├── hooks/              # Hooks personalizados para manejar datos
│       ├── reducers/           # Reducers de Redux para manejar el estado
│       ├── pages/              # Páginas principales (lista, detalle, creación)
│       └── interfaces/         # Definiciones de TypeScript para artículos
├── global-store/               # Configuración de Redux Store
├── App.tsx                     # Configuración de rutas
└── main.tsx                    # Punto de entrada principal
```
