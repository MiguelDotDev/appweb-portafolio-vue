<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { hasEvidence, hasVerifyUrl, type Certification } from '@/data/certifications'

/**
 * Modal de evidencias PDF.
 * Usa el visor PDF nativo del navegador (`iframe`), sin librerías externas.
 * Gestiona el foco, el bloqueo del scroll de fondo y el cierre por
 * botón, tecla Escape y clic en el fondo exterior.
 */
const props = defineProps<{
  /** Credencial cuya evidencia se muestra, o `null` si el modal está cerrado. */
  certification: Certification | null
}>()

const emit = defineEmits<{
  /** Se solicita cerrar el modal. */
  (e: 'close'): void
}>()

const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

/** Indica si el visor integrado ha terminado de cargar el PDF. */
const loaded = ref(false)
/** Indica si el visor integrado no pudo mostrar el documento. */
const failed = ref(false)

const isOpen = computed(() => props.certification !== null)
const pdfAvailable = computed(() => hasEvidence(props.certification?.pdfUrl))

/** Nombre de archivo descriptivo para la descarga. */
const downloadName = computed(() => {
  const certification = props.certification
  if (!certification) return 'evidencia.pdf'
  return `evidencia-${certification.id}.pdf`
})

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

  // Trampa de foco: mantiene el teclado dentro del modal.
  if (event.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
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

watch(isOpen, async (open) => {
  if (open) {
    loaded.value = false
    failed.value = false
    lastFocused = document.activeElement as HTMLElement | null
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    document.body.style.overflow = previousOverflow
    lastFocused?.focus()
    lastFocused = null
  }
})

// Restablecer el estado del visor al cambiar de credencial con el modal abierto.
watch(
  () => props.certification?.id,
  () => {
    loaded.value = false
    failed.value = false
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
        v-if="certification"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        @mousedown="onBackdropPressStart"
        @click="onBackdropClick"
      >
        <div
          ref="panelRef"
          class="flex h-full max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/60"
        >
          <!-- Cabecera -->
          <header
            class="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-6"
          >
            <div class="min-w-0">
              <p class="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                Evidencia
              </p>
              <h2
                id="cert-modal-title"
                class="mt-0.5 font-display text-base font-semibold leading-snug text-white sm:text-lg"
              >
                {{ certification.nombre }}
              </h2>
            </div>

            <button
              ref="closeButtonRef"
              type="button"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-teal-400/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              aria-label="Cerrar la vista de evidencia"
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
          </header>

          <!-- Visor -->
          <div class="relative min-h-0 flex-1 bg-[#0D1322]">
            <template v-if="pdfAvailable">
              <!-- Estado de carga -->
              <p
                v-if="!loaded && !failed"
                class="absolute inset-0 flex items-center justify-center px-6 text-center font-mono text-xs text-slate-400"
                role="status"
              >
                Cargando evidencia…
              </p>

              <iframe
                :src="certification.pdfUrl"
                :title="`Visor de la evidencia: ${certification.nombre}`"
                class="h-full w-full"
                @load="loaded = true"
                @error="failed = true"
              ></iframe>

              <!-- Alternativa si el visor integrado no está disponible -->
              <div
                v-if="failed"
                class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0D1322] px-6 text-center"
              >
                <p class="max-w-sm text-sm leading-relaxed text-slate-300">
                  Tu navegador no puede mostrar el PDF integrado. Puedes abrirlo en otra pestaña o
                  descargarlo con los botones de abajo.
                </p>
              </div>
            </template>

            <!-- Evidencia todavía no disponible -->
            <div
              v-else
              class="flex h-full flex-col items-center justify-center gap-3 px-6 text-center"
            >
              <p class="max-w-sm text-sm leading-relaxed text-slate-300">
                La evidencia de esta credencial todavía no está disponible. Añade el archivo PDF en
                <code class="font-mono text-teal-300">public/evidencias/</code> y registra su ruta
                en <code class="font-mono text-teal-300">pdfUrl</code>.
              </p>
            </div>
          </div>

          <!-- Acciones -->
          <footer
            class="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-white/10 px-4 py-3.5 sm:px-6"
          >
            <a
              v-if="hasVerifyUrl(certification.verifyUrl)"
              :href="certification.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :aria-label="`Verificar el certificado de ${certification.nombre} en la página oficial (se abre en una pestaña nueva)`"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Verificar certificado
            </a>

            <a
              v-if="pdfAvailable"
              :href="certification.pdfUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Abrir en otra pestaña
            </a>

            <a
              v-if="pdfAvailable"
              :href="certification.pdfUrl"
              :download="downloadName"
              class="inline-flex items-center gap-1.5 rounded-lg bg-teal-400 px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M12 3v11m0 0-4-4m4 4 4-4M4 21h16"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Descargar PDF
            </a>

            <span v-else class="font-mono text-[11px] text-slate-500">
              evidencia pendiente de cargar
            </span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
