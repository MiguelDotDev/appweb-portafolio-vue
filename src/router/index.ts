import { createRouter, createWebHistory } from 'vue-router'

/**
 * El portafolio es una sola página (las secciones se navegan por anclas),
 * por lo que no hay vistas enrutadas. Aun así se conserva el router:
 * la ruta raíz evita el aviso "No match found" de vue-router y el comodín
 * redirige al inicio cualquier ruta desconocida.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: { render: () => null } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
