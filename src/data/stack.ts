/**
 * Stack tecnológico.
 *
 * Fuente de referencia: `stackTecnologico.txt`.
 * Los iconos provienen de la colección Devicon (MIT) instalada como dependencia,
 * con la excepción de Render, cuyo logotipo se incluye inline (simple-icons, CC0).
 *
 * Para añadir o quitar una tecnología basta con editar esta lista:
 * los estilos y la cuadrícula se adaptan automáticamente.
 */

import cplusplusIcon from 'devicon/icons/cplusplus/cplusplus-original.svg'
import csharpIcon from 'devicon/icons/csharp/csharp-original.svg'
import goIcon from 'devicon/icons/go/go-original.svg'
import javascriptIcon from 'devicon/icons/javascript/javascript-original.svg'
import phpIcon from 'devicon/icons/php/php-original.svg'
import javaIcon from 'devicon/icons/java/java-original.svg'
import pythonIcon from 'devicon/icons/python/python-original.svg'
import typescriptIcon from 'devicon/icons/typescript/typescript-original.svg'
import cssIcon from 'devicon/icons/css3/css3-original.svg'
import sassIcon from 'devicon/icons/sass/sass-original.svg'
import bootstrapIcon from 'devicon/icons/bootstrap/bootstrap-original.svg'
import vueIcon from 'devicon/icons/vuejs/vuejs-original.svg'
import jqueryIcon from 'devicon/icons/jquery/jquery-original.svg'
import tailwindIcon from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import dotnetIcon from 'devicon/icons/dotnetcore/dotnetcore-original.svg'
import flaskIcon from 'devicon/icons/flask/flask-original.svg'
import springIcon from 'devicon/icons/spring/spring-original.svg'
import mssqlIcon from 'devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg'
import mysqlIcon from 'devicon/icons/mysql/mysql-original.svg'
import mongodbIcon from 'devicon/icons/mongodb/mongodb-original.svg'
import redisIcon from 'devicon/icons/redis/redis-original.svg'
import firebaseIcon from 'devicon/icons/firebase/firebase-original.svg'
import dockerIcon from 'devicon/icons/docker/docker-original.svg'
import netlifyIcon from 'devicon/icons/netlify/netlify-original.svg'
import azureIcon from 'devicon/icons/azure/azure-original.svg'
import githubActionsIcon from 'devicon/icons/githubactions/githubactions-original.svg'
import githubIcon from 'devicon/icons/github/github-original.svg'
import postmanIcon from 'devicon/icons/postman/postman-original.svg'
import figmaIcon from 'devicon/icons/figma/figma-original.svg'
import linuxIcon from 'devicon/icons/linux/linux-original.svg'

export interface Tech {
  /** Nombre oficial de la tecnología. */
  name: string
  /** Ruta del archivo de icono (Devicon). Mutuamente excluyente con `iconPath`. */
  icon?: string
  /** Ruta SVG inline (para logotipos no disponibles en Devicon). */
  iconPath?: string
}

export interface TechCategory {
  /** Identificador estable para anclas/keys. */
  id: string
  /** Título visible de la categoría. */
  title: string
  techs: Tech[]
}

/** Logotipo de Render (simple-icons, licencia CC0). */
const renderIconPath =
  'M18.263.007c-3.121-.147-5.744 2.109-6.192 5.082-.018.138-.045.272-.067.405-.696 3.703-3.936 6.507-7.827 6.507-1.388 0-2.691-.356-3.825-.979a.2024.2024 0 0 0-.302.178V24H12v-8.999c0-1.656 1.338-3 2.987-3h2.988c3.382 0 6.103-2.817 5.97-6.244-.12-3.084-2.61-5.603-5.682-5.75'

export const stackCategories: TechCategory[] = [
  {
    id: 'lenguajes',
    title: 'Lenguajes de programación',
    techs: [
      { name: 'C++', icon: cplusplusIcon },
      { name: 'C#', icon: csharpIcon },
      { name: 'Go', icon: goIcon },
      { name: 'JavaScript', icon: javascriptIcon },
      { name: 'PHP', icon: phpIcon },
      { name: 'Java', icon: javaIcon },
      { name: 'Python', icon: pythonIcon },
      { name: 'TypeScript', icon: typescriptIcon },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend y estilos',
    techs: [
      { name: 'CSS', icon: cssIcon },
      { name: 'Sass', icon: sassIcon },
      { name: 'Bootstrap', icon: bootstrapIcon },
      { name: 'Vue', icon: vueIcon },
      { name: 'jQuery', icon: jqueryIcon },
      { name: 'Tailwind CSS', icon: tailwindIcon },
    ],
  },
  {
    id: 'backend',
    title: 'Backend y frameworks',
    techs: [
      { name: 'ASP.NET Core', icon: dotnetIcon },
      { name: 'Flask', icon: flaskIcon },
      { name: 'Spring Boot', icon: springIcon },
    ],
  },
  {
    id: 'datos',
    title: 'Bases de datos y servicios de datos',
    techs: [
      { name: 'Microsoft SQL Server (MSSQL)', icon: mssqlIcon },
      { name: 'MySQL', icon: mysqlIcon },
      { name: 'MongoDB', icon: mongodbIcon },
      { name: 'Redis', icon: redisIcon },
      { name: 'Firebase', icon: firebaseIcon },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps, despliegue y hosting',
    techs: [
      { name: 'Docker', icon: dockerIcon },
      { name: 'Netlify', icon: netlifyIcon },
      { name: 'Azure', icon: azureIcon },
      { name: 'Render', iconPath: renderIconPath },
      { name: 'GitHub Actions', icon: githubActionsIcon },
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas de desarrollo',
    techs: [
      { name: 'GitHub', icon: githubIcon },
      { name: 'Postman', icon: postmanIcon },
      { name: 'Figma', icon: figmaIcon },
      { name: 'Linux', icon: linuxIcon },
    ],
  },
]
