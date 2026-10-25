# Guía de contenido

Los datos del portafolio viven en `src/data/`. Los componentes de `src/components/` solo presentan esa información, así que los cambios de contenido se hacen en los archivos descritos aquí.

## src/data/projects.ts

Define los proyectos de la sección Proyectos: título, resumen, etiquetas, imágenes y enlaces.

Campos de `Project`:

- `id` (`string`): identificador estable; debe coincidir con la carpeta de imágenes.
- `title` (`string`): nombre del proyecto.
- `summary` (`string`): descripción breve.
- `tags` (`string[]`): tecnologías mostradas como etiquetas.
- `images` (`ProjectImageSpec[]`): cada entrada tiene `file` (nombre del archivo) y `alt` (texto alternativo).
- `demoUrl` (`string | null`): URL de la demo o `null`.
- `demoLabel` (`string | null`): texto del enlace de demo. Se muestra solo si `demoUrl` tiene valor y `demoLabel` no está vacío.
- `repoUrl` (`string | null`): URL del repositorio o `null`.

Entrada mínima:

```ts
{
  id: 'mi-proyecto',
  title: 'Nombre del proyecto',
  summary: 'Descripción breve del proyecto.',
  tags: ['TypeScript', 'Vue'],
  images: [{ file: '1.jpg', alt: 'Descripción de la captura' }],
  demoUrl: null,
  demoLabel: null,
  repoUrl: null,
}
```

### Imágenes de proyectos

Crea una carpeta en `src/assets/img/projects/` con el mismo valor de `id` y añade los archivos con extensión `jpg`, `jpeg`, `png`, `webp`, `avif` o `svg`.

Declara cada archivo en `images`, en el orden en que debe aparecer. El campo `file` debe coincidir con el nombre del archivo y `alt` describe su contenido.

`src/data/projectImages.ts` descubre los archivos automáticamente: los archivos no declarados se ignoran y las entradas sin archivo se omiten con un aviso en la consola.

## src/data/certifications.ts

Define las credenciales de la sección Certificaciones y Formación, la barra de filtros y las etiquetas de categoría.

Campos de `Certification`:

- `id` (`string`): identificador único.
- `nombre` (`string`): nombre de la credencial.
- `emisor` (`string`): institución, plataforma u organismo que la expide.
- `categoria` (`'certificaciones' | 'ingles'`): categoría usada por los filtros.
- `fecha` (`string`): fecha con el formato `"Mes día, año"`.
- `resultado` (`string | null`): calificación o nivel; `null` muestra «No aplica».
- `pdfUrl` (`string`): ruta pública del PDF de evidencia.
- `verifyUrl` (`string | null`): página oficial de verificación o `null`.

Entrada mínima:

```ts
{
  id: 'mi-credencial',
  nombre: 'Nombre de la credencial',
  emisor: 'Institución que la expide',
  categoria: 'certificaciones',
  fecha: 'Enero 1, 2026',
  resultado: 'Aprobado',
  pdfUrl: `${evidenciasBase}mi-credencial.pdf`,
  verifyUrl: null,
}
```

Coloca el PDF en `public/evidencias/`. Los filtros visibles se definen en `certificationFilters` y los nombres de categoría en `categoryLabels`; si añades una categoría, actualiza también `CertificationCategory`.

## src/data/about.ts

Define la descripción y los estudios de la sección Acerca de mí.

- `description` (`string[]`): cada elemento es un párrafo.
- `Study`: `institution`, `degree`, `period` y `status` (`'completada' | 'en-curso'`).

Entrada mínima:

```ts
export const description: string[] = ['Párrafo de presentación.']

export const studies: Study[] = [
  {
    institution: 'Institución',
    degree: 'Nombre del programa',
    period: '2025 - En curso',
    status: 'en-curso',
  },
]
```

## src/data/experience.ts

Define las experiencias de la sección Experiencia.

Campos de `Experience`: `organization`, `type`, `period`, `project`, `description`, `activities` (`string[]`), `technologies` (`string[]`) y `repoUrl`.

Entrada mínima:

```ts
{
  organization: 'Organización',
  type: 'Tipo de experiencia',
  period: '2025',
  project: 'Nombre del proyecto',
  description: 'Contexto de la participación.',
  activities: ['Actividad principal.'],
  technologies: ['TypeScript'],
  repoUrl: 'https://github.com/usuario/repositorio',
}
```

## src/data/stack.ts

Define las categorías y tecnologías de la sección Stack tecnológico.

- `Tech`: `name` y uno de `icon` (ruta de Devicon) o `iconPath` (SVG inline).
- `TechCategory`: `id`, `title` y `techs`.

Entrada mínima:

```ts
{
  id: 'mi-categoria',
  title: 'Mi categoría',
  techs: [
    { name: 'Vue', icon: vueIcon },
    { name: 'Herramienta', iconPath: 'M12 2h8v8z' },
  ],
}
```

Los iconos de Devicon se importan al inicio del archivo. `icon` e `iconPath` son excluyentes.

## src/data/socials.ts

Define los perfiles de la sección Inicio y del pie de página. También exporta `cvUrl`, la ruta del CV en `public/documentos/CV_Miguel_Angel_Nunez_Gomez.pdf`.

Campos de `SocialLink`: `name`, `href` e `icon` (ruta SVG de 24×24).

Entrada mínima:

```ts
{
  name: 'Nombre del perfil',
  href: 'https://github.com/usuario',
  icon: 'M12 2h8v8z',
}
```

## src/data/contact.ts

Define el correo y el teléfono usados en Inicio y en Contáctame.

Campos de `ContactInfo`: `email` (`string`) y `phone` (`string | null`).

El correo se muestra en Inicio y en Contáctame. El teléfono se muestra en Contáctame solo cuando tiene valor; el enlace `tel:` conserva el signo `+` y elimina espacios, guiones y paréntesis.

Entrada mínima:

```ts
export const contact: ContactInfo = {
  email: 'correo@dominio.com',
  phone: null,
}
```
