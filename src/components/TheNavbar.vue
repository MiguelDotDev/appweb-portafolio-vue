<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface NavLink {
  /** Id de la sección destino (debe coincidir con el `id` del `<section>`). */
  id: string
  label: string
  href?: string
  children?: NavChild[]
}

interface NavChild {
  id: string
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'stack', label: 'Stack tecnológico' },
  { id: 'certificaciones', label: 'Certificaciones' },
  {
    id: 'acerca',
    label: 'Acerca de mí',
    children: [
      { id: 'acerca-descripcion', label: 'Biografía', href: '#acerca-descripcion' },
      { id: 'acerca-estudios', label: 'Estudios', href: '#acerca-estudios' },
      { id: 'acerca-contacto', label: 'Contáctame', href: '#acerca-contacto' },
    ],
  },
]

const menuOpen = ref(false)
const aboutDropdownOpen = ref(false)
const aboutDropdownOpenMobile = ref(false)
const activeId = ref<string>('inicio')

function toggleMenu(): void {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) {
    aboutDropdownOpenMobile.value = false
  }
}

function closeMenu(): void {
  menuOpen.value = false
  aboutDropdownOpenMobile.value = false
}

function toggleAboutDropdown(): void {
  aboutDropdownOpen.value = !aboutDropdownOpen.value
}

function closeAboutDropdown(): void {
  aboutDropdownOpen.value = false
}

function toggleAboutDropdownMobile(): void {
  aboutDropdownOpenMobile.value = !aboutDropdownOpenMobile.value
}

function closeAboutDropdownMobile(): void {
  aboutDropdownOpenMobile.value = false
}

function navigateAndClose(href: string): void {
  closeAboutDropdown()
  closeAboutDropdownMobile()
  closeMenu()
  // Dejar que el enlace nativo gestione el desplazamiento
  window.location.hash = href
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    closeMenu()
    closeAboutDropdown()
    closeAboutDropdownMobile()
  }
}

function onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null
  if (!target) return
  if (!target.closest('.about-dropdown-desktop')) {
    closeAboutDropdown()
  }
}

/**
 * Secciones observadas por el scrollspy, en el orden en que aparecen.
 * Incluye la sección padre y sus subsecciones (`acerca-contacto` incluida).
 */
const scrollSpyIds = navLinks.flatMap((link) =>
  link.children ? [link.id, ...link.children.map((child) => child.id)] : [link.id],
)

/**
 * Resalta el enlace de la última sección cuyo inicio ya cruzó el umbral
 * superior. Al llegar al final de la página marca el último destino.
 */
