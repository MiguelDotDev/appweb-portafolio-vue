/**
 * Descubrimiento automático de las imágenes de los proyectos.
 *
 * Las imágenes viven en `src/assets/img/projects/<proyecto>/` y se detectan
 * con `import.meta.glob` de Vite, de modo que basta con copiar un archivo
 * nuevo dentro de la carpeta del proyecto para que aparezca en su carrusel
 * (sin tocar el componente ni ninguna lista manual).
 *
 * Formatos admitidos: jpg, jpeg, png, webp, avif y svg.
 * Orden: el nombre del archivo, con numeración inicial recommended
 * (`01-portada.webp`, `02-detalle.png`, …) para que la secuencia sea
 * predecible. Sin numeración, el orden es alfabético.
 *
 * Nota: Vite resuelve el glob al arrancar el servidor o al compilar, por lo
 * que puede ser necesario reiniciar `pnpm dev` para detectar archivos nuevos.
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
  /** Etiqueta legible derivada del nombre (`portada` → `Portada`). */
  label: string
}

/** Imagen lista para pintarse en el carrusel. */
export interface ProjectImage extends DiscoveredImage {
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

/** Convierte `02-mis-pantallas` en `Mis pantallas`. */
function humanize(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, '')
  const withoutPrefix = withoutExtension.replace(/^\d+[-_.]?/, '')
  const words = withoutPrefix.replace(/[-_]+/g, ' ').trim()
  if (!words) return 'Imagen del proyecto'
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** Extrae el nombre de la carpeta del proyecto a partir de la ruta del glob. */
function extractProjectId(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2] ?? ''
}

/**
 * Agrupa las imágenes por proyecto y las ordena de forma determinista.
 * El `Map` mantiene el orden de aparición y evita duplicados por ruta.
 */
const imagesByProject = new Map<string, DiscoveredImage[]>()

for (const [path, src] of Object.entries(imageModules)) {
  if (typeof src !== 'string' || !src) continue

  const file = path.split('/').pop() ?? ''
  const projectId = extractProjectId(path)
  if (!projectId || !file) continue

  // Solo se aceptan las extensiones declaradas (evita que un archivo
  // homónimo con otra extensión acabe en el carrusel).
  const extension = file.split('.').pop()?.toLowerCase() ?? ''
  if (!IMAGE_EXTENSIONS.includes(extension as (typeof IMAGE_EXTENSIONS)[number])) continue

  const list = imagesByProject.get(projectId) ?? []
  // Deduplicación por ruta: un mismo archivo nunca aparece dos veces.
  if (list.some((image) => image.file === file)) continue

  list.push({ src, file, label: humanize(file) })
  imagesByProject.set(projectId, list)
}

// Orden determinista: primero por el prefijo numérico y luego alfabéticamente.
for (const list of imagesByProject.values()) {
  list.sort((a, b) => a.file.localeCompare(b.file, 'es', { numeric: true, sensitivity: 'base' }))
}

/**
 * Devuelve las imágenes de un proyecto concreto.
 * Cada proyecto solo recibe los archivos de su propia carpeta.
 */
export function getProjectImages(projectId: string): DiscoveredImage[] {
  return imagesByProject.get(projectId) ?? []
}
