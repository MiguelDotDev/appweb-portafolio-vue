/**
 * Proyectos de la sección "Proyectos".
 *
 * Imágenes:
 * - Cada proyecto tiene su propia carpeta de imágenes en
 *   `src/assets/img/projects/<id>/` (por ejemplo `petcare/`).
 * - Las imágenes se descubren automáticamente (ver `@/data/projectImages`),
 *   así que para añadir una captura solo hay que copiar el archivo a la
 *   carpeta del proyecto. No se importan aquí para evitar duplicados.
 *
 * Enlaces:
 * - `demoUrl` / `repoUrl` con valor `null` significa "sin enlace real todavía".
 *   En ese caso la tarjeta no muestra un enlace clicable, sino una nota
 *   identificando que el enlace está sin configurar.
 * - Nunca se inventan URLs: rellena estos campos con destinos reales.
 */

export interface Project {
  /** Identificador estable; debe coincidir con la carpeta de imágenes. */
  id: string
  /** Nombre del proyecto. */
  title: string
  /** Descripción breve (1-2 líneas). */
  summary: string
  /** Tecnologías mostradas como etiquetas. */
  tags: string[]
  /** Texto alternativo base de las imágenes del proyecto. */
  imageAlt: string
  /** URL de la demo o `null` si todavía no existe. */
  demoUrl: string | null
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
    imageAlt: 'Vista de demostración de PetCare con fichas de mascotas y listado de consultas.',
    demoUrl: null,
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
    imageAlt: 'Panel de demostración de FinanceTrack con tarjetas de resumen y gráfico de barras.',
    demoUrl: "https://migueldotdev.github.io/web-usuarios-firebase/",
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
    imageAlt: 'Panel de demostración de FinanceTrack con tarjetas de resumen y gráfico de barras.',
    demoUrl: null,
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
    imageAlt: 'Panel de demostración de FinanceTrack con tarjetas de resumen y gráfico de barras.',
    demoUrl: null,
    repoUrl: "https://github.com/MiguelDotDev/api-emotionalio-aspnetframework",
  }
]
