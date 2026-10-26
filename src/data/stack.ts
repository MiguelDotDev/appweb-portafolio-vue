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
import vscodeIcon from 'devicon/icons/vscode/vscode-original.svg'
import visualstudioIcon from 'devicon/icons/visualstudio/visualstudio-original.svg'
import archlinuxIcon from 'devicon/icons/archlinux/archlinux-original.svg'

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

export const stackCategories: TechCategory[] = [
  {
    id: 'lenguajes',
    title: 'Lenguajes',
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
    title: 'Frontend',
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
    id: 'backend-datos',
    title: 'Backend y bases de datos',
    techs: [
      { name: 'ASP.NET Core / Framework', icon: dotnetIcon },
      { name: 'Flask', icon: flaskIcon },
      { name: 'Microsoft SQL Server (MSSQL)', icon: mssqlIcon },
      { name: 'MySQL', icon: mysqlIcon },
      { name: 'MongoDB', icon: mongodbIcon },
      { name: 'Redis', icon: redisIcon },
      { name: 'Firebase', icon: firebaseIcon },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps y despliegue',
    techs: [
      { name: 'Docker', icon: dockerIcon },
      { name: 'Netlify', icon: netlifyIcon },
      { name: 'Azure', icon: azureIcon },
      { name: 'GitHub Actions', icon: githubActionsIcon },
    ],
  },
  {
    id: 'herramientas-entorno',
    title: 'Herramientas y entorno de desarrollo',
    techs: [
      { name: 'Visual Studio Code', icon: vscodeIcon },
      { name: 'Visual Studio', icon: visualstudioIcon },
      { name: 'GitHub', icon: githubIcon },
      { name: 'Postman', icon: postmanIcon },
      { name: 'Figma', icon: figmaIcon },
      { name: 'Arch Linux', icon: archlinuxIcon },
    ],
  },
]
