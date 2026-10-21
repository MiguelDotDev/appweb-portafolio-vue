<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import CertificationCard from '@/components/CertificationCard.vue'
import CertificationModal from '@/components/CertificationModal.vue'
import {
  certifications,
  certificationFilters,
  type Certification,
  type CertificationFilter,
} from '@/data/certifications'

/**
 * Sección "Certificaciones y Formación".
 * Los datos se centralizan en `@/data/certifications`; aquí solo se define
 * el filtrado y la interacción con el modal de evidencias.
 */
type ActiveFilter = CertificationFilter['value']

const activeFilter = ref<ActiveFilter>('todos')
const selected = ref<Certification | null>(null)

/** El filtrado usa la categoría de los datos, no el texto visible. */
const filtered = computed<Certification[]>(() =>
  activeFilter.value === 'todos'
    ? certifications
    : certifications.filter((item) => item.categoria === activeFilter.value),
)

function selectFilter(value: ActiveFilter): void {
  activeFilter.value = value
}

function openEvidence(certification: Certification): void {
  // Evita reabrir/reasignar el modal por aperturas dobles.
  if (selected.value?.id === certification.id) return
  selected.value = certification
}

function closeEvidence(): void {
  selected.value = null
}
</script>

<template>
  <section
    id="certificaciones"
    aria-labelledby="certificaciones-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading
      id="certificaciones-title"
      eyebrow="$ cat credenciales.json"
      title="Certificaciones y Formación"
    />

    <p class="-mt-6 mb-8 max-w-2xl text-[15px] leading-relaxed text-slate-400" data-aos="fade-up">
      Credenciales, cursos y evaluaciones que respaldan mis conocimientos y mi formación continua.
    </p>

    <!-- Barra de filtros -->
    <div
      class="mb-8 flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar credenciales por categoría"
      data-aos="fade-up"
    >
      <button
        v-for="filter in certificationFilters"
        :key="filter.value"
        type="button"
        class="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        :class="
          activeFilter === filter.value
            ? 'border-teal-400/50 bg-teal-400/15 text-teal-200'
            : 'border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/30 hover:text-white'
        "
        :aria-pressed="activeFilter === filter.value"
        @click="selectFilter(filter.value)"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Cuadrícula de credenciales -->
    <div v-if="filtered.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CertificationCard
        v-for="(certification, index) in filtered"
        :key="certification.id"
        :certification="certification"
        data-aos="fade-up"
        :data-aos-delay="index * 70"
        @view="openEvidence"
      />
    </div>

    <!-- Sin resultados para el filtro activo -->
    <p
      v-else
      class="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center font-mono text-sm text-slate-400"
      role="status"
    >
      No hay credenciales registradas en esta categoría.
    </p>

    <!-- Modal de evidencias -->
    <CertificationModal :certification="selected" @close="closeEvidence" />
  </section>
</template>
