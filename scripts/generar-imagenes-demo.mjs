/*
 * Generador de imágenes de demostración del carrusel de proyectos (sin dependencias).
 * Crea las capturas adicionales de cada proyecto en
 * src/assets/img/projects/<proyecto>/NN-<nombre>.<ext>.
 *
 * La imagen `01-portada.svg` de cada proyecto es la original del portafolio y
 * NO se toca: este script solo genera las capturas complementarias
 * (02-*, 03-*, 04-*) para que el carrusel tenga contenido que recorrer.
 *
 * Formatos: las capturas se generan en SVG y, para las que declaran un
 * formato distinto (`png`, `webp`), se rasterizan con `rsvg-convert` si está
 * disponible. Si no lo está, se omite la captura rasterizada sin fallar.
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const baseDir = resolve(here, '..', 'src', 'assets', 'img', 'projects')

const INK = '#0B0F19'
const SURFACE = '#111726'
const TEAL = '#2DD4BF'
const INDIGO = '#818CF8'
const AMBER = '#EAB308'
const EMERALD = '#34D399'

/** Barra de navegador común. */
function browserBar() {
  return `
  <rect x="0" y="0" width="800" height="36" fill="${SURFACE}"/>
  <rect x="0" y="35" width="800" height="1" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="20" cy="18" r="5" fill="#EF4444" opacity="0.7"/>
  <circle cx="40" cy="18" r="5" fill="#EAB308" opacity="0.7"/>
  <circle cx="60" cy="18" r="5" fill="#10B981" opacity="0.7"/>
  <rect x="100" y="10" width="260" height="16" rx="8" fill="#FFFFFF" opacity="0.07"/>`
}

/** Esqueleto con barra lateral y contenido. */
function shell({ sidebar, content }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img">
  <rect width="800" height="500" fill="${INK}"/>
${browserBar()}
  <rect x="0" y="36" width="172" height="464" fill="#0E1422"/>
  <rect x="171" y="36" width="1" height="464" fill="#FFFFFF" opacity="0.08"/>
${sidebar}
${content}
</svg>
`
}

/** Barra lateral con la entrada activa resaltada. */
function sidebar(activeIndex = 0) {
  const items = [0, 1, 2, 3, 4]
  const rows = items
    .map((index) => {
      const y = 128 + index * 38
      const active = index === activeIndex
      return `
  ${active ? `<rect x="16" y="${y}" width="140" height="30" rx="9" fill="${TEAL}" opacity="0.14"/><rect x="16" y="${y - 2}" width="3" height="34" rx="1.5" fill="${TEAL}"/>` : ''}
  <rect x="34" y="${y + 10}" width="${64 + index * 8}" height="10" rx="5" fill="${active ? TEAL : '#FFFFFF'}" opacity="${active ? 0.85 : 0.14}"/>`
    })
    .join('')
  return `
  <rect x="24" y="64" width="30" height="30" rx="9" fill="${TEAL}" opacity="0.18"/>
  <circle cx="39" cy="79" r="6" fill="${TEAL}"/>
  <rect x="64" y="72" width="72" height="10" rx="5" fill="#FFFFFF" opacity="0.22"/>${rows}`
}

/** Listado de filas tipo tabla. */
function rows({ x = 196, y = 150, width = 588, gap = 52, count = 4, accent = TEAL }) {
  let out = ''
  for (let i = 0; i < count; i += 1) {
    const top = y + i * gap
    out += `
  <rect x="${x}" y="${top}" width="${width}" height="40" rx="12" fill="${SURFACE}" stroke="#FFFFFF" stroke-opacity="0.07"/>
  <circle cx="${x + 26}" cy="${top + 20}" r="11" fill="${i % 2 ? INDIGO : accent}" opacity="0.25"/>
  <rect x="${x + 50}" y="${top + 11}" width="${150 + i * 24}" height="9" rx="4.5" fill="#FFFFFF" opacity="0.24"/>
  <rect x="${x + 50}" y="${top + 26}" width="${96 + i * 12}" height="7" rx="3.5" fill="#FFFFFF" opacity="0.1"/>
  <rect x="${x + width - 78}" y="${top + 12}" width="58" height="16" rx="8" fill="${i % 2 ? AMBER : EMERALD}" opacity="0.16"/>`
  }
  return out
}

/** Bloque de título de sección. */
function heading(y, width = 200) {
  return `
  <rect x="196" y="${y}" width="${width}" height="14" rx="6" fill="#FFFFFF" opacity="0.22"/>
  <rect x="196" y="${y + 26}" width="300" height="9" rx="4.5" fill="#FFFFFF" opacity="0.08"/>`
}

/** Variante "listado": tabla de elementos. */
function listado({ accent = TEAL, title = 'Listado' }) {
  return shell({
    sidebar: sidebar(1),
    content: `
${heading(66, 180)}
  <rect x="666" y="64" width="114" height="34" rx="9" fill="${TEAL}"/>
  <path d="M723 74v14M716 81h14" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
${rows({ y: 132, accent })}`,
  }).replace('<svg xmlns="http://www.w3.org/2000/svg"', `<svg xmlns="http://www.w3.org/2000/svg" aria-label="Maqueta de ${title}"`)
}

/** Variante "detalle": ficha principal + panel lateral. */
function detalle({ accent = TEAL, title = 'Detalle' }) {
  return shell({
    sidebar: sidebar(2),
    content: `
${heading(66, 210)}
  <rect x="196" y="124" width="356" height="330" rx="14" fill="${SURFACE}" stroke="#FFFFFF" stroke-opacity="0.09"/>
  <circle cx="374" cy="200" r="38" fill="${accent}" opacity="0.16"/>
  <circle cx="374" cy="192" r="14" fill="${accent}" opacity="0.9"/>
  <path d="M352 224a22 22 0 0 1 44 0z" fill="${accent}" opacity="0.9"/>
  <rect x="238" y="262" width="272" height="13" rx="6" fill="#FFFFFF" opacity="0.26"/>
  <rect x="238" y="288" width="196" height="10" rx="5" fill="#FFFFFF" opacity="0.12"/>
  <g fill="#FFFFFF" opacity="0.1">
    <rect x="238" y="330" width="272" height="9" rx="4.5"/>
    <rect x="238" y="352" width="212" height="9" rx="4.5"/>
  </g>
  <rect x="238" y="392" width="96" height="26" rx="13" fill="${EMERALD}" opacity="0.16"/>
  <rect x="238" y="402" width="56" height="7" rx="3.5" fill="${EMERALD}" opacity="0.9"/>
  <rect x="584" y="124" width="200" height="330" rx="14" fill="${SURFACE}" stroke="#FFFFFF" stroke-opacity="0.07"/>
${rows({ x: 600, y: 156, width: 168, gap: 62, count: 4, accent })}`,
  }).replace('<svg xmlns="http://www.w3.org/2000/svg"', `<svg xmlns="http://www.w3.org/2000/svg" aria-label="Maqueta de ${title}"`)
}

/** Variante "móvil": teléfono centrado. */
function movil({ accent = TEAL, title = 'Vista móvil' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-label="Maqueta de ${title}" viewBox="0 0 800 500" width="800" height="500" role="img">
  <rect width="800" height="500" fill="${INK}"/>
  <rect x="300" y="20" width="200" height="460" rx="28" fill="${SURFACE}" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <rect x="368" y="34" width="64" height="8" rx="4" fill="#FFFFFF" opacity="0.18"/>
  <rect x="316" y="62" width="168" height="80" rx="14" fill="${accent}" opacity="0.14"/>
  <rect x="332" y="80" width="86" height="11" rx="5" fill="${accent}" opacity="0.8"/>
  <rect x="332" y="102" width="120" height="8" rx="4" fill="#FFFFFF" opacity="0.12"/>
${rows({ x: 316, y: 158, width: 168, gap: 58, count: 5, accent })}
  <rect x="316" y="448" width="168" height="4" rx="2" fill="#FFFFFF" opacity="0.14"/>
</svg>
`
}

