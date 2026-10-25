/**
 * Contenido de la sección "Experiencia".
 */

export interface Experience {
  /** Organización o empresa. */
  organization: string
  /** Tipo de experiencia. */
  type: string
  /** Periodo. */
  period: string
  /** Proyecto asociado. */
  project: string
  /** Descripción breve/contexto de la participación. */
  description: string
  /** Principales actividades y aportaciones. */
  activities: string[]
  /** Tecnologías principales utilizadas. */
  technologies: string[]
  /** URL del repositorio en GitHub. */
  repoUrl: string
}

export const experiences: Experience[] = [
  {
    organization: 'Access Tecnologías',
    type: 'Servicio Dual · Preparatoria técnica',
    period: '2022',
    project: 'Carrito y Catalogo Web — Catálogo de productos con solicitudes de compra online',
    description:
      'Durante mi Servicio Dual en Access Tecnologías, desarrollé una solución web inicial para atender la necesidad de mostrar productos por Internet y facilitar el envío de solicitudes de compra. A través del proyecto "Carrito y Catalogo Web", llevé esa propuesta a un MVP que integraba un catálogo digital, fichas de productos y un flujo de solicitud de compra.',
    activities: [
      'Desarrollé un catálogo web con paginación, filtros y fichas de productos para facilitar su consulta.',
      'Implementé un carrito conectado a una base de datos y un formulario para recopilar los datos de contacto y las solicitudes de los clientes.',
      'Integré un flujo de notificación por correo mediante SMTP como parte del proceso de solicitud.',
      'Apliqué PHP, SQL y tecnologías frontend para conectar la interfaz con los datos y las funcionalidades del catálogo.',
    ],
    technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'SMTP'],
    repoUrl: 'https://github.com/MiguelDotDev/web-catalogo-carrito-php',
  },
  {
    organization: 'Grupo Real Hoteles',
    type: 'Estadía profesional TSU · Desarrollo de Software Multiplataforma',
    period: '5 de mayo al 15 de agosto de 2025',
    project: 'Sistema Gestor de Requisiciones Interno (SGRH)',
    description:
      'Durante mi estadía profesional en Grupo Real Hoteles, analicé el proceso de requisiciones internas, que se gestionaba mediante formatos físicos y hojas de cálculo, y desarrollé una aplicación web para centralizar las solicitudes de productos y servicios. La solución organiza el registro, la autorización y el seguimiento de las requisiciones, con el objetivo de mejorar la trazabilidad y facilitar la coordinación entre las áreas involucradas.',
    activities: [
      'Analicé y documenté los requerimientos del proceso de requisiciones junto con personal involucrado en las áreas de Compras y Sistemas.',
      'Diseñé e integré una base de datos relacional en SQL Server para gestionar la información del sistema.',
      'Desarrollé e implementé módulos para administrar requisiciones, usuarios, roles, productos y proveedores.',
      'Implementé el flujo de autorización o rechazo y el seguimiento de las solicitudes, incorporando folios y notificaciones por correo.',
      'Integré autenticación y control de acceso por roles para adaptar las funcionalidades a los distintos usuarios.',
    ],
    technologies: [
      'C#',
      '.NET Framework 4.8',
      'ASP.NET MVC 5',
      'Entity Framework 6',
      'SQL Server',
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap 5',
    ],
    repoUrl: 'https://github.com/MiguelDotDev/appweb-sistema-hotel-sgri-aspnetframework',
  },
]
