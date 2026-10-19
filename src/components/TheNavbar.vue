<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface NavLink {
  /** Id de la sección destino (debe coincidir con el `id` del `<section>`). */
  id: string
  label: string
}

const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'stack', label: 'Stack tecnológico' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'acerca', label: 'Acerca de mí' },
]

const menuOpen = ref(false)
const activeId = ref<string>('inicio')

function toggleMenu(): void {
  menuOpen.value = !menuOpen.value
}

function closeMenu(): void {
  menuOpen.value = false
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeMenu()
}

/** Resalta el enlace de la sección visible en la franja central de la pantalla. */
let observer: IntersectionObserver | undefined

function onEntries(entries: IntersectionObserverEntry[]): void {
  const visible = entries.find((entry) => entry.isIntersecting)
  if (visible && visible.target.id) activeId.value = visible.target.id
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  observer = new IntersectionObserver(onEntries, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  })
  navLinks.forEach((link) => {
    const section = document.getElementById(link.id)
    if (section) observer?.observe(section)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  observer?.disconnect()
  observer = undefined
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
