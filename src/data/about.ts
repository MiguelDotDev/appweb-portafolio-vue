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
  'Soy estudiante de Ingeniería en Gestión y Desarrollo de Software en la Universidad Tecnológica de Tula-Tepeji, donde previamente cursé el Técnico Superior Universitario en Desarrollo de Software Multiplataforma. Durante mi estadía profesional en Grupo Real Hoteles, analicé, diseñé y desarrollé un sistema web con ASP.NET MVC y SQL Server para gestionar requisiciones internas. Anteriormente, como parte de mi formación dual en Access Tecnologías, desarrollé un catálogo web con carrito de compras y notificaciones por correo electrónico utilizando PHP y MySQL.',
  'Mi trabajo se centra en el desarrollo backend con C# y ASP.NET, las bases de datos relacionales y el desarrollo de interfaces web con JavaScript, HTML y CSS. Cuento con formación en Python, JavaScript y Linux a través de Cisco Networking Academy.',
  'Me mantengo en constante aprendizaje, explorando nuevas metodologías y herramientas para mejorar mi forma de desarrollar software. Actualmente, estoy aprendiendo sobre SDD (Spec-Driven Development) para trabajar de manera más estructurada con agentes de inteligencia artificial, y ampliando mis conocimientos en arquitectura de microservicios y el patrón CQRS. Busco seguir creciendo profesionalmente en el desarrollo backend, profundizar en el diseño de software y participar en proyectos que representen nuevos retos técnicos.'
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
