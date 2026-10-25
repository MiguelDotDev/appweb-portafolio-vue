/**
 * Contenido de la sección "Acerca de mí".
 */

export interface Study {
  /** Nombre oficial de la institución. */
  institution: string
  /** Nombre completo de la carrera o programa. */
  degree: string
  /** Periodo tal como fue proporcionado. */
  period: string
  /** Estado de la carrera. */
  status: 'completada' | 'en-curso'
}

export const description: string[] = [
  'Soy estudiante de Ingeniería en Gestión y Desarrollo de Software en la Universidad Tecnológica de Tula-Tepeji, donde antes cursé el Técnico Superior Universitario en Desarrollo de Software Multiplataforma. Durante mi estadía profesional en Grupo Real Hoteles analicé, diseñé y desarrollé un sistema web con ASP.NET MVC y SQL Server para gestionar requisiciones internas. Antes, en mi servicio dual en Access Tecnologías, desarrollé un catálogo web con carrito y notificaciones por correo usando PHP y MySQL.',
  'Mi trabajo se centra en el backend con C# y ASP.NET, en bases de datos relacionales y en interfaces web con JavaScript, HTML y CSS. Tengo formación en Python, JavaScript y Linux con Cisco Networking Academy, y una evaluación de inglés con resultado C1. Busco una posición de desarrollo donde pueda seguir creciendo en backend y en proyectos web completos.'
]

export const studies: Study[] = [
  {
    institution: 'CECyTEM',
    degree: 'Técnico en Programación',
    period: '2020 - 2023',
    status: 'completada',
  },
  {
    institution: 'Universidad Tecnológica de Tula - Tepeji',
    degree: 'Técnico Superior Universitario en Desarrollo de Software Multiplataforma',
    period: '2023 - 2025',
    status: 'completada',
  },
  {
    institution: 'Universidad Tecnológica de Tula - Tepeji',
    degree: 'Ingeniería en Gestión y Desarrollo de Software',
    period: '2025 - En curso',
    status: 'en-curso',
  },
]
