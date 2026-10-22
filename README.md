# Portafolio Web Vue + Vite
Este es un proyecto web estatico desarrollado con Vue y Vite, es mi portafolio web (Miguel Angel Núñez Gómez)

## Secciones

- **Inicio** — presentación, accesos a proyectos y "Acerca de mí", redes y descarga del CV.
- **Stack tecnológico** — todas las tecnologías organizadas en categorías.
- **Proyectos** — cuatro tarjetas en cuadrícula de dos columnas, cada una con su propio carrusel de imágenes, etiquetas y enlace a GitHub.
- **Certificaciones y Formación** — credenciales filtrables (Todos / Certificaciones / Cursos / Inglés) con modal de evidencia PDF y descarga.
- **Acerca de mí** — subsecciones *Descripción* (texto provisional) y *Estudios* (línea de tiempo).

## Estructura

```
src/
├── assets/img/projects/   # Imágenes de cada proyecto, en una carpeta por proyecto
│   ├── petcare/           #   01-portada.svg, 02-fichas.svg, …
│   ├── financetrack/
│   ├── devtasks/
│   └── datavision/
├── components/            # Secciones y pie: TheNavbar, HeroSection, StackSection…
│   └── ProjectImageCarousel.vue  # Carrusel reutilizable (una instancia por tarjeta)
├── composables/           # useImageCarousel: estado y navegación del carrusel
├── data/                  # Contenido editable separado de la presentación
│   ├── stack.ts           #   categorías y tecnologías
│   ├── projects.ts        #   proyectos (título, descripción, tags, enlaces)
│   ├── projectImages.ts   #   descubrimiento automático de las imágenes por carpeta
│   ├── certifications.ts  #   credenciales, filtros y categorías
│   ├── about.ts           #   descripción y estudios
│   └── socials.ts         #   redes sociales y ruta del CV
├── App.vue                # Composición, paleta (@theme) y arranque de AOS
└── main.ts
```

## Personalizar el contenido

- **Añadir o quitar proyectos:** editar `src/data/projects.ts`. Si `demoUrl` o `repoUrl` son `null`, la tarjeta no muestra enlace clicable.
- **Añadir tecnologías:** editar `src/data/stack.ts` (iconos de la colección [Devicon](https://github.com/devicons/devicon)).
- **Estudios y descripción:** editar `src/data/about.ts`.
- **Certificaciones y formación:** editar `src/data/certifications.ts`.

### Imágenes de los proyectos (carrusel)

Cada proyecto tiene su propia carpeta en `src/assets/img/projects/<id>/`, donde
`<id>` es el campo `id` del proyecto en `src/data/projects.ts`:

```
src/assets/img/projects/petcare/
├── 01-portada.svg
├── 02-fichas.svg
└── 03-vista-movil.png
```

- **Añadir una imagen es copiar el archivo en la carpeta del proyecto.** No hay
  que tocar ningún componente ni ninguna lista: `src/data/projectImages.ts`
  descubre los archivos con `import.meta.glob` de Vite y agrupa las imágenes
  por el nombre de la carpeta, de modo que cada carrusel solo recibe las suyas.
- **Formatos admitidos:** `jpg`, `jpeg`, `png`, `webp`, `avif` y `svg`.
- **Orden:** por nombre de archivo. Se recomienda numerar con dos dígitos
  (`01-portada.webp`, `02-detalle.png`, `03-resultados.webp`) para que la
  secuencia sea predecible; sin numeración, el orden es alfabético.
- **Texto alternativo:** se compone automáticamente con la etiqueta del
  archivo (`02-fichas` → "Fichas") y el `imageAlt` del proyecto, de forma que
  cada imagen tiene un `alt` descriptivo y distinto.
- **Al arrancar o recompilar**, Vite vuelve a resolver el glob. Si añades
  archivos mientras el servidor está en marcha, puede ser necesario
  reiniciar `pnpm dev` para que los detecte.
- Un proyecto con **una sola imagen** muestra esa imagen sin controles; un
  proyecto **sin imágenes** muestra un estado de respaldo discreto.

Las capturas de demostración actuales (las de `02-*`, `03-*` y `04-*`) se
pueden regenerar con `node scripts/generar-imagenes-demo.mjs`. Las imágenes
`01-portada.*` son las originales del portafolio y no se tocan.

### Añadir un proyecto nuevo

1. Crea la carpeta de imágenes `src/assets/img/projects/<id>/` y copia dentro
   las capturas del proyecto (empezando por `01-portada.*`).
2. Añade el objeto al array `projects` de `src/data/projects.ts`:

   ```ts
   {
     id: 'mi-proyecto',                   // único: debe coincidir con la carpeta
     title: 'Mi proyecto',
     summary: 'Descripción breve del proyecto.',
     tags: ['Vue', 'TypeScript'],
     imageAlt: 'Vista de demostración de Mi proyecto con su panel principal.',
     demoUrl: null,                       // o la URL real de la demo
     repoUrl: null,                       // o la URL real del repositorio
   }
   ```

   Si `repoUrl` tiene valor, el botón **"Ver en GitHub"** del pie de la tarjeta
   se convierte en un enlace que abre el repositorio en una pestaña nueva. Si
   es `null`, el botón queda deshabilitado en lugar de apuntar a un destino
   inexistente.

> Las tarjetas se colocan solas en la cuadrícula: una columna en pantallas
> pequeñas y dos columnas a partir de `md` (768px).

### Añadir una credencial y su evidencia

1. Copia el PDF en `public/evidencias/` (por ejemplo `public/evidencias/mi-curso.pdf`).
2. Añade un objeto a `certifications` en `src/data/certifications.ts`:

   ```ts
   {
     id: 'mi-curso',                    // único: identifica la tarjeta y el archivo de descarga
     nombre: 'Mi curso',
     emisor: 'Institución que lo expide',
     categoria: 'cursos',               // 'certificaciones' | 'cursos' | 'ingles'
     fecha: '2025-01',
     resultado: 'Curso completado',     // o `null` → la tarjeta muestra "No aplica"
     pdfUrl: '/evidencias/mi-curso.pdf',
   }
   ```

   > Las rutas se construyen con `evidenciasBase`, que respeta el `base` de Vite.

3. Si todavía no tienes el PDF, deja `pdfUrl` vacío (`''`): la tarjeta mostrará
   *"evidencia pendiente de cargar"* en lugar de un botón roto. No uses el mismo
   PDF de ejemplo para varias credenciales.

Las credenciales incluidas actualmente (`demo-cloud`, `demo-web`, `demo-english`,
`demo-python`) y sus PDFs son **datos de demostración**: no son certificaciones
auténticas. Los cuatro PDFs de prueba se generaron con
`node scripts/generar-evidencias-demo.mjs`.

- La animación de scroll usa **AOS** y se inicializa una sola vez en `src/App.vue`; respeta `prefers-reduced-motion`.

## Desarrollo

```sh
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # type-check (vue-tsc) + build de producción
pnpm preview   # previsualizar el build
```
