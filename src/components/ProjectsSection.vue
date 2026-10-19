<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/data/projects'

/**
 * Sección de proyectos.
 * Los datos (incluidos los enlaces) se centralizan en `@/data/projects`;
 * aquí solo se define la presentación.
 */
</script>

<template>
  <section
    id="proyectos"
    aria-labelledby="proyectos-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading id="proyectos-title" eyebrow="$ ls ./proyectos" title="Proyectos" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="(project, index) in projects"
        :key="project.title"
        data-aos="fade-up"
        :data-aos-delay="index * 80"
        class="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-xl hover:shadow-black/30"
      >
        <!-- Imagen -->
        <div class="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0D1322]">
          <img
            :src="project.image"
            :alt="project.imageAlt"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <!-- Contenido -->
        <div class="flex flex-1 flex-col p-5">
          <h3 class="font-display text-base font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-teal-300">
            {{ project.title }}
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-slate-400">
            {{ project.summary }}
          </p>

          <ul class="mt-4 mb-5 flex flex-wrap gap-2" role="list">
            <li
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] leading-none text-slate-400"
            >
              {{ tag }}
            </li>
          </ul>

          <!-- Enlaces (solo se muestran los que existan realmente) -->
          <div class="mt-auto flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 transition-colors hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Ver demo
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>

            <a
              v-if="project.repoUrl"
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Repositorio
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>

            <span
              v-if="!project.demoUrl && !project.repoUrl"
              class="font-mono text-[11px] leading-relaxed text-slate-400"
            >
              enlaces de demostración sin configurar
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
