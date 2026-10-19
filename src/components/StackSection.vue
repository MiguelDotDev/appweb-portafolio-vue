<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { stackCategories } from '@/data/stack'
</script>

<template>
  <section
    id="stack"
    aria-labelledby="stack-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading id="stack-title" eyebrow="$ stack --list" title="Stack tecnológico" />

    <div class="space-y-12 sm:space-y-14">
      <div
        v-for="(category, index) in stackCategories"
        :key="category.id"
        data-aos="fade-up"
        :data-aos-delay="(index % 3) * 70"
      >
        <!-- Título de categoría -->
        <div class="mb-5 flex items-center gap-3">
          <h3 class="font-display text-lg font-semibold text-white sm:text-xl">
            {{ category.title }}
          </h3>
          <span class="font-mono text-xs text-slate-500" aria-hidden="true">
            {{ String(category.techs.length).padStart(2, '0') }}
          </span>
          <span class="h-px flex-1 bg-white/10" aria-hidden="true"></span>
        </div>

        <!-- Tecnologías -->
        <ul class="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" role="list">
          <li
            v-for="tech in category.techs"
            :key="tech.name"
            class="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/[0.06]"
          >
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/10 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <img
                v-if="tech.icon"
                :src="tech.icon"
                alt=""
                class="h-full w-full object-contain"
              />
              <svg v-else viewBox="0 0 24 24" class="h-full w-full">
                <path :d="tech.iconPath" fill="#000000" />
              </svg>
            </span>
            <span class="min-w-0 break-words text-sm font-medium leading-snug text-slate-300 transition-colors duration-200 group-hover:text-white">
              {{ tech.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
