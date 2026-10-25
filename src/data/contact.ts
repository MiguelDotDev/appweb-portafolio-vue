/**
 * Fuente única para el correo y el teléfono usados en el hero y en Contáctame.
 */

export interface ContactInfo {
  /** Correo electrónico de contacto. */
  email: string
  /** Número de teléfono o `null` si no está disponible. */
  phone: string | null
}

export const contact: ContactInfo = {
  email: 'miguel.nunez.dev@gmail.com',
  phone: '+525652186773',
}
