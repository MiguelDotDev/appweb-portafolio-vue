/**
 * Contenido de la sección "Acerca de mí".
 *
 * ⚠️ TEXTO PROVISIONAL:
 * `description` es contenido de ejemplo (Lorem ipsum) para maquetar la
 * sección; sustitúyelo por la biografía real.
 *
 * `studies` conserva los nombres oficiales, los periodos y el estado
 * tal como fueron proporcionados. El orden es cronológico ascendente.
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
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
