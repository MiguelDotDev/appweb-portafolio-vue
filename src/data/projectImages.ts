/**
 * Descubrimiento automático de las imágenes de los proyectos.
 *
 * Las imágenes viven en `src/assets/img/projects/<proyecto>/` y se detectan
 * con `import.meta.glob` de Vite.
 *
 * El orden y los textos alternativos vienen de `@/data/projects` (`images`),
 * no del nombre de archivo. Solo se muestran las entradas definidas en
 * `projects.ts` que tengan un archivo correspondiente en el glob.
 * Los archivos que existan en la carpeta pero no estén definidos en
 * `projects.ts` se ignoran.
 *
 * Formatos admitidos: jpg, jpeg, png, webp, avif y svg.
 */

/**
 * Extensiones admitidas dentro de las carpetas de proyecto.
 * Deben coincidir con las del patrón del glob de abajo.
 */
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'] as const

/** Imagen descubierta en el disco. */
export interface DiscoveredImage {
  /** Ruta pública del recurso ya procesado por Vite. */
  src: string
  /** Nombre del archivo (por ejemplo `01-portada.svg`). */
  file: string
}

/** Imagen lista para pintarse en el carrusel. */
export interface ProjectImage {
  /** Ruta pública del recurso ya procesado por Vite. */
  src: string
  /** Nombre del archivo. */
  file: string
  /** Texto alternativo descriptivo. */
  alt: string
}

/**
 * Módulos de imagen detectados por Vite.
 *
 * El patrón debe escribirse como literal (Vite lo analiza en tiempo de
 * compilación), por eso no se puede interpolar `IMAGE_EXTENSIONS`.
 * `query: '?url'` + `import: 'default'` devuelve directamente la URL final
 * del recurso, así que no hay que procesar ningún módulo.
 */
const imageModules = import.meta.glob<string>(
  '../assets/img/projects/*/*.{jpg,jpeg,png,webp,avif,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

/** Extrae el nombre de la carpeta del proyecto a partir de la ruta del glob. */
function extractProjectId(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2] ?? ''
}

/**
 * Mapa con las URLs resueltas por proyecto y archivo.
 * El `Map` mantiene el orden de aparición y evita duplicados por ruta.
 */
const urlsByProjectAndFile = new Map<string, Map<string, string>>()

for (const [path, src] of Object.entries(imageModules)) {
  if (typeof src !== 'string' || !src) continue

  const file = path.split('/').pop() ?? ''
  const projectId = extractProjectId(path)
  if (!projectId || !file) continue

  // Solo se aceptan las extensiones declaradas (evita que un archivo
  // homónimo con otra extensión acabe en el carrusel).
  const extension = file.split('.').pop()?.toLowerCase() ?? ''
  if (!IMAGE_EXTENSIONS.includes(extension as (typeof IMAGE_EXTENSIONS)[number])) continue

  const filesMap = urlsByProjectAndFile.get(projectId) ?? new Map<string, string>()
  if (filesMap.has(file)) continue

  filesMap.set(file, src)
  urlsByProjectAndFile.set(projectId, filesMap)
}

import { projects } from './projects'

/**
 * Devuelve las imágenes de un proyecto concreto según la lista `images` de projects.ts.
 * El orden y los textos alternativos vienen de projects.ts; solo se muestran las entradas
 * que tengan un archivo correspondiente en el glob. Si falta un archivo, se registra un aviso.
 */
export function getProjectImages(projectId: string): ProjectImage[] {
  const project = projects.find((p) => p.id === projectId)
  if (!project) return []

  const filesMap = urlsByProjectAndFile.get(projectId)
  const result: ProjectImage[] = []

  for (const imageSpec of project.images) {
    const src = filesMap?.get(imageSpec.file)
    if (!src) {
      console.warn(`[projectImages] Falta archivo para el proyecto "${projectId}": ${imageSpec.file}`)
      continue
    }
    result.push({ src, file: imageSpec.file, alt: imageSpec.alt })
  }

  return result
}
