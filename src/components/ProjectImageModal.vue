<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useImageCarousel } from '@/composables/useImageCarousel'
import type { ProjectImage } from '@/data/projectImages'

/**
 * Galería ampliada de un proyecto.
 *
 * Reutiliza la misma lista de imágenes que el carrusel de la tarjeta (no hay
 * una segunda lista): recibe `images` y el índice que la tarjeta está
 * mostrando, de modo que la imagen inicial coincide con la visible.
 *
 * Su índice es propio e independiente del carrusel de la tarjeta, que no se
 * toca al abrir, navegar o cerrar este modal.
 *
 * Sigue el patrón del modal de evidencias: `Teleport`, `Transition`, cierre
 * con botón y `Escape`, clic en el fondo exterior, trampa de foco, bloqueo
 * del scroll de fondo y restauración del foco.
 */
interface ProjectGallery {
  /** Imágenes del proyecto (la misma referencia que usa la tarjeta). */
  images: ProjectImage[]
  /** Nombre del proyecto, para títulos y etiquetas accesibles. */
  projectTitle: string
  /** Índice que debe mostrarse al abrir. */
  initialIndex: number
}

const props = defineProps<{
  /** Galería abierta, o `null` si el modal está cerrado. */
  gallery: ProjectGallery | null
}>()

const emit = defineEmits<{
  /** Se solicita cerrar el modal. */
  (e: 'close'): void
}>()

const { total, hasMultiple, currentImage, current, next, previous, goTo } = useImageCarousel(
  () => props.gallery?.images ?? [],
)

const isOpen = computed(() => props.gallery !== null)
const projectTitle = computed(() => props.gallery?.projectTitle ?? '')

/** Contador `n / m` de la imagen visible. */
const position = computed(() => (total.value > 0 ? `${current.value + 1} / ${total.value}` : ''))

const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

let lastFocused: HTMLElement | null = null
let previousOverflow = ''

function close(): void {
  emit('close')
}

function onKeydown(event: KeyboardEvent): void {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  // Navegación con teclado, coherente con el carrusel de la tarjeta.
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
    return
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
    return
  }

  // Trampa de foco: mantiene el teclado dentro del modal.
  if (event.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return

    const active = document.activeElement
    if (event.shiftKey && (active === first || !panelRef.value.contains(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

/** Cierra solo cuando el clic comienza y termina en el fondo exterior. */
let pressStartedOnBackdrop = false

function onBackdropPressStart(event: MouseEvent): void {
  pressStartedOnBackdrop = event.target === event.currentTarget
}

function onBackdropClick(event: MouseEvent): void {
  if (pressStartedOnBackdrop && event.target === event.currentTarget) close()
  pressStartedOnBackdrop = false
}

/**
 * Al abrir, coloca el índice en la imagen que mostraba la tarjeta.
 * Se vigila también `initialIndex` para reabrir en otra imagen sin desmontar.
 */
watch(
  () => props.gallery,
  async (gallery) => {
    if (!gallery) {
      document.body.style.overflow = previousOverflow
      lastFocused?.focus()
      lastFocused = null
      return
    }

    const index = gallery.images.length > 0 ? gallery.initialIndex : 0
    goTo(index)

    lastFocused = document.activeElement as HTMLElement | null
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButtonRef.value?.focus()
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (isOpen.value) document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="gallery"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        @mousedown="onBackdropPressStart"
        @click="onBackdropClick"
      >
        <div
          ref="panelRef"
          class="flex h-full max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/60"
        >
          <!-- Cabecera -->
          <header
            class="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-6"
          >
            <div class="min-w-0">
              <p class="font-mono text-[11px] uppercase tracking-wide text-slate-500">Galería</p>
              <h2
                id="project-modal-title"
                class="mt-0.5 truncate font-display text-base font-semibold leading-snug text-white sm:text-lg"
              >
                {{ projectTitle }}
              </h2>
            </div>

            <div class="flex shrink-0 items-center gap-3">
              <span
                v-if="hasMultiple"
                class="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300"
                aria-hidden="true"
              >
                {{ position }}
              </span>

              <button
                ref="closeButtonRef"
                type="button"
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-teal-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                aria-label="Cerrar la galería de imágenes"
                @click="close"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </header>

          <!-- Imagen ampliada (completa, sin recortes) -->
          <div class="relative flex min-h-0 flex-1 items-center justify-center bg-[#0D1322] p-3 sm:p-6">
            <img
              v-if="currentImage"
              :src="currentImage.src"
              :alt="currentImage.alt"
              decoding="async"
              class="max-h-full max-w-full object-contain"
            />

            <p
              v-else
              class="px-6 text-center font-mono text-xs text-slate-400"
              role="status"
            >
              Sin imágenes disponibles
            </p>

            <template v-if="hasMultiple">
              <button
                type="button"
                class="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 sm:left-3 sm:h-11 sm:w-11"
                :aria-label="`Imagen anterior de ${projectTitle}`"
                @click="previous"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M15 5 8 12l7 7"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 sm:right-3 sm:h-11 sm:w-11"
                :aria-label="`Imagen siguiente de ${projectTitle}`"
                @click="next"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="m9 5 7 7-7 7"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <!-- Puntos de posición -->
              <div class="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
                <button
                  v-for="(image, index) in gallery.images"
                  :key="image.src"
                  type="button"
                  class="h-1.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  :class="
                    index === current ? 'w-5 bg-teal-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  "
                  :aria-label="`Ir a la imagen ${index + 1} de ${total}: ${image.label}`"
                  :aria-current="index === current ? 'true' : undefined"
                  @click="goTo(index)"
                ></button>
              </div>
            </template>

            <!-- Aviso para lectores de pantalla -->
            <p class="sr-only" aria-live="polite">
              {{ currentImage ? `Imagen ${current + 1} de ${total}: ${currentImage.label}` : '' }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
