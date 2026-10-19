<script setup lang="ts">
/**
 * Encabezado reutilizable de cada sección:
 * etiqueta monoespaciada (eco del estilo `$ whoami` del hero) + título.
 */
defineProps<{
  /** Etiqueta corta mostrada en la píldora superior. */
  eyebrow: string
  /** Título de la sección (h2). */
  title: string
  /** Id del h2, para vincularla con `aria-labelledby` de la sección. */
  id: string
}>()
</script>

<template>
  <div class="mb-10 sm:mb-14" data-aos="fade-up">
    <p
      class="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 font-mono text-xs text-teal-300"
    >
      {{ eyebrow }}
    </p>
    <h2 :id="id" class="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
      {{ title }}
    </h2>
    <div class="mt-5 h-px w-20 bg-gradient-to-r from-teal-400 to-transparent"></div>
  </div>
</template>
