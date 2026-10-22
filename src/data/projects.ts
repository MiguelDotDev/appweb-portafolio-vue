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
  }
]
