/**
 * Credenciales de la sección "Certificaciones y Formación".
 *
 * ⚠️ CONTENIDO DE DEMOSTRACIÓN:
 * Las cuatro credenciales siguientes son ejemplos ficticios creados para
 * maquetar y probar la sección (filtros, modal y descarga). NO son
 * certificaciones oficiales reales ni pertenecen al usuario. Sustitúyelas
 * por credenciales reales editando únicamente este archivo.
 *
 * Para añadir, editar o eliminar una credencial:
 * 1. Copia el PDF de evidencia en `public/evidencias/`.
 * 2. Añade un objeto a `certifications` con:
 *    - `id`: identificador único (se usa como `key` y para el nombre de archivo).
 *    - `nombre`, `emisor`, `fecha`, `resultado` y `categoria`.
 *    - `pdfUrl`: ruta pública del PDF, p. ej. `/evidencias/mi-curso.pdf`.
 * 3. No hace falta tocar ningún componente visual.
 */

/** Categorías internas usadas por los filtros. */
export type CertificationCategory = 'certificaciones' /*| 'cursos'*/ | 'ingles'

export interface Certification {
  /** Identificador único de la credencial. */
  id: string
  /** Nombre de la credencial. */
  nombre: string
  /** Institución, plataforma u organismo que la expide. */
  emisor: string
  /** Categoría usada por la barra de filtros. */
  categoria: CertificationCategory
  /** Fecha de obtención o finalización (texto libre, p. ej. "2024-03"). */
  fecha: string
  /**
   * Puntuación, nivel, calificación o resultado acreditado.
   * `null` cuando no aplica: la tarjeta muestra "No aplica" de forma discreta.
   */
  resultado: string | null
  /** Ruta pública del PDF de evidencia (relativa a la raíz del sitio). */
  pdfUrl: string
}

/** Opción de la barra de filtros. */
export interface CertificationFilter {
  /** Valor usado internamente; `'todos'` muestra todas las credenciales. */
  value: 'todos' | CertificationCategory
  /** Etiqueta visible del filtro. */
  label: string
}

/** Filtros visibles de la sección, en el orden en que se muestran. */
export const certificationFilters: CertificationFilter[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'ingles', label: 'Inglés' },
  { value: 'certificaciones', label: 'Certificaciones' },
  //{ value: 'cursos', label: 'Cursos' },
]

/** Nombre visible de cada categoría, usado en el badge de las tarjetas. */
export const categoryLabels: Record<CertificationCategory, string> = {
  certificaciones: 'Certificación',
  //cursos: 'Curso',
  ingles: 'Inglés',
}

/**
 * Ruta base de las evidencias. Se respeta el `base` de Vite para que las
 * rutas funcionen tanto en desarrollo como en la compilación de producción.
 *
 * Los PDF deben colocarse en `public/evidencias/`.
 */
export const evidenciasBase = `${import.meta.env.BASE_URL}evidencias/`

/**
 * Indica si una ruta de evidencia apunta a un PDF real o a un marcador de
 * posición. Las credenciales sin documento muestran un aviso en la tarjeta
 * y un mensaje en el modal en lugar de abrir un archivo inexistente.
 */
export function hasEvidence(pdfUrl: string | null | undefined): pdfUrl is string {
  return typeof pdfUrl === 'string' && pdfUrl.trim().length > 0
}

/** Colección de credenciales */
export const certifications: Certification[] = [
  {
    id: 'fundamentos-python-1',
    nombre: 'Fundamentos de Python 1',
    emisor: 'Cisco Networking Academy',
    categoria: 'certificaciones',
    fecha: '2025-01-01',
    resultado: 'Aprobado',
    pdfUrl: `${evidenciasBase}fundamentos-python-1-MiguelNunez.pdf`,
  },
  {
    id: 'fundamentos-python-2',
    nombre: 'Fundamentos de Python 2',
    emisor: 'Cisco Networking Academy',
    categoria: 'certificaciones',
    fecha: '2026-05-08',
    resultado: 'Aprobado',
    pdfUrl: `${evidenciasBase}fundamentos-python-2-MiguelNunez.pdf`,
  },
  {
    id: 'oxford-placement-test',
    nombre: 'Oxford Placement Test',
    emisor: 'Oxford University Press',
    categoria: 'ingles',
    fecha: '2026-05-08',
    resultado: 'C1 — 84 puntos',
    pdfUrl: `${evidenciasBase}oxford-placement-test-miguel-nunez.pdf`,
  },
  {
    id: 'javascript-essentials-1',
    nombre: 'JavaScript Essentials 1',
    emisor: 'Cisco Networking Academy',
    categoria: 'certificaciones',
    fecha: 'Mayo 29, 2026',
    resultado: 'Aprobado',
    pdfUrl: `${evidenciasBase}javascript-essentials-1-miguel-nunez.pdf`,
  },
  {
    id: 'partner-ndg-linux-essentials',
    nombre: 'Partner: NDG Linux Essentials',
    emisor: 'Cisco Networking Academy',
    categoria: 'certificaciones',
    fecha: 'Agosto 14, 2026',
    resultado: 'Aprobado',
    pdfUrl: `${evidenciasBase}partner-ndg-linux-essentials-miguel-nunez.pdf`,
  },
  {
    id: 'iot-transformacion-digital',
    nombre: 'Introducción al Internet de las Cosas y Transformación Digital',
    emisor: 'Cisco Networking Academy',
    categoria: 'certificaciones',
    fecha: 'Noviembre 20, 2024',
    resultado: 'Aprobado',
    pdfUrl: `${evidenciasBase}iot-transformacion-digital-miguel-nunez.pdf`,
  },
]
