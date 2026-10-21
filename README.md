# Portafolio Web Vue + Vite
Este es un proyecto web estatico desarrollado con Vue y Vite, es mi portafolio web (Miguel Angel Núñez Gómez)

## Secciones

- **Inicio** — presentación, accesos a proyectos y "Acerca de mí", redes y descarga del CV.
- **Stack tecnológico** — todas las tecnologías organizadas en categorías.
- **Proyectos** — cuatro tarjetas de ejemplo con imagen, etiquetas y enlaces configurables.
- **Certificaciones y Formación** — credenciales filtrables (Todos / Certificaciones / Cursos / Inglés) con modal de evidencia PDF y descarga.
- **Acerca de mí** — subsecciones *Descripción* (texto provisional) y *Estudios* (línea de tiempo).

## Estructura

```
src/
├── assets/img/projects/   # Imágenes locales de cada proyecto (SVG)
├── components/            # Secciones y pie: TheNavbar, HeroSection, StackSection…
├── data/                  # Contenido editable separado de la presentación
│   ├── stack.ts           #   categorías y tecnologías
│   ├── projects.ts        #   proyectos (título, descripción, tags, enlaces)
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
