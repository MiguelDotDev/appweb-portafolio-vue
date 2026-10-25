<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { description, studies } from '@/data/about'
import { contact } from '@/data/contact'

function getTelHref(phone: string): string {
  const cleaned = phone.replace(/[\s()-]/g, '')
  return `tel:${cleaned}`
}
</script>

<template>
  <section
    id="acerca"
    aria-labelledby="acerca-title"
    class="mx-auto max-w-6xl px-6 py-20 sm:py-24"
  >
    <SectionHeading id="acerca-title" eyebrow="$ cat sobre-mi.md" title="Acerca de mí" />

    <div class="flex flex-col gap-16">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <!-- Subsección: Descripción -->
        <div id="acerca-descripcion" class="lg:col-span-7 scroll-mt-28" data-aos="fade-up">
          <h3 class="font-display text-xl font-semibold text-white">
            <span class="mr-2 font-mono text-sm text-teal-400" aria-hidden="true">//</span>Descripción
          </h3>

          <div class="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-400">
            <p v-for="(paragraph, index) in description" :key="index">{{ paragraph }}</p>
          </div>
        </div>

        <!-- Subsección: Estudios -->
        <div id="acerca-estudios" class="lg:col-span-5 scroll-mt-28">
          <h3 data-aos="fade-up" class="font-display text-xl font-semibold text-white">
            <span class="mr-2 font-mono text-sm text-teal-400" aria-hidden="true">//</span>Estudios
          </h3>

          <ol class="relative mt-6 space-y-5 border-l border-white/10 pl-6 sm:pl-8">
            <li
              v-for="(study, index) in studies"
              :key="study.degree"
              data-aos="fade-up"
              :data-aos-delay="index * 90"
              class="relative"
            >
              <!-- Punto de la línea de tiempo -->
              <span
                class="absolute -left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-teal-400 bg-ink sm:-left-8"
                aria-hidden="true"
              ></span>

              <div
                class="rounded-xl border border-white/10 bg-surface/60 p-4 transition-colors duration-200 hover:border-teal-400/30 sm:p-5"
              >
                <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <p
                    class="min-w-0 font-mono text-xs font-medium leading-relaxed tracking-wide text-teal-300"
                  >
                    {{ study.institution }}
                  </p>
                  <span
                    class="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] leading-none text-slate-400"
                  >
                    {{ study.period }}
                  </span>
                </div>

                <p class="mt-2.5 font-display text-sm font-semibold leading-snug text-white sm:text-base">
                  {{ study.degree }}
                </p>

                <span
                  v-if="study.status === 'en-curso'"
                  class="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
                  En curso
                </span>
                <span
                  v-else
                  class="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400"
                >
                  <svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Completada
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- Subsección: Contáctame -->
      <div id="acerca-contacto" class="scroll-mt-28">
        <h3 data-aos="fade-up" class="font-display text-xl font-semibold text-white">
          <span class="mr-2 font-mono text-sm text-teal-400" aria-hidden="true">//</span>Contáctame
        </h3>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div
            class="rounded-xl border border-white/10 bg-surface/60 p-4 transition-colors duration-200 hover:border-teal-400/30 sm:p-5"
            :class="contact.phone ? '' : 'sm:col-span-2'"
          >
            <p class="font-mono text-xs font-medium uppercase tracking-wide text-slate-500">Correo</p>
            <a
              :href="`mailto:${contact.email}`"
              class="mt-2 inline-flex font-mono text-sm text-slate-200 transition-colors hover:text-teal-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              :aria-label="`Enviar correo electrónico a ${contact.email}`"
            >
              {{ contact.email }}
            </a>
          </div>

          <div
            v-if="contact.phone"
            class="rounded-xl border border-white/10 bg-surface/60 p-4 transition-colors duration-200 hover:border-teal-400/30 sm:p-5"
          >
            <p class="font-mono text-xs font-medium uppercase tracking-wide text-slate-500">Teléfono</p>
            <a
              :href="getTelHref(contact.phone)"
              class="mt-2 inline-flex font-mono text-sm text-slate-200 transition-colors hover:text-teal-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              {{ contact.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
