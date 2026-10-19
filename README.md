# Portafolio Web Vue + Vite
Este es un proyecto web estatico desarrollado con Vue y Vite, es mi portafolio web (Miguel Angel Núñez Gómez)

## Secciones

- **Inicio** — presentación, accesos a proyectos y "Acerca de mí", redes y descarga del CV.
- **Stack tecnológico** — todas las tecnologías organizadas en categorías.
- **Proyectos** — cuatro tarjetas de ejemplo con imagen, etiquetas y enlaces configurables.
- **Acerca de mí** — subsecciones *Descripción* (texto provisional) y *Estudios* (línea de tiempo).

## Estructura

```
src/
├── assets/img/projects/   # Imágenes locales de cada proyecto (SVG)
├── components/            # Secciones y pie: TheNavbar, HeroSection, StackSection…
├── data/                  # Contenido editable separado de la presentación
│   ├── stack.ts           #   categorías y tecnologías
│   ├── projects.ts        #   proyectos (título, descripción, tags, enlaces)
│   ├── about.ts           #   descripción y estudios
│   └── socials.ts         #   redes sociales y ruta del CV
├── App.vue                # Composición, paleta (@theme) y arranque de AOS
└── main.ts
```

## Personalizar el contenido

- **Añadir o quitar proyectos:** editar `src/data/projects.ts`. Si `demoUrl` o `repoUrl` son `null`, la tarjeta no muestra enlace clicable.
- **Añadir tecnologías:** editar `src/data/stack.ts` (iconos de la colección [Devicon](https://github.com/devicons/devicon)).
- **Estudios y descripción:** editar `src/data/about.ts`.
- La animación de scroll usa **AOS** y se inicializa una sola vez en `src/App.vue`; respeta `prefers-reduced-motion`.

## Desarrollo

```sh
pnpm install
pnpm dev       # servidor de desarrollo
pnpm build     # type-check (vue-tsc) + build de producción
pnpm preview   # previsualizar el build
```