const proyectos = [
  {
    id: 'petcare',
    capturas: [
      { file: '02-fichas.svg', build: () => listado({ accent: TEAL, title: 'Fichas de mascotas' }) },
      { file: '03-vista-movil.svg', build: () => movil({ accent: TEAL, title: 'PetCare en móvil' }) },
      {
        file: '04-detalle-consulta.png',
        format: 'png',
        build: () => detalle({ accent: TEAL, title: 'Detalle de la consulta' }),
      },
    ],
  },
  {
    id: 'financetrack',
    capturas: [
      { file: '02-gastos.svg', build: () => listado({ accent: INDIGO, title: 'Listado de gastos' }) },
      { file: '03-estadisticas.svg', build: () => detalle({ accent: INDIGO, title: 'Estadísticas financieras' }) },
      {
        file: '04-estadisticas-movil.webp',
        format: 'webp',
        build: () => movil({ accent: INDIGO, title: 'FinanceTrack en móvil' }),
      },
    ],
  },
  {
    id: 'devtasks',
    capturas: [
      { file: '02-tablero.svg', build: () => detalle({ accent: AMBER, title: 'Tablero de tareas' }) },
      { file: '03-actividad.svg', build: () => listado({ accent: EMERALD, title: 'Registro de actividad' }) },
    ],
  },
  {
    id: 'datavision',
    capturas: [
      { file: '02-metricas.svg', build: () => detalle({ accent: TEAL, title: 'Métricas del panel' }) },
      { file: '03-indicadores.svg', build: () => movil({ accent: INDIGO, title: 'DataVision en móvil' }) },
    ],
  },
]

/** Convierte SVG a PNG con `rsvg-convert` (si está disponible). */
function svgToPng(svg, outFile) {
  execFileSync('rsvg-convert', ['-w', '1600', '-h', '1000', '-o', outFile, '-'], {
    input: svg,
  })
}

/** Convierte PNG a WebP con ImageMagick (si está disponible). */
function pngToWebp(pngFile, outFile) {
  execFileSync('magick', [pngFile, '-quality', '85', outFile])
}

for (const proyecto of proyectos) {
  const dir = resolve(baseDir, proyecto.id)
  mkdirSync(dir, { recursive: true })

  for (const captura of proyecto.capturas) {
    const svg = captura.build()
    const target = resolve(dir, captura.file)

    if (!captura.format) {
      writeFileSync(target, svg, 'utf8')
      console.log(`Generado: src/assets/img/projects/${proyecto.id}/${captura.file}`)
      continue
    }

    // Formato rasterizado: se genera primero un PNG temporal y se convierte.
    const tmpPng = resolve(tmpdir(), `proyecto-${proyecto.id}-${captura.file}.png`)
    try {
      svgToPng(svg, tmpPng)
      if (captura.format === 'webp') {
        pngToWebp(tmpPng, target)
      } else {
        copyFileSync(tmpPng, target)
      }
      rmSync(tmpPng, { force: true })
      console.log(`Generado: src/assets/img/projects/${proyecto.id}/${captura.file}`)
    } catch (error) {
      console.warn(
        `Omitido ${captura.file}: falta la herramienta de conversión (${error.message.split('\n')[0]})`,
      )
    }
  }
}
