/*
 * Generador de PDFs de demostración (sin dependencias).
 * Crea cuatro evidencias ficticias en public/evidencias/.
 * Script de un solo uso para maquetar la sección "Certificaciones y Formación".
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '..', 'public', 'evidencias')
mkdirSync(outDir, { recursive: true })

function esc(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function buildPdf({ title, subtitle, lines }) {
  const content = []
  content.push('0.043 0.059 0.098 rg 0 0 595 842 re f')
  content.push('0.176 0.831 0.749 rg 60 740 475 4 re f')

  content.push('BT /F2 22 Tf 1 1 1 rg 60 770 Td (' + esc(title) + ') Tj ET')
  content.push('BT /F1 13 Tf 0.58 0.65 0.75 rg 60 746 Td (' + esc(subtitle) + ') Tj ET')

  let y = 690
  const body = []
  for (const line of lines) {
    body.push('BT /F1 12 Tf 0.80 0.84 0.90 rg 60 ' + y + ' Td (' + esc(line) + ') Tj ET')
    y -= 24
  }
  content.push(...body)

  content.push('0.176 0.831 0.749 rg 60 170 475 1 re f')
  content.push(
    'BT /F1 10 Tf 0.60 0.66 0.75 rg 60 150 Td (' +
      esc('Este archivo es un documento de DEMOSTRACIÓN.') +
      ') Tj ET',
  )
  content.push(
    'BT /F1 10 Tf 0.60 0.66 0.75 rg 60 134 Td (' +
      esc('No es una certificación auténtica ni acredita al titular del portafolio.') +
      ') Tj ET',
  )
  content.push(
    'BT /F1 10 Tf 0.60 0.66 0.75 rg 60 118 Td (' +
      esc('Generado únicamente para probar la interfaz de la sección.') +
      ') Tj ET',
  )

  const stream = content.join('\n')

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
    '<< /Length ' + Buffer.byteLength(stream, 'latin1') + ' >>\nstream\n' + stream + '\nendstream',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = []
  objects.forEach((obj, index) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'))
    pdf += (index + 1) + ' 0 obj\n' + obj + '\nendobj\n'
  })
  const xrefOffset = Buffer.byteLength(pdf, 'latin1')
  pdf += 'xref\n0 ' + (objects.length + 1) + '\n'
  pdf += '0000000000 65535 f \n'
  for (const offset of offsets) {
    pdf += String(offset).padStart(10, '0') + ' 00000 n \n'
  }
  pdf += 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\n'
  pdf += 'startxref\n' + xrefOffset + '\n%%EOF\n'

  return Buffer.from(pdf, 'latin1')
}

const docs = [
  {
    file: 'certificacion-desarrollo-web.pdf',
    title: 'Fundamentos de Cloud Computing',
    subtitle: 'DOCUMENTO DE DEMOSTRACION — no es una certificacion autentica',
    lines: [
      'Categoria: Certificacion (ejemplo)',
      'Emisor: Plataforma de demostracion',
      'Fecha: 2024-03',
      'Resultado: Aprobada - 92/100',
    ],
  },
  {
    file: 'curso-desarrollo-web.pdf',
    title: 'Introduccion al Desarrollo Web',
    subtitle: 'DOCUMENTO DE DEMOSTRACION — no es una certificacion autentica',
    lines: [
      'Categoria: Curso (ejemplo)',
      'Emisor: Academia de ejemplo',
      'Fecha: 2024-05',
      'Resultado: Curso completado',
    ],
  },
  {
    file: 'evaluacion-ingles.pdf',
    title: 'English Proficiency Assessment',
    subtitle: 'DOCUMENTO DE DEMOSTRACION — no es una certificacion autentica',
    lines: [
      'Categoria: Ingles (ejemplo)',
      'Emisor: Centro de evaluacion de ejemplo',
      'Fecha: 2024-07',
      'Resultado: Nivel B1 (ejemplo)',
    ],
  },
  {
    file: 'curso-python.pdf',
    title: 'Fundamentos de Python',
    subtitle: 'DOCUMENTO DE DEMOSTRACION — no es una certificacion autentica',
    lines: [
      'Categoria: Curso (ejemplo)',
      'Emisor: Academia de ejemplo',
      'Fecha: 2024-09',
      'Resultado: No aplica',
    ],
  },
]

for (const doc of docs) {
  writeFileSync(resolve(outDir, doc.file), buildPdf(doc))
  console.log('creado:', doc.file)
}
