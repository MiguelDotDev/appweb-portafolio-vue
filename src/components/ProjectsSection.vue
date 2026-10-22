<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectImageCarousel from '@/components/ProjectImageCarousel.vue'
import { projects } from '@/data/projects'
import { getProjectImages } from '@/data/projectImages'
import githubIcon from 'devicon/icons/github/github-original.svg'

/**
 * Sección de proyectos.
 * Los datos (incluidos los enlaces) se centralizan en `@/data/projects` y las
 * imágenes se descubren automáticamente en `@/data/projectImages`;
 * aquí solo se define la presentación.
 */
const projectCards = computed(() =>
  projects.map((project) => ({
    project,
    images: getProjectImages(project.id).map((image) => ({
      ...image,
      // El texto alternativo base del proyecto se completa con la etiqueta
      // de cada imagen, de modo que nunca se repite un texto genérico.
      alt: `${image.label} — ${project.imageAlt}`,
    })),
  })),
)
</script>

<template>
  <section
    id="proyectos"
    aria-labelledby="proyectos-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading id="proyectos-title" eyebrow="$ ls ./proyectos" title="Proyectos" />

    <!-- Cuadrícula responsive: 1 columna en móvil, 2 columnas a partir de md -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <article
        v-for="(card, index) in projectCards"
        :key="card.project.id"
        data-aos="fade-up"
        :data-aos-delay="(index % 2) * 80"
        class="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-xl hover:shadow-black/30"
      >
        <!-- Carrusel de imágenes del proyecto -->
        <ProjectImageCarousel
          :images="card.images"
          :project-title="card.project.title"
        />

        <!-- Contenido -->
        <div class="flex flex-1 flex-col p-5">
          <h3 class="font-display text-base font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-teal-300">
            {{ card.project.title }}
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-slate-400">
            {{ card.project.summary }}
          </p>

          <ul class="mt-4 mb-5 flex flex-wrap gap-2" role="list">
            <li
              v-for="tag in card.project.tags"
              :key="tag"
              class="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] leading-none text-slate-400"
            >
              {{ tag }}
            </li>
          </ul>

          <!-- Footer de la tarjeta -->
          <div class="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <a
              v-if="card.project.demoUrl"
              :href="card.project.demoUrl"
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

            <span
              v-else
              class="font-mono text-[11px] leading-relaxed text-slate-500"
            >
              enlaces de demostración sin configurar
            </span>

            <!-- Botón de GitHub (solo clicable si el proyecto tiene repositorio) -->
            <a
              v-if="card.project.repoUrl"
              :href="card.project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :aria-label="`Ver ${card.project.title} en GitHub`"
            >
              <img :src="githubIcon" alt="" aria-hidden="true" class="h-4 w-4 brightness-0 invert" />
              Ver en GitHub
            </a>

            <button
              v-else
              type="button"
              disabled
              aria-disabled="true"
              title="Repositorio sin configurar"
              class="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs font-semibold text-slate-500"
            >
              <img :src="githubIcon" alt="" aria-hidden="true" class="h-4 w-4 opacity-40 invert" />
              Ver en GitHub
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
