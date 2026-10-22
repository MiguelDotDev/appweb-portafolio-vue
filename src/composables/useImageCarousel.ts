import { computed, ref, watch } from 'vue'
import type { ProjectImage } from '@/data/projectImages'

/**
 * Estado de un carrusel de imágenes.
 *
 * La lógica vive aquí para poder reutilizarla y comprobarla de forma
 * aislada; cada instancia mantiene su propio índice, de modo que los
 * carruseles de tarjetas distintas son independientes entre sí.
 *
 * @param images Lista de imágenes del proyecto.
 */
export function useImageCarousel(images: () => ProjectImage[]) {
  /** Índice de la imagen visible. */
  const current = ref(0)

  /** Número total de imágenes. */
  const total = computed(() => images().length)

  /** Con una sola imagen (o ninguna) no hay controles que mostrar. */
  const hasMultiple = computed(() => total.value > 1)

  /** Imagen visible actualmente. */
  const currentImage = computed(() => images()[current.value] ?? null)

  /** Si la lista cambia, se vuelve a la primera imagen para no quedar fuera de rango. */
  watch(total, (length) => {
    if (current.value >= length) current.value = 0
  })

  /** Avanza a la siguiente imagen; al final vuelve a la primera. */
  function next(): void {
    if (!hasMultiple.value) return
    current.value = (current.value + 1) % total.value
  }

  /** Retrocede a la imagen anterior; desde la primera muestra la última. */
  function previous(): void {
    if (!hasMultiple.value) return
    current.value = (current.value - 1 + total.value) % total.value
  }

  /** Salta directamente a una imagen concreta. */
  function goTo(index: number): void {
    if (index < 0 || index >= total.value) return
    current.value = index
  }

  return { current, total, hasMultiple, currentImage, next, previous, goTo }
}
