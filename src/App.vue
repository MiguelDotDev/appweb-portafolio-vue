<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import TheNavbar from '@/components/TheNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import StackSection from '@/components/StackSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import CertificationsSection from '@/components/CertificationsSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import TheFooter from '@/components/TheFooter.vue'

/**
 * AOS se inicializa una sola vez y dentro de `onMounted`,
 * cuando todos los componentes (y sus atributos `data-aos`)
 * ya están en el DOM.
 */
onMounted(() => {
  AOS.init({
    duration: 650,
    easing: 'ease-out',
    once: true,
    offset: 60,
    disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  })
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-ink font-sans text-slate-200 selection:bg-teal-400/30">
    <!-- Enlace de salto para navegación por teclado -->
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-teal-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
    >
      Saltar al contenido principal
    </a>

    <!-- Fondo: grid + glows -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      ></div>
      <div
        class="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-400/10 blur-[130px]"
      ></div>
      <div
        class="absolute top-52 right-0 h-[380px] w-[380px] rounded-full bg-indigo-500/10 blur-[130px]"
      ></div>
    </div>

    <TheNavbar />

    <main id="contenido" tabindex="-1" class="relative z-10">
      <HeroSection />
      <StackSection />
      <ProjectsSection />
      <CertificationsSection />
      <AboutSection />
    </main>

    <TheFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Birthstone&display=swap');
@import 'tailwindcss';
@import 'aos/dist/aos.css';

/*
 * Paleta central del portafolio (evolución de los colores originales).
 * `bg-ink`, `bg-surface`, `text-accent`, `font-display`, `font-mono`…
 */
@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

  --color-ink: #0b0f19; /* fondo principal */
  --color-surface: #111726; /* superficies de tarjetas */
  --color-accent: #2dd4bf; /* acento teal */
}

/* Desplazamiento suave entre secciones sin taparlas con el encabezado fijo */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
}

/* Indicador de foco visible en toda la aplicación */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* El contenido nunca queda oculto si AOS no se inicializa */
[data-aos]:not(.aos-init) {
  opacity: 1 !important;
  transform: none !important;
}

/* Respeto de la preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

.birthstone-regular {
  font-family: 'Birthstone', cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
