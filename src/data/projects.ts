/**
 * Proyectos de la sección "Proyectos".
 *
 * Imágenes:
 * - Cada proyecto tiene su propia carpeta de imágenes en
 *   `src/assets/img/projects/<id>/`.
 * - Las imágenes se descubren automáticamente (ver `@/data/projectImages`),
 *   emparejando por carpeta y nombre de archivo con la lista `images`.
 * - El orden y los textos alternativos vienen de este archivo (`images`).
 *
 * Enlaces:
 * - `demoUrl` / `repoUrl` con valor `null` significa "sin enlace real todavía".
 *   En ese caso la tarjeta no muestra un enlace clicable, sino una nota
 *   identificando que el enlace está sin configurar.
 * - Nunca se inventan URLs: rellena estos campos con destinos reales.
 */

export interface ProjectImageSpec {
  /** Nombre del archivo dentro de src/assets/img/projects/<id>/ */
  file: string
  /** Texto alternativo: describe lo que se ve, sin prefijos ni el nombre del proyecto. */
  alt: string
}

export interface Project {
  /** Identificador estable; debe coincidir con la carpeta de imágenes. */
  id: string
  /** Nombre del proyecto. */
  title: string
  /** Descripción breve (1-2 líneas). */
  summary: string
  /** Tecnologías mostradas como etiquetas. */
  tags: string[]
  /** Imágenes del proyecto, en el orden en que se muestran en el carrusel. */
  images: ProjectImageSpec[]
  /** URL de la demo o `null` si todavía no existe. */
  demoUrl: string | null
  /** Texto del enlace de demo. Solo se muestra si el proyecto tiene demoUrl. Lo define el propietario del portafolio. */
  demoLabel: string | null
  /** URL del repositorio o `null` si todavía no existe. */
  repoUrl: string | null
}

export const projects: Project[] = [
  {
    id: 'sgrh',
    title: 'SGRH Sistema Gestor de Requisiciones Interno',
    summary:
      'Sistema web desarrollado durante mis Estadías Profesionales en Grupo Real Hoteles para digitalizar y optimizar la gestión de requisiciones internas. Surge ante la necesidad de reducir errores, retrasos y duplicidad de información provocados por los procesos manuales, centralizando la solicitud, autorización y seguimiento de productos mediante una aplicación desarrollada con ASP.NET MVC, C#, Entity Framework y SQL Server.',
    tags: [
      "C#",
      "ASP.NET MVC 5",
      ".NET Framework 4.8",
      "Entity Framework 6",
      "SQL Server",
      "Database First",
      "DTOs",
      "LINQ",
      "JavaScript",
      "Bootstrap 5",
      "Sass/SCSS",
      "Razor"
    ],
    images: [
      {
        file: '1.jpeg',
        alt: 'Pantalla de inicio de sesión con campos de correo y contraseña, sobre una fotografía de un complejo hotelero',
      },
      {
        file: '2.jpeg',
        alt: 'Pantalla de centros de costos, con una tarjeta por centro y botones para configurar, eliminar y añadir uno nuevo',
      },
      {
        file: '3.jpeg',
        alt: 'Listado de requisiciones del usuario, con buscador por folio y estado «Pendiente por autorizar»',
      },
      {
        file: '4.jpeg',
        alt: 'Panel principal con accesos a nueva requisición, catálogo y perfil',
      },
      {
        file: '5.jpeg',
        alt: 'Pantalla de perfil con los datos del empleado y las opciones de cambiar contraseña o cerrar sesión',
      },
    ],
    demoUrl: null,
    demoLabel: null,
    repoUrl: "https://github.com/MiguelDotDev/appweb-sistema-hotel-sgri-aspnetframework",
  },
  {
    id: 'web-usuarios-firebase',
    title: 'Web de Registro de Usuarios con Firebase',
    summary:
      'Aplicación web para el registro de usuarios mediante un formulario con validación progresiva, captura de datos personales y de domicilio, catálogos de estados y municipios de México, y una tabla dinámica para gestionar los registros durante la sesión. Desarrollada con HTML, CSS y JavaScript, integra Bootstrap para la interfaz y Firebase Realtime Database para la persistencia de datos.',
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Firebase",
      "Realtime Database",
      "JSON",
      "Web Development"
    ],
    images: [
      {
        file: '1.jpg',
        alt: 'Formulario de datos personales del registro de usuarios, con los campos todavía vacíos',
      },
      {
        file: '2.jpg',
        alt: 'Formulario de dirección y tabla de registros, sin filas todavía, con columnas de nombre, domicilio y teléfonos',
      },
    ],
    demoUrl: "https://migueldotdev.github.io/web-usuarios-firebase/",
    demoLabel: "Ver demo",
    repoUrl: "https://github.com/MiguelDotDev/web-usuarios-firebase",
  },
  {
    id: 'api-marketplace-aspnetcore',
    title: 'API ASP Net Core Para Sistema de Marketplace',
    summary:
      'Desarrollo de una API backend para un marketplace universitario, diseñada para conectar un sitio web y una aplicación móvil mediante endpoints para la gestión de usuarios, productos y comunicación entre compradores y vendedores. Implementa autenticación mediante JWT, separación de responsabilidades con DTO e inyección de dependencias, y persistencia de datos con Entity Framework Core y SQL Server. Utiliza Docker y Docker Compose para facilitar el despliegue del backend y la base de datos en contenedores.',
    tags: [
      "C#",
      "ASP.NET Core",
      "REST API",
      "SQL Server",
      "Entity Framework Core",
      "Docker",
      "Docker Compose",
      "JWT",
      "MVC",
      "Inyección de dependencias"
    ],
    images: [
      {
        file: '1.jpg',
        alt: 'Documentación Swagger de la API con endpoints de autenticación, categorías y chats',
      },
      {
        file: '2.jpg',
        alt: 'Documentación Swagger de los endpoints de productos, con la lista de esquemas de datos colapsada',
      },
      {
        file: '3.jpg',
        alt: 'Esquemas DTO de la API, como LoginDTO y RegisterDTO, con los campos obligatorios marcados',
      },
    ],
    demoUrl: null,
    demoLabel: null,
    repoUrl: "https://github.com/MiguelDotDev/api-marketplace-aspnetcore",
  },
  {
    id: 'api-emotionalio-aspnetframework',
    title: 'API Backend ASP Net Framework de Emotional.io',
    summary:
      'API REST desarrollada con C# y ASP.NET Web API para Emotional.io, una aplicación móvil enfocada en el registro y seguimiento de emociones. Permite gestionar usuarios y notas emocionales, consultar el catálogo de emociones y generar estadísticas de frecuencia por periodos y horas. Utiliza Entity Framework para la persistencia de datos en SQL Server y una arquitectura organizada mediante controladores, servicios y DTO.',
    tags: [
      "C#",
      ".NET Framework 4.8",
      "ASP.NET Web API 5.3",
      "Entity Framework 6.5.1",
      "SQL Server",
      "AutoMapper 8",
      "Newtonsoft.Json",
      "Swashbuckle",
      "iTextSharp",
      "NuGet",
      "IIS Express"
    ],
    images: [
      {
        file: '1.png',
        alt: 'Documentación Swagger de la API con endpoints de emociones y notas',
      },
      {
        file: '2.png',
        alt: 'Documentación Swagger con endpoints de notas y de usuarios, como registro, ingreso y consulta de apodo',
      },
    ],
    demoUrl: null,
    demoLabel: null,
    repoUrl: "https://github.com/MiguelDotDev/api-emotionalio-aspnetframework",
  }
]
