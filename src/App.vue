<script setup lang="ts">
import AOS from 'aos';
AOS.init();


const urlBase = import.meta.env.BASE_URL
const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/MiguelDotDev',
    icon: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/miguel-angel-núñez-gómez-2a46a4431',
    icon: 'M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-6.87-5.94-8.68-2.91V8.48z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@holycodedev',
    icon: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z',
  }
]
const subtitulosGenerales = "font-['Space_Grotesk',sans-serif] text-3xl font-bold tracking-tight text-slate-300/75 sm:text-6xl";
const botonesNav = "mx-4 text-slate-400 text-2xs sm:text-4xs"

</script>

<template>
  <div class="min-h-screen bg-[#0B0F19] font-['Inter',sans-serif] text-slate-200 selection:bg-teal-400/30 overflow-x-hidden">

    <!-- Fondo: grid + glows -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"></div>
      <div class="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-400/10 blur-[130px]"></div>
      <div class="absolute top-52 right-0 h-[380px] w-[380px] rounded-full bg-indigo-500/10 blur-[130px]"></div>
    </div>

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 z-50 w-full border-b border-white/5 backdrop-blur-md shadow-2xl">
      <div class="bg-[#0B0F19]/80">
        <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 class="font-['JetBrains_Mono',monospace] text-lg font-semibold tracking-tight text-white">
          <span class="text-teal-400">&lt;</span>Miguel<span class="text-teal-400">.dev</span><span class="text-teal-400">/&gt;</span>
        </h1>

        <span class="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-['JetBrains_Mono',monospace] text-xs text-slate-400 sm:flex">
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </span>
          disponible para proyectos
        </span>
      </div>
      </div>


      <div class="flex flex-row items-center justify-center py-4 bg-[#0B0F19]/20">
        <a href="#Estudios" v-bind:class="botonesNav">Estudios</a>
        <a href="#StackTecnologico" v-bind:class="botonesNav">Stack Tecnológico</a>
        <a href="#Contacto" v-bind:class="botonesNav">Contacto</a>
      </div>
    </nav>

    <!-- Hero -->
    <main class="relative z-10 mx-auto flex min-h-screen mb-[-20vh] max-w-6xl flex-col items-center justify-center gap-14 px-6 pt-28 pb-20 lg:flex-row lg:gap-20">

      <!-- Foto tipo ventana de código -->
      <div class="w-full max-w-sm shrink-0 lg:max-w-md">
        <div class="overflow-hidden rounded-xl border border-white/10 bg-[#111726] shadow-2xl shadow-black/60">
          <div class="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-red-500/70"></span>
            <span class="h-3 w-3 rounded-full bg-yellow-500/70"></span>
            <span class="h-3 w-3 rounded-full bg-emerald-500/70"></span>
            <span class="ml-3 truncate font-['JetBrains_Mono',monospace] text-xs text-slate-500">miguel.jpg</span>
          </div>
          <img
            src="@/assets/img/profile.png"
            alt="Miguel Angel Nuñez Gomez"
            class="h-auto w-full object-cover grayscale-[15%]"
          />
        </div>
      </div>

      <!-- Contenido -->
      <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
        <span class="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 font-['JetBrains_Mono',monospace] text-xs text-teal-300">
          $ whoami
        </span>

        <h2 class="font-['Space_Grotesk',sans-serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Miguel Angel <br class="hidden sm:block" />
          <span class="text-teal-400">Nuñez Gomez</span>
        </h2>

        <p class="mt-4 font-['JetBrains_Mono',monospace] text-lg text-slate-400">
          <span class="text-slate-600">&gt;</span> Desarrollador Fullstack
        </p>

        <p class="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          Construyo aplicaciones web de extremo a extremo, del backend a la interfaz, con foco en código limpio, rendimiento y buena experiencia de usuario.
        </p>

        <!-- Redes -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a
            v-for="s in socials.slice(0, 3)"
            :key="s.name"
            :href="s.href"
            class="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/40 hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-slate-400 transition-colors group-hover:text-teal-400">
              <path :d="s.icon" />
            </svg>
            {{ s.name }}
          </a>

          <a
            :href="`${urlBase}documentos/CV_Miguel_Angel_Nunez_Gomez.pdf`"
            download
            class="group flex items-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-[#0B0F19] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-300"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current">
              <path :d="socials[2]!.icon" />
            </svg>
            Descargar CV
          </a>
        </div>
      </div>
    </main>


    <div class="pb-40" id="Estudios"></div>
    <div class="relative z-10 ms-20 text-left">
      <h2 data-aos="fade-down" v-bind:class="subtitulosGenerales">Estudios</h2>
      <div data-aos="fade-right" class="ml-8 mt-3">
        <span class="birthstone-regular text-3xl leading-relaxed text-teal-400 sm:text-6xl">Universidad Tecnológica de Tula - Tepeji</span><br/>
        <span class="text-slate-600">&gt;</span><span class="leading-relaxed text-slate-400 sm:text-2xl"> Técnico Superior Universitario en Desarrollo de Software Multiplataforma</span>
        <span class="text-slate-600"> (2023 - 2025)</span><br/>
        <span class="text-slate-600">&gt;</span><span class="leading-relaxed text-xl text-slate-400 sm:text-2xl"> Ingenieria en Gestión y Desarrollo de Software</span>
        <span class="text-slate-600"> (2025 - En Curso)</span><br/>
      </div>
    </div>


    <div class="pb-40" id="StackTecnologico"></div>
    <div class="relative z-10 pb-20 me-20 text-right">
      <h2 data-aos="fade-down" v-bind:class="subtitulosGenerales">Stack Tecnológico</h2>
      <div data-aos="fade-left" class="h-[500px]">
      </div>
    </div>

    


  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Birthstone&display=swap');
@import "tailwindcss";
@import 'aos/dist/aos.css';

.birthstone-regular {
  font-family: "Birthstone", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>