<script setup lang="ts">
import { socials, cvUrl } from '@/data/socials'

/**
 * Sección de inicio (hero).
 * Conserva la presentación original (foto en ventana de código + saludo)
 * y añade los accesos a Proyectos y Acerca de mí.
 */
const sectionLinks = [
  { href: '#proyectos', label: 'Explorar proyectos', primary: true },
  { href: '#acerca', label: 'Conocer más sobre mí', primary: false },
]
</script>

<template>
  <section
    id="inicio"
    aria-labelledby="hero-title"
    class="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 pt-28 pb-16 sm:gap-14 lg:flex-row lg:gap-20 lg:pb-24"
  >
    <!-- Foto tipo ventana de código -->
    <div class="w-full max-w-sm shrink-0 lg:max-w-md" data-aos="fade-right">
      <div
        class="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/60"
      >
        <div class="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span class="h-3 w-3 rounded-full bg-red-500/70"></span>
          <span class="h-3 w-3 rounded-full bg-yellow-500/70"></span>
          <span class="h-3 w-3 rounded-full bg-emerald-500/70"></span>
          <span class="ml-3 truncate font-mono text-xs text-slate-400">miguel.jpg</span>
        </div>
        <img
          src="@/assets/img/profile.png"
          alt="Retrato de Miguel Angel Nuñez Gomez"
          width="1080"
          height="1080"
          class="h-auto w-full object-cover grayscale-[15%]"
        />
      </div>
    </div>

    <!-- Contenido -->
    <div
      class="flex flex-col items-center text-center lg:items-start lg:text-left"
      data-aos="fade-up"
      data-aos-delay="80"
    >
      <span
        class="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 font-mono text-xs text-teal-300"
      >
        $ whoami
      </span>

      <h1 id="hero-title" class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Miguel Angel <br class="hidden sm:block" />
        <span class="text-teal-400">Núñez Gómez</span>
      </h1>

      <p class="mt-4 font-mono text-lg text-slate-400">
        <span class="text-slate-600">&gt;</span> Desarrollador Fullstack <br/>
      </p>

      <p class="mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
        Construyo aplicaciones web de extremo a extremo, del backend a la interfaz, con foco en código
        limpio, rendimiento y buena experiencia de usuario.
      </p>

      <div class="mt-5 flex flex-col items-center gap-1 lg:items-start">
        <p class="font-mono text-xs uppercase tracking-widest text-slate-500">Correo de contacto</p>
        <a
          href="mailto:miguel.nunez.dev@gmail.com"
          class="font-mono text-sm text-slate-300 transition-colors hover:text-teal-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 sm:text-base"
          aria-label="Enviar correo electrónico a miguel.nunez.dev@gmail.com"
        >
          miguel.nunez.dev@gmail.com
        </a>
      </div>

      <!-- Accesos rápidos -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <a
          v-for="link in sectionLinks"
          :key="link.href"
          :href="link.href"
          class="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
          :class="
            link.primary
              ? 'bg-teal-400 text-ink hover:bg-teal-300 focus-visible:outline-teal-300'
              : 'border border-white/15 bg-white/5 text-slate-200 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-teal-400'
          "
        >
          {{ link.label }}
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <!-- Redes y CV -->
      <div class="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.href"
          :aria-label="`Perfil de Miguel en ${s.name}`"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
            <path :d="s.icon" />
          </svg>
        </a>

        <a
          :href="cvUrl"
          download
          class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M12 3v11m0 0-4-4m4 4 4-4M4 21h16"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Descargar CV
        </a>
      </div>
    </div>
  </section>
</template>
