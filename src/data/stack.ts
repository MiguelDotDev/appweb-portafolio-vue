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

/** Logotipos de Simple Icons (CC0), no disponibles en Devicon. */
const claudeCodeIconPath =
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'
const openCodeIconPath = 'M22 24H2V0h20zM17 4.8H7v14.4h10z'

export const stackCategories: TechCategory[] = [
  {
    id: 'lenguajes',
    title: 'Lenguajes',
    techs: [
      { name: 'C++', icon: cplusplusIcon },
      { name: 'C#', icon: csharpIcon },
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
      { name: 'Claude Code', iconPath: claudeCodeIconPath },
      { name: 'Open Code', iconPath: openCodeIconPath },
    ],
  },
]
