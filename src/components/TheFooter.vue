<script setup lang="ts">
import { socials } from '@/data/socials'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative z-10 border-t border-white/5 bg-ink/70 backdrop-blur">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center gap-7 px-6 py-10 sm:flex-row sm:justify-between sm:gap-6"
    >
      <div class="flex flex-col items-center gap-1.5 sm:items-start">
        <span class="font-mono text-base font-semibold tracking-tight text-white">
          <span class="text-teal-400">&lt;</span>Miguel<span class="text-teal-400">.dev</span
          ><span class="text-teal-400">/&gt;</span>
        </span>
        <p class="font-mono text-xs text-slate-400">© {{ year }} Miguel Angel Núñez Gómez</p>
      </div>

      <ul class="flex items-center gap-2" role="list">
        <li v-for="s in socials" :key="s.name">
          <a
            :href="s.href"
            :aria-label="`Perfil de Miguel en ${s.name}`"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
              <path :d="s.icon" />
            </svg>
          </a>
        </li>
      </ul>

      <a
        href="#inicio"
        class="inline-flex items-center gap-2 rounded-md font-mono text-xs text-slate-400 transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
      >
        <span aria-hidden="true">↑</span> volver al inicio
      </a>
    </div>
  </footer>
</template>
