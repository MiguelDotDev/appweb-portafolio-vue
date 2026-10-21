<script setup lang="ts">
import { categoryLabels, hasEvidence, type Certification } from '@/data/certifications'

/**
 * Tarjeta de una credencial de la sección "Certificaciones y Formación".
 * Solo presenta datos; toda la información proviene de `@/data/certifications`.
 */
defineProps<{
  /** Credencial a mostrar. */
  certification: Certification
}>()

const emit = defineEmits<{
  /** Se solicita abrir la evidencia en el modal. */
  (e: 'view', certification: Certification): void
}>()
</script>

<template>
  <article
    class="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-xl hover:shadow-black/30 focus-within:border-teal-400/30"
  >
    <!-- Categoría -->
    <span
      class="inline-flex w-fit items-center gap-1.5 rounded-full border border-teal-400/25 bg-teal-400/10 px-2.5 py-1 font-mono text-[11px] leading-none text-teal-300"
    >
      {{ categoryLabels[certification.categoria] }}
    </span>

    <!-- Nombre -->
    <h3 class="mt-4 font-display text-base font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-teal-300 sm:text-lg">
      {{ certification.nombre }}
    </h3>

    <!-- Emisor y fecha -->
    <dl class="mt-4 space-y-2 text-sm">
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <dt class="font-mono text-[11px] uppercase tracking-wide text-slate-500">Emisor</dt>
        <dd class="min-w-0 break-words leading-relaxed text-slate-300">
          {{ certification.emisor }}
        </dd>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <dt class="font-mono text-[11px] uppercase tracking-wide text-slate-500">Fecha</dt>
        <dd class="font-mono text-xs leading-relaxed text-slate-300">{{ certification.fecha }}</dd>
      </div>
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <dt class="font-mono text-[11px] uppercase tracking-wide text-slate-500">Resultado</dt>
        <dd
          v-if="certification.resultado"
          class="min-w-0 break-words leading-relaxed font-medium text-teal-300"
        >
          {{ certification.resultado }}
        </dd>
        <dd v-else class="font-mono text-xs leading-relaxed text-slate-500">No aplica</dd>
      </div>
    </dl>

    <!-- Acción -->
    <div class="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
      <button
        v-if="hasEvidence(certification.pdfUrl)"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        :aria-label="`Ver evidencia de ${certification.nombre}`"
        @click="emit('view', certification)"
      >
        <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.7" />
        </svg>
        Ver Evidencia
      </button>

      <span v-else class="font-mono text-[11px] leading-relaxed text-slate-500">
        evidencia pendiente de cargar
      </span>
    </div>
  </article>
</template>
