/**
 * EmailJS configuration
 * 
 * To set up:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create two email templates:
 *    - One for contact form (template_contact)
 *    - One for careers form (template_careers)
 * 4. Add these environment variables to .env:
 *    - VITE_EMAILJS_SERVICE_ID
 *    - VITE_EMAILJS_PUBLIC_KEY
 *    - VITE_EMAILJS_CONTACT_TEMPLATE_ID
 *    - VITE_EMAILJS_CAREERS_TEMPLATE_ID
 */

import emailjs from '@emailjs/browser'

// Initialize EmailJS with public key
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
if (publicKey) {
  emailjs.init(publicKey)
}

export const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
  contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string | undefined,
  careersTemplateId: import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE_ID as string | undefined,
}

export const isEmailJsConfigured = () => {
  return !!(
    emailJsConfig.serviceId &&
    emailJsConfig.publicKey &&
    emailJsConfig.contactTemplateId &&
    emailJsConfig.careersTemplateId
  )
}

export default emailjs
