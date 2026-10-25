# Portafolio web de Miguel Angel Núñez Gómez

Portafolio de desarrollador fullstack construido con Vue 3 y Vite.

## Enlaces

- [Sitio en vivo](https://migueldotdev.netlify.app)
- [GitHub](https://github.com/MiguelDotDev)
- [LinkedIn](https://linkedin.com/in/miguel-angel-núñez-gómez-2a46a4431)

## Qué muestra el sitio

- **Inicio**: presentación, correo de contacto, accesos a Proyectos y Acerca de mí, redes sociales y descarga del CV.
- **Proyectos**: cuatro proyectos con carrusel de imágenes, resumen, etiquetas tecnológicas y enlaces a repositorio o demo.
- **Experiencia**: dos experiencias con periodo, actividades, tecnologías y enlace al proyecto en GitHub.
- **Stack tecnológico**: 36 tecnologías agrupadas en cinco categorías.
- **Certificaciones y Formación**: credenciales filtrables por categoría, con visor de evidencia PDF y, cuando existe, enlace de verificación.
- **Acerca de mí**: descripción, estudios y datos de contacto.

## Decisiones técnicas

- El contenido se separa de la presentación: los textos, enlaces e imágenes se declaran en `src/data/` y los componentes solo los muestran.
- El carrusel de proyectos admite flechas, teclado (←/→) y gestos táctiles; anuncia la imagen actual mediante una región `aria-live`. Los modales atrapan el foco, se cierran con Escape y restauran el foco al salir.
- Las animaciones de AOS se desactivan cuando el sistema pide movimiento reducido, y el contenido permanece visible si AOS no se inicializa.
- `pnpm build` ejecuta la verificación de tipos (`vue-tsc --build`) y el empaquetado de Vite en paralelo; si la verificación falla, el comando termina con error.
- El sitio es estático: no hay backend ni llamadas a una API propia. Vite genera HTML, CSS, JavaScript y recursos en `dist/`.

## Stack tecnológico

- Vue `^3.5.40`
- Vue Router `^5.2.0`
- Vite `^8.1.5`
- TypeScript `~6.0.0`
- Tailwind CSS `^4.3.3` y `@tailwindcss/vite` `^4.3.3`
- AOS `3.0.0-beta.6`
- Devicon `^2.17.0`
- vue-tsc `^3.3.7`

## Ejecutar en local

Requiere Node.js `^22.18.0 || >=24.12.0`, según el campo `engines`, y pnpm (lockfile 9.0).

| Comando | Descripción |
| --- | --- |
| `pnpm install` | Instala las dependencias declaradas en `package.json`. |
| `pnpm dev` | Inicia el servidor de desarrollo de Vite. |
| `pnpm build` | Verifica los tipos y genera la compilación en `dist/`. |
| `pnpm preview` | Sirve localmente el contenido de `dist/`. |

## Estructura del proyecto

```text
.
├── docs/
│   └── contenido.md
├── public/                 # archivos estáticos (favicon, CV, evidencias)
├── src/
│   ├── assets/             # imágenes del sitio
│   ├── components/         # secciones, tarjetas y modales
│   ├── composables/        # lógica reutilizable del carrusel
│   ├── data/               # contenido editable
│   ├── router/             # configuración de vue-router
│   ├── App.vue
│   └── main.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Editar el contenido

- `src/data/projects.ts` — proyectos, etiquetas, enlaces e imágenes.
- `src/data/certifications.ts` — credenciales, fechas y evidencias.
- `src/data/about.ts` — descripción y estudios.
- `src/data/experience.ts` — experiencia profesional.
- `src/data/stack.ts` — categorías y tecnologías.
- `src/data/socials.ts` — perfiles y ruta del CV.
- `src/data/contact.ts` — correo y teléfono.

Las imágenes de cada proyecto se guardan en `src/assets/img/projects/<id>/` y se declaran en `projects.ts`.
La guía con campos y entradas mínimas está en [docs/contenido.md](docs/contenido.md).

## Despliegue

El sitio es estático. `pnpm build` genera la carpeta `dist/`, y esa carpeta es la que se sirve en el alojamiento. La variable `VITE_SITE_URL` de `.env` define la URL pública usada por `index.html` en el enlace canónico y en las etiquetas Open Graph y Twitter. Si cambia el dominio, actualiza ese valor y vuelve a compilar.

## Licencia

Todos los derechos reservados.

## Contacto

Correo: [miguel.nunez.dev@gmail.com](mailto:miguel.nunez.dev@gmail.com)
