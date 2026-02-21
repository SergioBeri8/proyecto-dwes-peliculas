# 🎬 Proyecto Películas DWES - Sergio Berigüete

Este proyecto es una aplicación web SPA desarrollada con **Angular 21** para la gestión de un catálogo de películas. Utiliza la API de **TMDB** para los datos y **Supabase** como Backend-as-a-Service para la autenticación y persistencia de datos.

## 🚀 URL del Proyecto (RA9)
**Enlace:** `proyecto-dwes-peliculas-eoca.vercel.app`

## 🛠️ Tecnologías y Requisitos Cumplidos

### 1. Seguridad y Acceso a Datos (RA6)
- **Autenticación**: Registro e Inicio de sesión integrados con Supabase Auth.
- **Protección de Rutas**: Uso de `AuthGuard` para restringir el acceso al Dashboard a usuarios no identificados.
- **Seguridad en BD (RLS)**: Se han configurado políticas de seguridad a nivel de fila en la tabla `favorites` para que cada usuario solo pueda ver, insertar y borrar sus propios registros.

### 2. Desarrollo con Framework (RA8)
- **Standalone Components**: Arquitectura moderna sin módulos innecesarios.
- **Estado Reactivo (Signals)**: Gestión de la interfaz mediante `signals` para una reactividad óptima y eficiente.
- **Lazy Loading**: Carga perezosa de las rutas de `auth` y `dashboard` para mejorar el rendimiento.
- **Consumo de API**: Integración de servicios HTTP para obtener películas populares de The Movie Database.

### 3. Operaciones CRUD
- **Create**: Añadir películas a la lista de favoritos en Supabase.
- **Read**: Visualización dinámica de los favoritos guardados del usuario.
- **Delete**: Eliminación de registros de favoritos desde la interfaz.

## 📁 Estructura del Proyecto
- `src/app/core`: Servicios globales (Auth, Películas, Favoritos), Guards y constantes de entorno.
- `src/app/features`: Componentes de página organizados por funcionalidades (Auth y Dashboard).
- `public`: Archivos estáticos como el Favicon y el logo de la aplicación.

## 💻 Instalación y Uso
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `ng serve` para el servidor de desarrollo.
4. Abrir `http://localhost:4200` en el navegador.