function updateActiveSection(): void {
  const threshold = window.innerHeight * 0.35
  let current = scrollSpyIds[0] ?? 'inicio'

  for (const id of scrollSpyIds) {
    const section = document.getElementById(id)
    if (!section) continue
    if (section.getBoundingClientRect().top <= threshold) current = id
  }

  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) {
    const last = scrollSpyIds[scrollSpyIds.length - 1]
    if (last) current = last
  }

  activeId.value = current
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('resize', updateActiveSection)
  document.addEventListener('click', onDocumentClick)

  updateActiveSection()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveSection)
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/85 shadow-lg shadow-black/20 backdrop-blur-md"
  >
    <nav
      aria-label="Navegación principal"
      class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
    >
      <!-- Marca -->
      <a
        href="#inicio"
        class="flex shrink-0 items-center rounded-md font-mono text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
      >
        <span class="text-teal-400">&lt;</span>Miguel<span class="text-teal-400">.dev</span
        ><span class="text-teal-400">/&gt;</span>
      </a>

      <!-- Enlaces (escritorio) -->
      <ul class="hidden items-center gap-1 md:flex" role="list">
        <li v-for="link in navLinks" :key="link.id">
          <template v-if="link.children">
            <div class="about-dropdown-desktop relative">
              <button
                type="button"
                class="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                :class="
                  activeId === link.id || link.children.some((child) => activeId === child.id)
                    ? 'bg-teal-400/10 font-semibold text-teal-300'
                    : 'font-medium text-slate-400 hover:bg-white/5 hover:text-white'
                "
                :aria-expanded="aboutDropdownOpen"
                aria-haspopup="menu"
                @click.stop="toggleAboutDropdown"
              >
                {{ link.label }}
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 transition-transform duration-200"
                  :class="aboutDropdownOpen ? 'rotate-180' : ''"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="aboutDropdownOpen"
                role="menu"
                class="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-white/10 bg-ink/95 shadow-lg shadow-black/40 backdrop-blur-md"
              >
                <ul class="flex flex-col py-1" role="none">
                  <li v-for="child in link.children" :key="child.id" role="none">
                    <a
                      :href="child.href"
                      role="menuitem"
                      class="block px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                      :class="
                        activeId === child.id
                          ? 'bg-teal-400/10 font-semibold text-teal-300'
                          : 'font-medium text-slate-400 hover:bg-white/5 hover:text-white'
                      "
                      @click.prevent="navigateAndClose(child.href)"
                    >
                      {{ child.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <a
              :href="`#${link.id}`"
              :aria-current="activeId === link.id ? 'true' : undefined"
              class="relative block rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :class="
                activeId === link.id
                  ? 'bg-teal-400/10 font-semibold text-teal-300'
                  : 'font-medium text-slate-400 hover:bg-white/5 hover:text-white'
              "
            >
              {{ link.label }}
            </a>
          </template>
        </li>
      </ul>

      <!-- Disponibilidad (pantallas grandes) -->
      <span
        class="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400 lg:flex"
      >
        <span class="relative flex h-1.5 w-1.5">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        </span>
        disponible para proyectos
      </span>

      <!-- Botón de menú (móvil) -->
      <button
        type="button"
        class="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:border-teal-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="nav-menu"
        @click="toggleMenu"
      >
        <span class="sr-only">{{ menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación' }}</span>
        <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true" fill="none">
          <path
            v-if="!menuOpen"
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            v-else
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </nav>

    <!-- Menú desplegable (móvil) -->
    <div
      id="nav-menu"
      v-show="menuOpen"
      class="border-t border-white/5 bg-ink/95 backdrop-blur-md md:hidden"
    >
      <ul class="mx-auto max-w-6xl space-y-1 px-4 py-4" role="list">
        <li v-for="link in navLinks" :key="link.id">
          <template v-if="link.children">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :class="
                activeId === link.id || link.children.some((child) => activeId === child.id)
                  ? 'bg-teal-400/10 font-semibold text-teal-300'
                  : 'font-medium text-slate-300 hover:bg-white/5 hover:text-white'
              "
              :aria-expanded="aboutDropdownOpenMobile"
              aria-controls="about-mobile-menu"
              @click="toggleAboutDropdownMobile"
            >
              {{ link.label }}
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4 transition-transform duration-200"
                :class="aboutDropdownOpenMobile ? 'rotate-180' : ''"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <ul
              id="about-mobile-menu"
              v-show="aboutDropdownOpenMobile"
              class="mt-1 space-y-1 pl-4"
              role="list"
            >
              <li v-for="child in link.children" :key="child.id">
                <a
                  :href="child.href"
                  class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  :class="
                    activeId === child.id
                      ? 'bg-teal-400/10 font-semibold text-teal-300'
                      : 'font-medium text-slate-300 hover:bg-white/5 hover:text-white'
                  "
                  @click.prevent="navigateAndClose(child.href)"
                >
                  {{ child.label }}
                  <span aria-hidden="true" class="font-mono text-xs text-slate-500">#</span>
                </a>
              </li>
            </ul>
          </template>
          <template v-else>
            <a
              :href="`#${link.id}`"
              :aria-current="activeId === link.id ? 'true' : undefined"
              class="flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :class="
                activeId === link.id
                  ? 'bg-teal-400/10 font-semibold text-teal-300'
                  : 'font-medium text-slate-300 hover:bg-white/5 hover:text-white'
              "
              @click="closeMenu"
            >
              {{ link.label }}
              <span aria-hidden="true" class="font-mono text-xs text-slate-500">#</span>
            </a>
          </template>
        </li>
      </ul>
      <div class="px-4 pb-4 pt-1">
        <span
          class="flex w-fit items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          disponible para proyectos
        </span>
      </div>
    </div>
  </header>
</template>
