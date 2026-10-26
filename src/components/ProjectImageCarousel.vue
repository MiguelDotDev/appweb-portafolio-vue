<script setup lang="ts">
import { useImageCarousel } from '@/composables/useImageCarousel'
import type { ProjectImage } from '@/data/projectImages'

/**
 * Carrusel de imágenes reutilizable.
 *
 * Cada instancia administra su propio estado (índice activo), por lo que los
 * carruseles de tarjetas diferentes son completamente independientes.
 *
 * Controles: flechas anterior/siguiente, puntos de posición, teclado
 * (←/→) y gestos de deslizamiento en pantallas táctiles.
 */
const props = defineProps<{
  /** Lista de imágenes del proyecto. */
  images: ProjectImage[]
  /** Nombre del proyecto, usado en las etiquetas accesibles. */
  projectTitle: string
}>()

const emit = defineEmits<{
  /** Se solicita ampliar la imagen visible (índice actual). */
  (e: 'open', index: number): void
}>()

const { current, total, hasMultiple, currentImage, next, previous, goTo } = useImageCarousel(
  () => props.images,
)

/** Evita abrir la galería justo después de un gesto de deslizamiento. */
let suppressClick = false

/** Abre la galería en la imagen visible actualmente. */
function openCurrent(): void {
  if (!currentImage.value) return
  emit('open', current.value)
}

/** Abre la galería al pulsar la imagen (nunca desde los controles). */
function onTrackClick(): void {
  if (suppressClick) {
    suppressClick = false
    return
  }
  openCurrent()
}

/* --- Gesto de deslizamiento (táctil) --- */
let touchStartX = 0
let touchStartY = 0

function onTouchStart(event: TouchEvent): void {
  const touch = event.changedTouches[0]
  if (!touch) return
  suppressClick = false
  touchStartX = touch.clientX
  touchStartY = touch.clientY
}

function onTouchEnd(event: TouchEvent): void {
  if (!hasMultiple.value) return
  const touch = event.changedTouches[0]
  if (!touch) return
  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY
  // Solo cuenta como deslizamiento horizontal.
  if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return
  // Tras un deslizamiento no debe abrirse la galería.
  suppressClick = true
  if (deltaX < 0) next()
  else previous()
}
</script>

<template>
  <div
    class="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#0D1322]"
    role="group"
    aria-roledescription="carrusel"
    :aria-label="`Imágenes de ${projectTitle}`"
    tabindex="0"
    @keydown.left.prevent="previous"
    @keydown.right.prevent="next"
    @keydown.enter.prevent.self="openCurrent"
    @keydown.space.prevent.self="openCurrent"
  >
    <!-- Sin imágenes: estado de respaldo discreto -->
    <div
      v-if="!currentImage"
      class="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#0D1322] text-slate-500"
    >
      <svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="1.5" />
        <path
          d="m5 16 4-4 3 3 2-2 5 5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      </svg>
      <span class="font-mono text-[11px]">Sin imágenes disponibles</span>
    </div>

    <!-- Pista de imágenes (un clic amplía la imagen visible) -->
    <div
      v-else
      class="flex h-full w-full cursor-zoom-in transition-transform duration-500 ease-out motion-reduce:transition-none"
      :style="{ transform: `translateX(-${current * 100}%)` }"
      @click="onTrackClick"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div
        v-for="(image, index) in images"
        :key="image.src"
        class="h-full w-full shrink-0"
        :aria-hidden="index !== current"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-contain"
        />
      </div>
    </div>

    <!-- Controles -->
    <template v-if="hasMultiple">
      <button
        type="button"
        class="absolute top-1/2 left-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
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
        class="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
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
          v-for="(image, index) in images"
          :key="image.src"
          type="button"
          class="h-1.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          :class="index === current ? 'w-5 bg-teal-400' : 'w-1.5 bg-white/40 hover:bg-white/70'"
          :aria-label="`Ver imagen ${index + 1} de ${total}`"
          :aria-current="index === current ? 'true' : undefined"
          @click="goTo(index)"
        ></button>
      </div>
    </template>

    <!-- Contador discreto -->
    <span
      v-if="hasMultiple"
      class="absolute top-2 right-2 rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] text-white/80 backdrop-blur-sm"
      aria-hidden="true"
    >
      {{ current + 1 }}/{{ total }}
    </span>

    <!-- Aviso para lectores de pantalla -->
    <p class="sr-only" aria-live="polite">
      {{ currentImage ? `Imagen ${current + 1} de ${total}. ${currentImage.alt}` : '' }}
    </p>
  </div>
</template>
