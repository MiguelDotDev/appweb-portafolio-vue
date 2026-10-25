<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { experiences } from '@/data/experience'
</script>

<template>
  <section
    id="experiencia"
    aria-labelledby="experiencia-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading id="experiencia-title" eyebrow="$ cat experiencia.md" title="Experiencia" />

    <div class="relative mt-8">
      <div
        class="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-teal-400/40 via-white/10 to-transparent sm:block"
        aria-hidden="true"
      ></div>
      <div class="space-y-8 sm:space-y-10">
        <article
          v-for="(experience, index) in experiences"
          :key="experience.organization + experience.period"
          data-aos="fade-up"
          :data-aos-delay="index * 90"
          class="relative sm:pl-16"
        >
          <div
            class="absolute left-4 top-6 hidden -translate-x-1/2 sm:flex"
            aria-hidden="true"
          >
            <span
              class="h-3 w-3 rounded-full border-2 border-teal-400 bg-ink shadow-[0_0_0_6px_rgba(45,212,191,0.08)]"
            ></span>
          </div>

          <div
            class="rounded-xl border border-white/10 bg-surface/60 p-5 transition-colors duration-200 hover:border-teal-400/30 sm:p-6"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="font-display text-xl font-semibold text-white sm:text-2xl">
                  {{ experience.organization }}
                </p>
                <p class="mt-1 font-mono text-xs font-medium uppercase tracking-[0.24em] text-teal-300">
                  {{ experience.type }}
                </p>
              </div>
              <span
                class="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-400"
              >
                {{ experience.period }}
              </span>
            </div>

            <p class="mt-4 text-[15px] leading-relaxed text-slate-300">
              {{ experience.description }}
            </p>

            <div class="mt-6">
              <p class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                Principales aportaciones
              </p>
              <ul class="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-400">
                <li v-for="(activity, activityIndex) in experience.activities" :key="activityIndex" class="flex gap-2">
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/70" aria-hidden="true"></span>
                  <span>{{ activity }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-6">
              <p class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                Proyecto asociado
              </p>
              <p class="mt-2 text-sm font-medium text-slate-200">
                {{ experience.project }}
              </p>
            </div>

            <div class="mt-6">
              <p class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
                Tecnologías
              </p>
              <ul class="mt-3 flex flex-wrap gap-2" role="list">
                <li
                  v-for="technology in experience.technologies"
                  :key="technology"
                  class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-300"
                >
                  {{ technology }}
                </li>
              </ul>
            </div>

            <div class="mt-6 flex">
              <a
                :href="experience.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-lg border border-teal-400/40 bg-teal-400/10 px-4 py-2 text-sm font-semibold text-teal-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/70 hover:bg-teal-400/15 hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                Ver proyecto en GitHub
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
