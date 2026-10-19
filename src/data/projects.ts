/**
 * Proyectos de la sección "Proyectos".
 *
 * ⚠️ CONTENIDO DE DEMOSTRACIÓN:
 * Los cuatro proyectos siguientes son ejemplos ficticios para maquetar la
 * sección. Sustitúyelos por proyectos reales editando únicamente este archivo.
 *
 * Enlaces:
 * - `demoUrl` / `repoUrl` con valor `null` significa "sin enlace real todavía".
 *   En ese caso la tarjeta no muestra un enlace clicable, sino una nota
 *   identificando que el enlace está sin configurar.
 * - Nunca se inventan URLs: rellena estos campos con destinos reales.
 */

import petcareImage from '@/assets/img/projects/petcare.svg'
import financetrackImage from '@/assets/img/projects/financetrack.svg'
import devtasksImage from '@/assets/img/projects/devtasks.svg'
import datavisionImage from '@/assets/img/projects/datavision.svg'

export interface Project {
  /** Nombre del proyecto. */
  title: string
  /** Descripción breve (1-2 líneas). */
  summary: string
  /** Tecnologías mostradas como etiquetas. */
  tags: string[]
  /** Imagen representativa (recurso local). */
  image: string
  /** Texto alternativo descriptivo de la imagen. */
  imageAlt: string
  /** URL de la demo o `null` si todavía no existe. */
  demoUrl: string | null
  /** URL del repositorio o `null` si todavía no existe. */
  repoUrl: string | null
}

export const projects: Project[] = [
  {
    title: 'PetCare — Gestión veterinaria',
    summary:
      'Aplicación para organizar información de mascotas, consultas y registros médicos.',
    tags: ['Vue', 'TypeScript', 'ASP.NET Core', 'SQL Server'],
    image: petcareImage,
    imageAlt: 'Vista de demostración de PetCare con fichas de mascotas y listado de consultas.',
    demoUrl: null,
    repoUrl: null,
  },
  {
    title: 'FinanceTrack — Control de finanzas',
    summary:
      'Plataforma para visualizar gastos, clasificar transacciones y consultar estadísticas financieras.',
    tags: ['Vue', 'TypeScript', 'Firebase'],
    image: financetrackImage,
    imageAlt: 'Panel de demostración de FinanceTrack con tarjetas de resumen y gráfico de barras.',
    demoUrl: null,
    repoUrl: null,
  },
  {
    title: 'DevTasks — Gestor de tareas',
    summary:
      'Aplicación para administrar tareas, proyectos y actividades mediante una interfaz sencilla.',
    tags: ['Vue', 'Tailwind CSS', 'ASP.NET Core'],
    image: devtasksImage,
    imageAlt: 'Tablero de demostración de DevTasks con columnas y tarjetas de tareas.',
    demoUrl: null,
    repoUrl: null,
  },
  {
    title: 'DataVision — Panel de analítica',
    summary:
      'Dashboard de ejemplo para representar métricas e indicadores mediante gráficos.',
    tags: ['Vue', 'TypeScript', 'Biblioteca de gráficos'],
    image: datavisionImage,
    imageAlt: 'Panel de demostración de DataVision con indicadores, línea de tendencia y anillo de progreso.',
    demoUrl: null,
    repoUrl: null,
  },
]
